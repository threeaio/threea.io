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

interface GraphConfig {
  padding?: number;
  minTickSpacing?: number;
  tickSize?: number;
  tickLabelOffset?: number;
  fontSize?: number;
  lineResolution?: number;
  xRange?: { min: number; max: number };
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

// Add this helper function to enforce minimum range
const enforceMinimumRange = (range: Range): Range => {
  // Always include 0 to 1 at minimum
  const min = Math.min(0, range.min);
  const max = Math.max(1, range.max);

  // Add padding
  const span = max - min;
  const padding = span * 0.05;

  return {
    min: min - padding,
    max: max + padding,
  };
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
 * Updates X range based on new value
 */
const updateXRange = (current: Range | undefined, value: number): Range => {
  if (!current) return { min: 0, max: Math.max(1, value) };

  return {
    min: Math.min(current.min, value, 0), // Always include 0
    max: Math.max(current.max, value),
  };
};

/**
 * Ensures range includes zero and adds padding
 */
const ensureRangeIncludesZero = (range: Range): Range => {
  const span = range.max - range.min;
  const padding = span * 0.05;

  if (range.min > 0) {
    return { min: 0, max: range.max + padding };
  }
  if (range.max < 0) {
    return { min: range.min - padding, max: 0 };
  }
  return {
    min: range.min - padding,
    max: range.max + padding,
  };
};

/**
 * Calculates nice tick values for an axis
 */
const calculateTicks = (range: Range, maxTicks: number): number[] => {
  const span = range.max - range.min;
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
  const start = Math.ceil(range.min / bestStep) * bestStep;
  const end = Math.floor(range.max / bestStep) * bestStep;

  for (let tick = start; tick <= end; tick += bestStep) {
    ticks.push(Number(tick.toFixed(10))); // Avoid floating point errors
  }

  // Always include 0 if it's within range
  if (range.min <= 0 && range.max >= 0 && !ticks.includes(0)) {
    ticks.push(0);
    ticks.sort((a, b) => a - b);
  }

  return ticks;
};

/**
 * Calculates the dynamic line resolution based on x-axis range and available pixels
 */
const calculateDynamicResolution = (
  xRange: Range,
  availableWidth: number,
): number => {
  const range = xRange.max - xRange.min;
  const baseResolution = Math.max(BASE_LINE_RESOLUTION * range, availableWidth);
  return Math.min(baseResolution, availableWidth * 2);
};

/**
 * Draws a graph with axes and plots a function with dynamic ranges
 *
 * @param p5 - P5.js instance
 * @param dimensions - Width and height of the graph
 * @param progress - Current progress value (x-axis)
 * @param fn - Function to plot
 * @param config - Optional configuration object
 *
 * @example
 * // Basic usage
 * drawGraph(p5, { width: 800, height: 600 }, 0.5, (x) => Math.sin(x));
 *
 * @example
 * // With custom configuration
 * drawGraph(p5, { width: 800, height: 600 }, 0.5, (x) => Math.sin(x), {
 *   padding: 60,
 *   colors: {
 *     text: COLORS_3A.GREEN,
 *     line: COLORS_3A.RED,
 *   },
 *   grid: {
 *     show: true,
 *     dashed: true,
 *   }
 * });
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

  // Calculate ranges
  let xRange = config.xRange ?? { min: 0, max: 1 };
  xRange = updateXRange(xRange, progress);

  // Calculate dynamic resolution based on x-axis range and available width
  const lineResolution = Math.round(
    calculateDynamicResolution(xRange, drawingWidth),
  );

  // Calculate Y range by sampling function
  if (!config.yRange) {
    const yValues = Array.from({ length: lineResolution + 1 }, (_, i) => {
      const x = xRange.min + (i / lineResolution) * (xRange.max - xRange.min);
      return fn(x);
    });
    const calcedRange = calculateRange(yValues);
    config.yRange = enforceMinimumRange(calcedRange);
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
  const toScreenY = (y: number): number =>
    dimensions.height -
    padding -
    ((y - yRange.min) / (yRange.max - yRange.min)) * drawingHeight;

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
  for (let i = 0; i <= lineResolution; i++) {
    const x = xRange.min + (i / lineResolution) * (xRange.max - xRange.min);
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
