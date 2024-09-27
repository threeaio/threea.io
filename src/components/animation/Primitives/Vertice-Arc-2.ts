import P5 from "p5";
import { BrockmanProps } from "~/components/animation/Primitives/Arc-Props";
import { coordOfCircle, createArrayFromLength, hexToRgb } from "~/_util";

export default class VerticeArc2 {
  private _p5: P5;
  private _props: BrockmanProps;
  private _vertexPoints: P5.Vector[] = [];
  private _scale = 1;
  private _rotate = 0;
  private _straightness = 1;
  private _outerMax = 0;
  private _innerMin = 0;

  private _va: P5.Vector[] = [];
  private _vb: P5.Vector[] = [];

  constructor(p5: P5, props: BrockmanProps) {
    this._p5 = p5;
    this._props = props;
  }

  get props() {
    return this._props;
  }

  set props(value: BrockmanProps) {
    this._props = value;
  }

  get scale() {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
  }

  get rotate() {
    return this._rotate;
  }

  set rotate(value: number) {
    this._rotate = value;
  }

  get straightness() {
    return this._straightness;
  }

  set straightness(value: number) {
    this._straightness = value;
  }

  get outerMax() {
    return this._outerMax;
  }

  set outerMax(value: number) {
    this._outerMax = value;
  }

  get innerMin() {
    return this._innerMin;
  }

  set innerMin(value: number) {
    this._innerMin = value;
  }

  get va() {
    return this._va;
  }

  set va(value: P5.Vector[]) {
    this._va = value;
  }

  get vb() {
    return this._vb;
  }

  set vb(value: P5.Vector[]) {
    this._vb = value;
  }

  update(position: P5.Vector) {
    const { arcStart, arcEnd, radius, thickness, numPoints } = this._props;
    const p5 = this._p5;
    const angleStart = arcStart + this._rotate - 90;
    const angleEnd = arcEnd + this._rotate - 90;
    const radiusInner = radius * this._scale;
    const radiusOuter = radiusInner + thickness * this._scale;

    const useHScale =
      this._outerMax && this._innerMin
        ? p5.height / (this._outerMax - this._innerMin)
        : 1;
    const { topLeft, topRight, bottomLeft, bottomRight } =
      this.calculateRectCoords(radiusOuter, radiusInner, useHScale);

    const pointsOnArcOuter = this.createPointsOnArc(
      position,
      angleStart,
      angleEnd,
      radiusOuter,
      topLeft,
      topRight,
    );
    const pointsOnArcInner = this.createPointsOnArc(
      position,
      angleStart,
      angleEnd,
      radiusInner,
      bottomLeft,
      bottomRight,
    );

    this._va = pointsOnArcInner;
    this._vb = pointsOnArcOuter;
    this._vertexPoints = [...pointsOnArcInner, ...pointsOnArcOuter.reverse()];
  }

  private calculateRectCoords(
    radiusOuter: number,
    radiusInner: number,
    useHScale: number,
  ) {
    const p5 = this._p5;
    const topLeft = new P5.Vector(
      p5.width / -2,
      (this._outerMax - radiusOuter) * useHScale,
    );
    const topRight = new P5.Vector(
      p5.width * 2,
      (this._outerMax - radiusOuter) * useHScale,
    );
    const bottomLeft = new P5.Vector(
      p5.width / -2,
      (this._outerMax - radiusInner) * useHScale,
    );
    const bottomRight = new P5.Vector(
      p5.width * 2,
      (this._outerMax - radiusInner) * useHScale,
    );
    return { topLeft, topRight, bottomLeft, bottomRight };
  }

  private createPointsOnArc(
    position: P5.Vector,
    angleStart: number,
    angleEnd: number,
    radius: number,
    start: P5.Vector,
    end: P5.Vector,
  ): P5.Vector[] {
    return createArrayFromLength(this._props.numPoints).map((i) => {
      const lerpedI = i / this._props.numPoints;
      const angleHere = this._p5.lerp(angleStart, angleEnd, lerpedI);
      const circleCoord = coordOfCircle(this._p5, position, angleHere, radius);
      return new P5.Vector(
        this._p5.lerp(
          this._p5.lerp(start.x, end.x, lerpedI),
          circleCoord.x,
          this._straightness,
        ),
        this._p5.lerp(
          this._p5.lerp(start.y, end.y, lerpedI),
          circleCoord.y,
          this._straightness,
        ),
      );
    });
  }

  draw() {
    const p5 = this._p5;

    p5.push();
    p5.fill(this._props.fillColor);
    p5.noStroke();
    p5.beginShape();
    for (let i = 0; i < this._vertexPoints.length; i++) {
      p5.vertex(this._vertexPoints[i].x, this._vertexPoints[i].y);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();

    p5.push();
    p5.noFill();
    p5.stroke(this._props.outlineColor);
    p5.strokeWeight(0.5);

    for (let i = 0; i < this._va.length; i += 2) {
      const perp = this._vb[this._va.length - i];
      const perp2 = this._vb[this._va.length - i - 1];
      if (perp && perp2 && i < this._va.length) {
        p5.beginShape();
        p5.vertex(this._va[i].x, this._va[i].y);
        p5.vertex(perp2.x, perp2.y);
        p5.endShape();
      }
    }

    p5.pop();
  }
}
