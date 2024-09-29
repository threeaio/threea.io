import P5 from "p5";
import { createMemo, createSignal } from "solid-js";
import {
  createPointsOnArc,
  CreatePointsOnArcParams,
} from "~/components/animation/Primitives/points-on-arc";
import { calculateArcLength } from "~/_util";

export default function VerticeArc2(p5: P5) {
  const RESOLUTION = 60;
  const TEMP_SCALER = 0.3; // Diese Konstante wird zur temporären Skalierung verwendet
  const OFFSET_ANGLES = -90;

  const applyTempScale = (n: number) => n * TEMP_SCALER; // Funktion für temporäre Skalierung

  const [strokeColor, setStrokeColor] = createSignal([255, 255, 255, 255]);
  const [center, setCenter] = createSignal({ x: 0, y: 0 });
  const [arcStartAngle, setArcStartAngle] = createSignal(0);
  const [arcEndAngle, setArcEndAngle] = createSignal(0);
  const [radius, setRadius] = createSignal(0);
  const [thickness, setThickness] = createSignal(0);
  const [roundness, setRoundness] = createSignal(0);

  const arcInnerAngle = createMemo(() => {
    return arcEndAngle() - arcStartAngle();
  });

  const currentEndAngle = createMemo(() => {
    return (1 - roundness()) * arcEndAngle();
  });

  const finalArcLength = createMemo(() => {
    return calculateArcLength(applyTempScale(radius()), arcInnerAngle());
  });

  const currentArcLength = createMemo(() => {
    return calculateArcLength(applyTempScale(radius()), currentEndAngle());
  });

  const currentArcLengthLeft = createMemo(() => {
    return finalArcLength() - currentArcLength();
  });

  const calculateCoordinatesOfRects = () => {
    const top = applyTempScale(radius() + thickness()) + center().y;
    const bottom = applyTempScale(radius()) + center().y;
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
  };

  const dvtx = (p: { x: number; y: number }) => p5.vertex(p.x, p.y);

  const draw = () => {
    const ROUNDNESS_INVERTED = 1 - roundness();
    const coordinates = calculateCoordinatesOfRects();

    const IS_FULL_IN_CURVE = currentArcLengthLeft() <= 0;

    p5.push();
    p5.strokeWeight(0.3);
    p5.stroke(strokeColor());
    p5.noFill();
    p5.beginShape();

    // const STOP_RIGHT_RECT = center().x;

    if (!IS_FULL_IN_CURVE) {
      dvtx(coordinates.bottomLeft);
      dvtx(coordinates.topLeft);
      dvtx(coordinates.topRight);
    }

    const angleEnd = currentEndAngle();
    const angleEndDiff = angleEnd - arcEndAngle();

    const angleStart = !IS_FULL_IN_CURVE
      ? OFFSET_ANGLES
      : arcStartAngle() + OFFSET_ANGLES + angleEndDiff;

    const props: CreatePointsOnArcParams = {
      p5: p5,
      angleStart: angleStart,
      angleEnd: ROUNDNESS_INVERTED * arcEndAngle() + OFFSET_ANGLES,
      center: center(),
      radius: applyTempScale(radius()),
      resolution: RESOLUTION,
    };

    const vertexForArcOuter = createPointsOnArc({
      ...props,
      radius: applyTempScale(radius() + thickness()), // Skalierung wird hier angewendet
    });

    const vertexForArcInner = createPointsOnArc(props);

    const _vertexPoints = [
      ...vertexForArcOuter,
      ...vertexForArcInner.reverse(),
    ];

    for (let i = 0; i < _vertexPoints.length; i++) {
      dvtx(_vertexPoints[i]);
    }

    if (!IS_FULL_IN_CURVE) {
      dvtx(coordinates.bottomRight);
    }
    p5.endShape(p5.CLOSE);

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
