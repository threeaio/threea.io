import P5 from "p5";
import { createMemo, createSignal } from "solid-js";
import {
  createPointsOnArc,
  createPointsOnArc2,
  CreatePointsOnArcParams,
  CreatePointsOnArcParams2,
} from "~/components/animation/Primitives/points-on-arc";
import {
  calculateArcLength,
  createArrayFromLength,
  getAngleFromArcLengthInDegrees,
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

export default function VerticeArc3(p5: P5) {
  const RESOLUTION: number = 8;

  const TEMP_SCALER: number = 0.2; // Diese Konstante wird zur temporären Skalierung verwendet
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
  const scaledCenterRadius = createMemo<number>(
    () => (scaledRadius() * scaledThickness()) / 2,
  );

  const roundnessInverted = createMemo<number>(() => 1 - roundness());

  const arcInnerAngle = createMemo<number>(
    () => arcEndAngle() - arcStartAngle(),
  );

  const currentEndAngle = createMemo<number>(() => roundness() * arcEndAngle());

  const finalArcLength = createMemo<number>(() =>
    calculateArcLength(scaledCenterRadius(), arcInnerAngle()),
  );
  const currentArcLength = createMemo<number>(() =>
    calculateArcLength(scaledCenterRadius(), currentEndAngle()),
  );
  const currentArcLengthLeft = createMemo<number>(() => {
    return finalArcLength() - currentArcLength();
  });

  const calculateCoordinatesOfStraight = createMemo(() => {
    const left = center().x - currentArcLengthLeft();
    const right = center().x;
    const y = scaledCenterRadius() + center().y;
    const Y_IN_CANVAS = p5.height - y;

    return {
      left: new P5.Vector(left, Y_IN_CANVAS),
      right: new P5.Vector(right, Y_IN_CANVAS),
    };
  });

  const vertexPoints = createMemo<P5.Vector[]>(() => {
    // early return if things are not ready
    if (!finalArcLength()) {
      return [];
    }

    const line = calculateCoordinatesOfStraight();

    const RADIUS = scaledCenterRadius();

    const SEGEMENT_SIZE = finalArcLength() / RESOLUTION;

    const CURVE_COMPLETE = currentArcLengthLeft() - SEGEMENT_SIZE <= 0;
    const PERCENT_CURVE_COMPLETE = 1 - currentArcLengthLeft() - SEGEMENT_SIZE;

    const RESOLUTION_LINES = Math.round(
      (RESOLUTION + 1) * PERCENT_CURVE_COMPLETE,
    );
    const RESOLUTION_ARCS = RESOLUTION - RESOLUTION_LINES;

    const createVertexForLine = () => {
      let leftHere = 0;
      let iHere = 0;
      const res = [];

      while (leftHere <= line.right.x - SEGEMENT_SIZE) {
        iHere++;
        leftHere = line.left.x + iHere * SEGEMENT_SIZE;
        res.push(new P5.Vector(leftHere, line.left.y));
      }
      return res;
    };

    const lineVertexes = createVertexForLine();

    const MAX_TAKEN_BY_LINE = lineVertexes.at(-1)?.x || 0;

    const MISSING_X = SEGEMENT_SIZE - (line.right.x - MAX_TAKEN_BY_LINE);

    const additionalAngle = getAngleFromArcLengthInDegrees(MISSING_X, RADIUS);

    const angleEndDiff = arcEndAngle() - currentEndAngle();

    const angleStart = !CURVE_COMPLETE
      ? OFFSET_ANGLES
      : arcStartAngle() + OFFSET_ANGLES - angleEndDiff;

    const vertexForArc = createPointsOnArc2({
      p5: p5,
      center: center(),
      radius: RADIUS,
      angleStart: angleStart + additionalAngle,
      angleEnd: currentEndAngle() + OFFSET_ANGLES + additionalAngle,
      angleToAdd: arcInnerAngle() / RESOLUTION,
      resolution: RESOLUTION,
      useResolution: CURVE_COMPLETE,
    });

    return [...(!CURVE_COMPLETE ? lineVertexes : []), ...vertexForArc];
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
    p5.endShape();
    p5.pop();

    p5.push();
    p5.noFill();
    p5.stroke(strokeColor());
    p5.strokeWeight(0.5);

    for (let i = 0; i < vertexPoints().length; i++) {
      p5.circle(vertexPoints()[i].x, vertexPoints()[i].y, 5);
    }

    p5.pop();

    p5.push();
    p5.noFill();
    p5.stroke("red");
    p5.strokeWeight(1);

    p5.line(p5.width / 2, 0, p5.width / 2, p5.height);

    p5.pop();

    // p5.push();
    // p5.noFill();
    // p5.stroke(strokeColor());
    // p5.strokeWeight(0.5);
    //
    // const halfLength = Math.floor(vertexPoints().length / 2);
    // for (let i = 0; i < halfLength; i += 1) {
    //   const perp = vertexPoints()[halfLength - i];
    //   const perp2 = vertexPoints()[halfLength + halfLength - i - 1];
    //   if (perp && perp2 && i < halfLength) {
    //     p5.beginShape();
    //     p5.vertex(vertexPoints()[i].x, vertexPoints()[i].y);
    //     p5.vertex(perp2.x, perp2.y);
    //     p5.endShape();
    //   }
    // }
    //
    // p5.pop();
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

export type VerticeArc3Type = ReturnType<typeof VerticeArc3>;
