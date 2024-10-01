import P5 from "p5";
import { createMemo, createSignal } from "solid-js";
import {
  calculateArcLength,
  ColorArray,
  coordOfCircle,
  createArrayFromLength,
  getAngleFromArcLengthInDegrees,
  hexToRgb,
  lerp,
  Vector2D,
} from "~/_util";
import * as p5 from "p5";
import { COLORS_3A } from "~/components/animation/COLORS_3A";

/**
 * VerticeArc creates an animated arc with vertices, allowing customization of its size, "roundness" based on progress, thickness, and color.
 * @param {P5} p5 - Instance of the p5.js library to enable drawing and animation.
 * @returns {VerticeArcType} - The functions for controlling the arc's properties and drawing it on the canvas.
 */
export default function VerticeArc(p5: P5) {
  const RESOLUTION: number = 60; // Resolution for vertex generation along the arc

  const TEMP_SCALER: number = 0.8; // This constant is used for temporary scaling
  const OFFSET_ANGLES: number = -90; // Offset for calculating angles from the top, like a clock

  /**
   * Scales a number by a temporary scale factor.
   * @param {number} n - The number to be scaled.
   * @returns {number} - The scaled value.
   */
  const applyTempScale = (n: number): number => n * TEMP_SCALER;

  /**
   * Draws a vertex at the given coordinates.
   * @param {Vector2D} p - The position vector where the vertex should be drawn.
   * @returns {p5} - The p5 vertex function.
   */
  const dvtx = (p: Vector2D): p5 => p5.vertex(p.x, p.y);

  // Signals for arc properties
  const [strokeColor, setStrokeColor] = createSignal<ColorArray>([
    255, 255, 255, 255,
  ]);
  // const [center, setCenter] = createSignal<Vector2D>({ x: 0, y: 0 });
  const [centerX, setCenterX] = createSignal<number>(0);
  const [centerY, setCenterY] = createSignal<number>(0);
  const [dimensions, setDimension] = createSignal<Vector2D>({ x: 0, y: 0 });

  const [arcStartAngle, setArcStartAngle] = createSignal<number>(0);
  const [arcEndAngle, setArcEndAngle] = createSignal<number>(0);
  const [radius, setRadius] = createSignal<number>(0);
  const [thickness, setThickness] = createSignal<number>(0);
  const [progress, setProgress] = createSignal<number>(0);

  // Memoized values for scaled radius and thickness
  const center = createMemo<Vector2D>(() => ({
    x: centerX(),
    y: centerY(),
  }));
  const scaledRadius = createMemo<number>(() => applyTempScale(radius()));
  const scaledThickness = createMemo<number>(() => applyTempScale(thickness()));
  const scaledInnerRadius = createMemo<number>(
    () => scaledRadius() + scaledThickness() / 2,
  );

  // Memoized calculations for arc geometry
  const arcInnerAngle = createMemo<number>(
    () => arcEndAngle() - arcStartAngle(),
  );
  const finalArcLength = createMemo<number>(() =>
    calculateArcLength(scaledInnerRadius(), arcInnerAngle()),
  );

  // Position calculations
  const linePositionY = createMemo<number>(
    () => centerY() - scaledInnerRadius(),
  );
  const startPositionX = createMemo<number>(
    () => dimensions().x / 2 + p5.random(-dimensions().x, dimensions().x),
  );
  const finalPositionX = createMemo<number>(
    () => center().x + calculateArcLength(scaledInnerRadius(), arcStartAngle()),
  );
  const distanceToGo = createMemo<number>(
    () => finalPositionX() - startPositionX(),
  );

  /**
   * Linearly interpolates the X position along the arc based on progress.
   * @returns {number} - The current X position.
   */
  const currentX = createMemo<number>(() =>
    lerp(startPositionX(), finalPositionX(), progress()),
  );

  /**
   * Generates the vertex points for drawing the arc, including the straight and curved sections.
   */
  const vertexPoints = createMemo<
    { center: P5.Vector; top: P5.Vector; bottom: P5.Vector }[]
  >(() => {
    if (!finalArcLength()) {
      return [];
    }

    const SEGMENT_SIZE = finalArcLength() / RESOLUTION;

    return createArrayFromLength(RESOLUTION + 1).map((i) => {
      const start = currentX() + i * SEGMENT_SIZE;

      let top;
      let centerLine;
      let bottom;

      if (start <= center().x) {
        centerLine = p5.createVector(start, linePositionY());
        top = p5.createVector(start, linePositionY() - scaledThickness() / 2);
        bottom = p5.createVector(
          start,
          linePositionY() + scaledThickness() / 2,
        );
      } else {
        const arcLength = start - center().x;
        const angle =
          getAngleFromArcLengthInDegrees(arcLength, scaledInnerRadius()) +
          OFFSET_ANGLES;

        centerLine = coordOfCircle(p5, center(), angle, scaledInnerRadius());
        top = coordOfCircle(
          p5,
          center(),
          angle,
          scaledInnerRadius() + scaledThickness() / 2,
        );
        bottom = coordOfCircle(
          p5,
          center(),
          angle,
          scaledInnerRadius() - scaledThickness() / 2,
        );
      }

      return {
        top,
        center: centerLine,
        bottom,
      };
    });
  });

  /**
   * Draws the arc with its vertices and circles at each vertex point.
   */
  const draw = (): void => {
    p5.push();

    p5.strokeWeight(0.5);
    // p5.stroke(strokeColor());
    const c = hexToRgb(COLORS_3A.PAPER);
    p5.noStroke();
    p5.fill(c[0], c[1], c[2], (-0.7 + progress() * 1.4) * 255);

    p5.beginShape();
    for (let i = 0; i < vertexPoints().length; i++) {
      dvtx(vertexPoints()[i].top);
    }
    const reversed = [...vertexPoints()].reverse();
    for (let i = 0; i < vertexPoints().length; i++) {
      dvtx(reversed[i].bottom);
    }
    p5.endShape(p5.CLOSE);

    p5.pop();

    p5.push();

    // p5.translate(-10, 0);
    // p5.scale(1, -1);

    p5.noFill();
    p5.stroke(
      strokeColor()[0],
      strokeColor()[1],
      strokeColor()[2],
      (progress() < 0.6 ? 1 - progress() * 1.5 : 0) * 255,
    );
    p5.strokeWeight(0.5);

    for (let i = 0; i < vertexPoints().length; i++) {
      if (i % 4 === 0) {
        p5.line(
          vertexPoints()[i].top.x,
          vertexPoints()[i].top.y,
          vertexPoints()[i].bottom.x,
          vertexPoints()[i].bottom.y,
        );
      }
    }
    p5.pop();

    // p5.circle(center().x, center().y, 15);
  };

  // Return functions to set various arc properties and the draw function
  return {
    draw,
    setArcStartAngle,
    setArcEndAngle,
    setRadius,
    setThickness,
    setProgress,
    setCenterX,
    setCenterY,
    setDimension,
    setStrokeColor,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type VerticeArcType = ReturnType<typeof VerticeArc>;
