import P5 from "p5";
import { BrockmanProps } from "~/components/animation/Primitives/Arc-Props";
import { coordOfCircle, createArrayFromLength } from "~/_util";

export default class VerticeArc {
  _p5: P5;
  _props: BrockmanProps;
  _vertexPoints: P5.Vector[] = [];

  constructor(p5: P5, props: BrockmanProps) {
    this._p5 = p5;
    this._props = props;
  }

  update(position: P5.Vector, rFactor: number) {
    const p5 = this._p5;

    // use of rFactor is Lame
    const angleStart = this._props.arcStart + rFactor * -20;
    const angleEnd = this._props.arcEnd + rFactor * 20;

    const radiusInner = this._props.radius;
    const radiusOuter = radiusInner + this._props.thickness;

    const numPoints = this._props.numPoints;

    const pointsOnArcInner = createArrayFromLength(numPoints).map((i) => {
      const angleHere = this._p5.lerp(angleStart, angleEnd, i / numPoints);
      return coordOfCircle(this._p5, position, angleHere, radiusInner);
    });
    const pointsOnArcOuter = createArrayFromLength(numPoints).map((i) => {
      const angleHere = this._p5.lerp(angleStart, angleEnd, i / numPoints);
      return coordOfCircle(this._p5, position, angleHere, radiusOuter);
    });
    this._vertexPoints = [...pointsOnArcInner, ...pointsOnArcOuter.reverse()];
  }

  draw() {
    const p5 = this._p5;

    p5.push();
    p5.noFill();
    p5.stroke(this._props?.color || "white");
    p5.strokeWeight(0.5);
    p5.beginShape();
    for (let i = 0; i < this._vertexPoints.length; i++) {
      p5.vertex(this._vertexPoints[i].x, this._vertexPoints[i].y);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  }
}
