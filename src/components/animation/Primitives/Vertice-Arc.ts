import P5 from "p5";
import { createMemo, createSignal } from "solid-js";
import {
  calculateArcLength,
  ColorArray,
  coordOfCircle,
  createArrayFromLength,
  getAngleFromArcLengthInDegrees,
  lerp,
  Vector2D,
} from "~/_util";
import * as p5 from "p5";

/**
 * VerticeArc creates an animated arc with vertices, allowing customization of its size, "roundness" based on progress, thickness, and color.
 * @param {P5} p5 - Instance of the p5.js library to enable drawing and animation.
 * @returns {VerticeArcType} - The functions for controlling the arc's properties and drawing it on the canvas.
 */
export default function VerticeArc(p5: P5) {
  const RESOLUTION: number = 8; // Resolution for vertex generation along the arc

  const TEMP_SCALER: number = 0.2; // This constant is used for temporary scaling
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
  const [center, setCenter] = createSignal<Vector2D>({ x: 0, y: 0 });
  const [dimensions, setDimension] = createSignal<Vector2D>({ x: 0, y: 0 });

  const [arcStartAngle, setArcStartAngle] = createSignal<number>(0);
  const [arcEndAngle, setArcEndAngle] = createSignal<number>(0);
  const [radius, setRadius] = createSignal<number>(0);
  const [thickness, setThickness] = createSignal<number>(0);
  const [progress, setProgress] = createSignal<number>(0);

  // Memoized values for scaled radius and thickness
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
  const positionY = createMemo<number>(
    () => dimensions().y - center().y - scaledInnerRadius(),
  );
  const startPositionX = createMemo<number>(
    () => center().x - finalArcLength(),
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
   * @returns {P5.Vector[]} - Array of vertex points forming the arc.
   */
  const vertexPoints = createMemo<P5.Vector[]>(() => {
    if (!finalArcLength()) {
      return [];
    }

    const SEGMENT_SIZE = finalArcLength() / RESOLUTION;

    return createArrayFromLength(RESOLUTION + 1).map((i) => {
      const start = currentX() + i * SEGMENT_SIZE;

      if (start <= center().x) {
        return p5.createVector(start, positionY());
      } else {
        const arcLength = start - center().x;
        const angle =
          getAngleFromArcLengthInDegrees(arcLength, scaledInnerRadius()) +
          OFFSET_ANGLES;
        return coordOfCircle(p5, center(), angle, scaledInnerRadius());
      }
    });
  });

  /**
   * Draws the arc with its vertices and circles at each vertex point.
   */
  const draw = (): void => {
    p5.push();
    p5.strokeWeight(0.5);
    p5.stroke(strokeColor());
    p5.noFill();
    p5.beginShape();
    for (let i = 0; i < vertexPoints().length; i++) {
      dvtx(vertexPoints()[i]);
    }
    p5.endShape();
    p5.pop();

    // Draw small circles at each vertex point
    p5.push();
    p5.noFill();
    p5.stroke(strokeColor());
    p5.strokeWeight(0.5);

    for (let i = 0; i < vertexPoints().length; i++) {
      p5.circle(vertexPoints()[i].x, vertexPoints()[i].y, 5);
    }

    p5.pop();
  };

  // Return functions to set various arc properties and the draw function
  return {
    draw,
    setArcStartAngle,
    setArcEndAngle,
    setRadius,
    setThickness,
    setProgress,
    setCenter,
    setDimension,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type VerticeArcType = ReturnType<typeof VerticeArc>;
