import P5 from "p5";
import { createMemo, createSignal } from "solid-js";
import * as p5 from "p5";
import { COLORS_3A } from "~/_util-client-only";
import {
  ColorArray,
  Simple2D,
  calculateArcLength,
  createArrayFromLength,
  getAngleFromArcLengthInDegrees,
  lerp,
  createSimple2D,
} from "~/_util";
import { coordOfCircle } from "~/_util-client-only";
export type VerticeArcConfig = {
  debug: boolean;
  randomizeStartPosition: boolean;
  fill: { color: ColorArray } | false;
  stroke: { color: ColorArray } | false;
};

export default function VerticeArc(p5: P5, config: VerticeArcConfig) {
  const RESOLUTION_MIN: number = 60; // Resolution for vertex generation along the arc
  const RESOLUTION_VERT: number = 4; // Resolution for vertex generation along the arc

  const TEMP_SCALER: number = 1; // This constant is used for temporary scaling
  const OFFSET_ANGLES: number = -90; // Offset for calculating angles from the top, like a clock

  const applyTempScale = (n: number): number => n * TEMP_SCALER;

  /**
   * Draws a vertex at the given coordinates.
   * @param {Simple2D} p - The position vector where the vertex should be drawn.
   * @returns {p5} - The p5 vertex function.
   */
  const dvtx = (p: Simple2D): p5 => p5.vertex(p.x, p.y);

  // Signals for arc properties
  const [strokeColor, setStrokeColor] = createSignal<ColorArray>([
    255, 255, 255, 255,
  ]);
  // const [center, setCenter] = createSignal<Vector2D>({ x: 0, y: 0 });
  const [centerX, setCenterX] = createSignal<number>(0);
  const [centerY, setCenterY] = createSignal<number>(0);
  const [dimensions, setDimension] = createSignal<Simple2D>({ x: 0, y: 0 });

  const [arcStartAngle, setArcStartAngle] = createSignal<number>(0);
  const useStartAngle = createMemo<number>(() => arcStartAngle());
  const [arcEndAngle, setArcEndAngle] = createSignal<number>(0);
  const useEndAngle = createMemo<number>(() => arcEndAngle());
  const [radius, setRadius] = createSignal<number>(0);
  const [thickness, setThickness] = createSignal<number>(0);
  const [progress, setProgress] = createSignal<number>(0);

  // no need for signal here
  const [startOffset, setStartOffset] = createSignal<number>(
    config.randomizeStartPosition ? p5.random(-2, dimensions().x / 2) : 0,
  );

  // Memoized values for scaled radius and thickness
  const center = createMemo<Simple2D>(() => ({
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
    () => useEndAngle() - useStartAngle(),
  );
  const finalArcLength = createMemo<number>(() =>
    calculateArcLength(scaledInnerRadius(), arcInnerAngle()),
  );

  // Position calculations
  const linePositionY = createMemo<number>(
    () => centerY() - scaledInnerRadius(),
  );

  const startPositionX = createMemo<number>(
    () => dimensions().x / 2 - finalArcLength() + startOffset(),
  );
  const finalPositionX = createMemo<number>(
    () => center().x + calculateArcLength(scaledInnerRadius(), useStartAngle()),
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
    {
      top: Simple2D;
      bottom: Simple2D;
      center: Simple2D | null;
      shadow: Simple2D | null;
    }[]
  >(() => {
    if (!finalArcLength()) {
      return [];
    }

    const USE_RESOLUTION = Math.max(
      Math.round(RESOLUTION_MIN * (dimensions().x / 1400)),
      RESOLUTION_MIN,
    );

    const SEGMENT_SIZE = finalArcLength() / USE_RESOLUTION;

    return createArrayFromLength(USE_RESOLUTION + 1).map((i: number) => {
      const start = currentX() + i * SEGMENT_SIZE;

      let top;
      let centerLine;
      let bottom;
      let shadow;

      if (start <= center().x) {
        centerLine = createSimple2D(start, linePositionY());
        top = createSimple2D(start, linePositionY() - scaledThickness() / 2);
        bottom = createSimple2D(start, linePositionY() + scaledThickness() / 2);
        shadow = null;
      } else {
        shadow = createSimple2D(start, linePositionY());

        const arcLength = start - center().x;
        const angle =
          getAngleFromArcLengthInDegrees(arcLength, scaledInnerRadius()) +
          OFFSET_ANGLES;

        const sinHere = p5.sin(angle);
        const cosHere = p5.cos(angle);

        centerLine =
          config.stroke || config.debug
            ? coordOfCircle(p5, center(), angle, scaledInnerRadius())
            : null;

        // top = coordOfCircle(
        //   p5,
        //   center(),
        //   angle,
        //   scaledInnerRadius() + scaledThickness() / 2,
        // );

        // bottom = coordOfCircle(
        //   p5,
        //   center(),
        //   angle,
        //   scaledInnerRadius() - scaledThickness() / 2,
        // );

        const rOuter = scaledInnerRadius() + scaledThickness() / 2;
        const rInner = scaledInnerRadius() - scaledThickness() / 2;

        top = createSimple2D(
          center().x + cosHere * rOuter,
          center().y + sinHere * rOuter,
        );

        bottom = createSimple2D(
          center().x + cosHere * rInner,
          center().y + sinHere * rInner,
        );
      }

      return {
        top,
        center: centerLine,
        bottom,
        shadow,
      };
    });
  });

  /**
   * Draws the arcs
   */
  const draw = (): void => {
    if (!config.debug) {
      if (config.fill) {
        p5.push();
        p5.strokeWeight(0.5);
        p5.noStroke();
        p5.fill(config.fill.color);
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
      }

      if (config.stroke) {
        p5.push();
        p5.noFill();
        p5.stroke(config.stroke.color);
        p5.strokeWeight(0.5);

        p5.beginShape();
        /// outline
        for (let i = 0; i < vertexPoints().length; i++) {
          dvtx(vertexPoints()[i].top);
        }
        const reversed = [...vertexPoints()].reverse();
        for (let i = 0; i < vertexPoints().length; i++) {
          dvtx(reversed[i].bottom);
        }
        p5.endShape(p5.CLOSE);

        /// center
        for (let i = 0; i < vertexPoints().length - 1; i++) {
          p5.line(
            vertexPoints()[i].center!.x,
            vertexPoints()[i].center!.y,
            vertexPoints()[i + 1].center!.x,
            vertexPoints()[i + 1].center!.y,
          );
        }

        /// verticals
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
      }
    } else if (config.debug) {
      p5.push();
      p5.stroke(COLORS_3A.RED);
      p5.fill(COLORS_3A.GRAY_DARKEST);
      p5.strokeWeight(0.5);
      p5.line(center().x, 0, center().x, p5.height);
      p5.circle(center().x, center().y, 15);
      p5.pop();

      p5.push();

      p5.noFill();
      p5.stroke(strokeColor());
      p5.strokeWeight(0.5);

      p5.beginShape();
      for (let i = 0; i < vertexPoints().length; i++) {
        if (i % 4 === 0) {
          dvtx(vertexPoints()[i].center!);
        }
      }
      p5.endShape();

      p5.push();
      p5.stroke(COLORS_3A.RED);
      let shadI = -1;
      for (let i = 0; i < vertexPoints().length; i++) {
        if (vertexPoints()[i].shadow && i % 4 === 0) {
          p5.circle(
            vertexPoints()[i].shadow!.x,
            vertexPoints()[i].shadow!.y,
            5,
          );
          shadI = i;
        }
      }

      if (shadI > -1) {
        p5.line(
          vertexPoints()[shadI].shadow!.x,
          vertexPoints()[shadI].shadow!.y - 20,
          center().x,
          vertexPoints()[shadI].shadow!.y - 20,
        );
        p5.line(
          center().x,
          center().y,
          vertexPoints()[shadI].center!.x,
          vertexPoints()[shadI].center!.y,
        );
      }
      p5.pop();

      for (let i = 0; i < vertexPoints().length; i++) {
        if (i % 4 === 0) {
          p5.circle(
            vertexPoints()[i].center!.x,
            vertexPoints()[i].center!.y,
            5,
          );
        }
      }
    }
  };

  // Return functions to set various arc properties and the draw function
  return {
    draw,
    arcStartAngle,
    setArcStartAngle,
    arcEndAngle,
    setArcEndAngle,
    setRadius,
    setThickness,
    setProgress,
    setCenterX,
    setCenterY,
    setDimension,
    setStrokeColor,
    dimensions,
    setStartOffset,
    startOffset,
  };
}

/**
 * Type definition for the VerticeArc function's return value.
 */
export type VerticeArcType = ReturnType<typeof VerticeArc>;
