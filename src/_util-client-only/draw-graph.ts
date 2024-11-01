import { Simple2D } from "~/_util";
import P5 from "p5";
import { COLORS_3A } from "~/_util-client-only";

// Constants for configuring the graph appearance
const PADDING = 80;
const MIN_TICK_SPACING = 50;
const TICK_SIZE = 12;
const TICK_LABEL_OFFSET = 20;
const FONT_SIZE = 12;
const LINE_RESOLUTION = 200; // Number of points to plot for smooth line

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
}

/**
 * Draws a graph with axes and plots a function with current progress
 * @param p5 P5 instance
 * @param dimensions Canvas dimensions
 * @param progress Current x value/progress (0 to 1)
 * @param fn Function that takes x (0 to 1) and returns y (0 to 1)
 * @param config Optional configuration for graph appearance
 */
export const drawGraph = (
  p5: P5,
  dimensions: GraphDimensions,
  progress: number,
  fn: (x: number) => number,
  config: GraphConfig = {},
) => {
  // Merge default config with provided config
  const {
    padding = PADDING,
    minTickSpacing = MIN_TICK_SPACING,
    tickSize = TICK_SIZE,
    tickLabelOffset = TICK_LABEL_OFFSET,
    fontSize = FONT_SIZE,
    lineResolution = LINE_RESOLUTION,
  } = config;

  const drawingWidth = dimensions.width - padding * 2;
  const drawingHeight = dimensions.height - padding * 2;

  // Calculate how many ticks we can fit
  const maxTicksX = Math.floor(drawingWidth / minTickSpacing);
  const maxTicksY = Math.floor(drawingHeight / minTickSpacing);

  // Helper to convert graph coordinates (0-1) to screen coordinates
  const toScreenX = (x: number): number => padding + x * drawingWidth;
  const toScreenY = (y: number): number =>
    dimensions.height - padding - y * drawingHeight;

  // Helper to draw a tick with label
  const drawTick = (pos: number, value: number, isVertical: boolean) => {
    p5.textFont("Hoves-Mono");
    const formattedValue = value.toFixed(1);

    if (isVertical) {
      const y = padding + pos;
      p5.line(padding - tickSize, y, padding, y);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      p5.text(formattedValue, padding - tickSize - tickLabelOffset, y);
    } else {
      const x = padding + pos;
      p5.line(
        x,
        dimensions.height - padding,
        x,
        dimensions.height - padding + tickSize,
      );
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text(
        formattedValue,
        x,
        dimensions.height - padding + tickSize + tickLabelOffset,
      );
    }
  };

  // Draw axes setup
  p5.stroke(COLORS_3A.WHITE);
  p5.strokeWeight(1);
  p5.textSize(fontSize);
  p5.fill(COLORS_3A.WHITE);

  // Draw axes
  p5.line(padding, padding, padding, dimensions.height - padding); // Vertical
  p5.line(
    padding,
    dimensions.height - padding,
    dimensions.width - padding,
    dimensions.height - padding,
  ); // Horizontal

  // Draw X-axis ticks
  drawTick(0, 0, false);
  drawTick(drawingWidth, 1, false);
  if (maxTicksX > 2) {
    const step = drawingWidth / Math.min(maxTicksX, 10);
    for (let i = 1; i < Math.min(maxTicksX, 10); i++) {
      const value = i / Math.min(maxTicksX, 10);
      if (value < 1) drawTick(i * step, value, false);
    }
  }

  // Draw Y-axis ticks
  drawTick(drawingHeight, 0, true);
  drawTick(0, 1, true);
  if (maxTicksY > 2) {
    const step = drawingHeight / Math.min(maxTicksY, 10);
    for (let i = 1; i < Math.min(maxTicksY, 10); i++) {
      const value = 1 - i / Math.min(maxTicksY, 10);
      if (value > 0) drawTick(i * step, value, true);
    }
  }

  // Draw the function curve
  p5.beginShape();
  p5.noFill();
  for (let i = 0; i <= lineResolution; i++) {
    const x = i / lineResolution;
    p5.vertex(toScreenX(x), toScreenY(fn(x)));
  }
  p5.endShape();

  // Draw the current point
  const currentY = fn(progress);
  p5.circle(toScreenX(progress), toScreenY(currentY), 5);
};

/**
 * Usage example:
 *
 * const dimensions = { width: dimension().x, height: dimension().y };
 *
 * // Simple sine wave example
 * const sineFn = (x: number) => (Math.sin(x * Math.PI * 2) + 1) / 2;
 *
 * drawGraph(p5, dimensions, progress, sineFn);
 */
