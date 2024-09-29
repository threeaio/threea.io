import P5 from "p5";
import { createMemo, createSignal } from "solid-js";
import {
  createPointsOnArc,
  CreatePointsOnArcParams,
} from "~/components/animation/Primitives/points-on-arc";
import {
  calculateArcLength,
  createArrayFromLength,
  lerp,
  normalize,
} from "~/_util";
import * as p5 from "p5";

// Typen für Signale und Funktionsrückgaben
type Vector2D = { x: number; y: number };
type RectFromVectors = {
  topLeft: P5.Vector;
  topRight: P5.Vector;
  bottomRight: P5.Vector;
  bottomLeft: P5.Vector;
};
type ColorArray = [number, number, number, number];

export default function VerticeArc2(p5: P5) {
  const RESOLUTION: number = 10;
  const TEMP_SCALER: number = 0.4; // Diese Konstante wird zur temporären Skalierung verwendet
  const OFFSET_ANGLES: number = -90;

  const applyTempScale = (n: number): number => n * TEMP_SCALER; // Funktion für temporäre Skalierung
  const dvtx = (p: Vector2D): p5 => p5.vertex(p.x, p.y);

  // Definierung von Signaltypen
  const [strokeColor, setStrokeColor] = createSignal<ColorArray>([
    255, 255, 255, 255,
  ]);
  const [center, setCenter] = createSignal<Vector2D>({ x: 0, y: 0 });
  const [arcStartAngle, setArcStartAngle] = createSignal<number>(0);
  const [arcEndAngle, setArcEndAngle] = createSignal<number>(0);
  const [radius, setRadius] = createSignal<number>(0);
  const [thickness, setThickness] = createSignal<number>(0);
  const [roundness, setRoundness] = createSignal<number>(0);

  // Optimierung: Skalierter Radius und Dicke als Memo-Werte berechnen
  const scaledRadius = createMemo<number>(() => applyTempScale(radius()));
  const scaledThickness = createMemo<number>(() => applyTempScale(thickness()));

  const roundnessInverted = createMemo<number>(() => 1 - roundness());

  const arcInnerAngle = createMemo<number>(
    () => arcEndAngle() - arcStartAngle(),
  );

  const currentEndAngle = createMemo<number>(() => roundness() * arcEndAngle());

  const finalArcLength = createMemo<number>(() =>
    calculateArcLength(scaledRadius(), arcInnerAngle()),
  );

  const currentArcLength = createMemo<number>(() =>
    calculateArcLength(scaledRadius(), currentEndAngle()),
  );

  const currentArcLengthLeft = createMemo<number>(
    () => finalArcLength() - currentArcLength(),
  );

  const calculateCoordinatesOfRects = createMemo<RectFromVectors>(() => {
    const top = scaledRadius() + scaledThickness() + center().y;
    const bottom = scaledRadius() + center().y;
    const left = center().x - currentArcLengthLeft();
    const right = center().x;

    const TOP_IN_CANVAS = p5.height - top;
    const BOTTOM_IN_CANVAS = p5.height - bottom;

    return {
      topLeft: new P5.Vector(left, TOP_IN_CANVAS),
      topRight: new P5.Vector(right, TOP_IN_CANVAS),
      bottomRight: new P5.Vector(right, BOTTOM_IN_CANVAS),
      bottomLeft: new P5.Vector(left, BOTTOM_IN_CANVAS),
    };
  });

  const vertexPoints = createMemo<P5.Vector[]>(() => {
    if (!finalArcLength()) {
      return [];
    }

    const rectFromVectors = calculateCoordinatesOfRects();

    const IS_FULL_IN_CURVE = currentArcLengthLeft() <= 0;

    const tForRectWidth = normalize(
      0,
      finalArcLength(),
      currentArcLengthLeft(),
    );

    const tForArc = 1 - tForRectWidth;
    const segmentSize = finalArcLength() / RESOLUTION;

    const rectResolution = () => {
      return Math.max(Math.round(RESOLUTION * tForRectWidth), 0);
    };

    const RECT_RESOLUTION = rectResolution();
    const CURVE_RESOLUTION = RESOLUTION - RECT_RESOLUTION + 1;

    const RECT_PART_WIDTH = 1;
    const CURVE_PART_WIDTH = RESOLUTION - RECT_RESOLUTION + 1;

    const createVertexForRect = (ySide: "top" | "bottom") => {
      const left =
        ySide === "top" ? rectFromVectors.topLeft : rectFromVectors.bottomLeft;
      const right =
        ySide === "top"
          ? rectFromVectors.topRight
          : rectFromVectors.bottomRight;

      let leftHere = 0;
      let iHere = 0;
      const res = [];

      while (leftHere < right.x - segmentSize) {
        iHere++;
        leftHere = left.x + iHere * segmentSize;
        res.push(new P5.Vector(leftHere, left.y));
      }

      return res;

      // return createArrayFromLength(RESOLUTION).map((i) => {
      //   const t = normalize(0, RESOLUTION, i);
      //   const xHere = lerp(left.x, right.x, t);
      //   return new P5.Vector(xHere, left.y);
      // });
    };

    // Aufruf für obere und untere Seite:
    const vertexForRectTop = createVertexForRect("top");
    const vertexForRectBottom = createVertexForRect("bottom");

    const angleEnd = currentEndAngle();
    const angleEndDiff = angleEnd - arcEndAngle();

    const angleStart = !IS_FULL_IN_CURVE
      ? OFFSET_ANGLES
      : arcStartAngle() + OFFSET_ANGLES + angleEndDiff;

    const props: CreatePointsOnArcParams = {
      p5: p5,
      angleStart: angleStart,
      angleEnd: roundness() * arcEndAngle() + OFFSET_ANGLES,
      center: center(),
      radius: scaledRadius(),
      resolution: CURVE_RESOLUTION,
    };

    const vertexForArcOuter = createPointsOnArc({
      ...props,
      radius: scaledRadius() + scaledThickness(), // Skalierung wird hier angewendet
    });
    const vertexForArcInner = createPointsOnArc(props);

    const _vertexPoints = [
      ...(!IS_FULL_IN_CURVE ? vertexForRectTop : []),
      ...vertexForArcOuter,
      ...vertexForArcInner.reverse(),
      ...(!IS_FULL_IN_CURVE ? vertexForRectBottom.reverse() : []),
    ];

    return _vertexPoints;
  });

  const draw = (): void => {
    p5.push();
    p5.strokeWeight(0.5);
    p5.stroke(strokeColor());
    p5.noFill();
    p5.beginShape();
    for (let i = 0; i < vertexPoints().length; i++) {
      dvtx(vertexPoints()[i]);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();

    p5.push();
    p5.noFill();
    p5.stroke(strokeColor());
    p5.strokeWeight(0.5);

    const halfLength = Math.floor(vertexPoints().length / 2);
    for (let i = 0; i < halfLength; i += 1) {
      const perp = vertexPoints()[halfLength - i];
      const perp2 = vertexPoints()[halfLength + halfLength - i - 1];
      if (perp && perp2 && i < halfLength) {
        p5.beginShape();
        p5.vertex(vertexPoints()[i].x, vertexPoints()[i].y);
        p5.vertex(perp2.x, perp2.y);
        p5.endShape();
      }
    }

    p5.pop();
  };

  return {
    draw,
    setArcStartAngle,
    setArcEndAngle,
    setRadius,
    setThickness,
    setRoundness,
    setCenter,
  };
}

export type VerticeArc2Type = ReturnType<typeof VerticeArc2>;
