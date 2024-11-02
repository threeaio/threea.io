import { Simple2D } from "~/_util";
import P5 from "p5";
import { COLORS_3A } from "~/_util-client-only";

// Constants for configuring the graph appearance
const PADDING = 80;
const MIN_TICK_SPACING = 40;
const TICK_SIZE = 6;
const TICK_LABEL_OFFSET = 20;
const FONT_SIZE = 12;
const BASE_LINE_RESOLUTION = 200; // Base resolution for range of 1
const POINT_DIAMETER = 12;

interface GraphDimensions {
  width: number;
  height: number;
}

export interface GraphConfig {
  padding?: number;
  minTickSpacing?: number;
  tickSize?: number;
  tickLabelOffset?: number;
  fontSize?: number;
  lineResolution?: number;
  xRange?: { min: number; max: number; fixed?: boolean };
  yRange?: { min: number; max: number };
  colors?: {
    text?: number[];
    axis?: number[];
    grid?: number[];
    line?: number[];
    point?: number[];
  };
  grid?: {
    show?: boolean;
    dashed?: boolean;
    dashPattern?: number[];
  };
}

interface Range {
  min: number;
  max: number;
}

/**
 * Returns the actual minimum and maximum values of a range, regardless of order
 */
const getRangeBounds = (range: Range): { min: number; max: number } => {
  return {
    min: Math.min(range.min, range.max),
    max: Math.max(range.min, range.max),
  };
};

/**
 * Checks if a range is reversed (max < min)
 */
const isRangeReversed = (range: Range): boolean => {
  return range.max < range.min;
};

/**
 * Calculates the dynamic range based on a set of values
 */
const calculateRange = (values: number[]): Range => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  // Add small padding to prevent values exactly at edges
  const padding = (max - min) * 0.05;
  return {
    min: min - padding,
    max: max + padding,
  };
};

/**
 * Updates X range based on new value, respecting fixed ranges and direction
 */
const updateXRange = (
  current: (Range & { fixed?: boolean }) | undefined,
  value: number,
): Range => {
  // If no current range exists, create initial range
  if (!current) return { min: 0, max: Math.max(1, value) };

  // If range is fixed, return current range without modification
  if (current.fixed) return current;

  // Determine if the range is reversed
  const reversed = isRangeReversed(current);
  const bounds = getRangeBounds(current);

  // Update bounds while maintaining direction
  const newBounds = {
    min: Math.min(bounds.min, value, 0),
    max: Math.max(bounds.max, value),
  };

  // Return range in the correct direction
  return reversed
    ? { min: newBounds.max, max: newBounds.min }
    : { min: newBounds.min, max: newBounds.max };
};

/**
 * Ensures range includes zero and adds padding
 */
const ensureRangeIncludesZero = (range: Range): Range => {
  const bounds = getRangeBounds(range);
  const span = bounds.max - bounds.min;
  const padding = span * 0.05;
  const reversed = isRangeReversed(range);

  let result: Range;
  if (bounds.min > 0) {
    result = { min: 0, max: bounds.max + padding };
  } else if (bounds.max < 0) {
    result = { min: bounds.min - padding, max: 0 };
  } else {
    result = {
      min: bounds.min - padding,
      max: bounds.max + padding,
    };
  }

  // Maintain direction if reversed
  return reversed ? { min: result.max, max: result.min } : result;
};

/**
 * Calculates nice tick values for an axis
 */
const calculateTicks = (range: Range, maxTicks: number): number[] => {
  const bounds = getRangeBounds(range);
  const span = bounds.max - bounds.min;
  const step = Math.pow(10, Math.floor(Math.log10(span / maxTicks)));
  const steps = [1, 2, 5, 10];

  let bestStep = step;
  for (const s of steps) {
    const testStep = step * s;
    if (span / testStep <= maxTicks) {
      bestStep = testStep;
      break;
    }
  }

  const ticks: number[] = [];
  const start = Math.ceil(bounds.min / bestStep) * bestStep;
  const end = Math.floor(bounds.max / bestStep) * bestStep;

  for (let tick = start; tick <= end; tick += bestStep) {
    ticks.push(Number(tick.toFixed(10))); // Avoid floating point errors
  }

  // Always include 0 if it's within range
  if (bounds.min <= 0 && bounds.max >= 0 && !ticks.includes(0)) {
    ticks.push(0);
    ticks.sort((a, b) => a - b);
  }

  // Reverse ticks if range is reversed
  return isRangeReversed(range) ? ticks.reverse() : ticks;
};

/**
 * Calculates the dynamic line resolution based on x-axis range and available pixels
 */
const calculateDynamicResolution = (
  xRange: Range,
  availableWidth: number,
): number => {
  const bounds = getRangeBounds(xRange);
  const range = bounds.max - bounds.min;
  const baseResolution = Math.max(BASE_LINE_RESOLUTION * range, availableWidth);
  return Math.min(baseResolution, availableWidth * 2);
};

/**
 * Draws a graph with axes and plots a function with support for reversed ranges
 */
export const drawGraph = (
  p5: P5,
  dimensions: GraphDimensions,
  progress: number,
  fn: (x: number) => number,
  config: GraphConfig = {},
) => {
  const {
    padding = PADDING,
    minTickSpacing = MIN_TICK_SPACING,
    tickSize = TICK_SIZE,
    tickLabelOffset = TICK_LABEL_OFFSET,
    fontSize = FONT_SIZE,
  } = config;

  const colors = {
    text: config.colors?.text ?? COLORS_3A.PAPER,
    axis: config.colors?.axis ?? COLORS_3A.WHITE,
    grid: config.colors?.grid ?? COLORS_3A.PAPER,
    line: config.colors?.line ?? COLORS_3A.WHITE,
    point: config.colors?.point ?? COLORS_3A.GREEN,
  };

  const grid = {
    show: config.grid?.show ?? false,
    dashed: config.grid?.dashed ?? false,
    dashPattern: config.grid?.dashPattern ?? [4, 8],
  };

  const drawingWidth = dimensions.width - padding * 2;
  const drawingHeight = dimensions.height - padding * 2;

  // Calculate ranges, respecting fixed x-axis range if specified
  let xRange = config.xRange ? { ...config.xRange } : { min: 0, max: 1 };

  // Only update range if it's not fixed
  if (!xRange.fixed) {
    xRange = updateXRange(xRange, progress);
  }

  // Calculate dynamic resolution based on x-axis range and available width
  const lineResolution = Math.round(
    calculateDynamicResolution(xRange, drawingWidth),
  );

  // Calculate Y range by sampling function
  if (!config.yRange) {
    const xBounds = getRangeBounds(xRange);
    const yValues = Array.from({ length: lineResolution + 1 }, (_, i) => {
      const t = i / lineResolution;
      const x = xBounds.min + t * (xBounds.max - xBounds.min);
      return fn(x);
    });
    const calcedRange = calculateRange(yValues);
    config.yRange = ensureRangeIncludesZero(calcedRange);
  }
  const yRange = config.yRange;

  // Calculate ticks
  const maxTicksX = Math.floor(drawingWidth / minTickSpacing);
  const maxTicksY = Math.floor(drawingHeight / minTickSpacing);
  const xTicks = calculateTicks(xRange, maxTicksX);
  const yTicks = calculateTicks(yRange, maxTicksY);

  // Coordinate conversion functions
  const toScreenX = (x: number): number =>
    padding + ((x - xRange.min) / (xRange.max - xRange.min)) * drawingWidth;
  const toScreenY = (y: number): number => {
    const minHere = yRange.min <= yRange.max ? yRange.min : yRange.max;
    const maxHere = yRange.max >= yRange.min ? yRange.max : yRange.min;
    return (
      dimensions.height -
      padding -
      ((y - minHere) / (maxHere - minHere)) * drawingHeight
    );
  };

  // Setup drawing style for font
  p5.noStroke();
  p5.textSize(fontSize);
  p5.textStyle(p5.NORMAL);
  p5.textFont("Hoves-Mono");
  p5.fill(colors.text);

  // Setup drawing style for lines
  p5.stroke(colors.axis);
  p5.noFill();

  // Draw axes
  const zeroY = toScreenY(0);

  // Draw Y axis
  p5.line(padding, padding, padding, dimensions.height - padding);

  // Draw X axis (always visible)
  const xAxisY = Math.min(
    Math.max(zeroY, padding),
    dimensions.height - padding,
  );
  p5.line(padding, xAxisY, dimensions.width - padding, xAxisY);

  // Draw ticks
  const drawTick = (pos: number, value: number, isVertical: boolean) => {
    const formattedValue = Number(value.toFixed(3)).toString();

    if (isVertical) {
      const y = toScreenY(value);
      p5.line(padding - tickSize, y, padding, y);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      p5.text(formattedValue, padding - tickSize - tickLabelOffset, y);
    } else {
      const x = toScreenX(value);
      p5.line(x, xAxisY, x, xAxisY + tickSize);
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text(formattedValue, x, xAxisY + tickSize + tickLabelOffset);
    }
  };

  // Draw grid
  if (grid.show) {
    p5.push();
    p5.stroke(colors.grid);
    p5.strokeWeight(0.2);

    if (grid.dashed) {
      p5.drawingContext.setLineDash(grid.dashPattern);
    }

    xTicks.forEach((tick) => {
      const x = toScreenX(tick);
      p5.line(x, padding, x, dimensions.height - padding);
    });
    yTicks.forEach((tick) => {
      const y = toScreenY(tick);
      p5.line(padding, y, dimensions.width - padding, y);
    });

    if (grid.dashed) {
      p5.drawingContext.setLineDash([]);
    }

    p5.pop();
  }

  // Draw all ticks
  xTicks.forEach((tick) => drawTick(tick, tick, false));
  yTicks.forEach((tick) => drawTick(tick, tick, true));

  // Draw the function curve
  p5.beginShape();
  p5.noFill();
  p5.stroke(colors.line);
  p5.strokeWeight(1);

  const xBounds = getRangeBounds(xRange);
  for (let i = 0; i <= lineResolution; i++) {
    const t = i / lineResolution;
    const x = xBounds.min + t * (xBounds.max - xBounds.min);
    const y = fn(x);
    p5.vertex(toScreenX(x), toScreenY(y));
  }
  p5.endShape();

  // Draw current point
  const currentY = fn(progress);
  p5.fill(colors.point);
  p5.noStroke();
  p5.circle(toScreenX(progress), toScreenY(currentY), POINT_DIAMETER);
};
