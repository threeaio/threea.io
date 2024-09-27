import P5 from "p5";
import { BrockmanProps } from "~/components/animation/Primitives/Arc-Props";

export default class Brockmann1 {
  _p5: P5;
  _props: BrockmanProps;

  constructor(p5: P5, props: BrockmanProps) {
    this._p5 = p5;
    this._props = props;
  }

  draw(position: P5.Vector, rFactor: number) {
    const p5 = this._p5; // just for convenience

    const angleStart = this._props.arcStart + rFactor * -30;
    const angleEnd = this._props.arcEnd + rFactor * 30;

    const radiusInner = this._props.radius;
    const radiusOuter = radiusInner + this._props.thickness;

    p5.push();
    p5.stroke(this._props?.outlineColor || "white");
    p5.strokeCap(p5.SQUARE);
    p5.noFill();
    p5.strokeWeight(0.5);

    // line1
    const x1 = position.x + (this._p5.cos(angleStart) * radiusInner) / 2;
    const y1 = position.y + (this._p5.sin(angleStart) * radiusInner) / 2;
    const x2 = position.x + (this._p5.cos(angleStart) * radiusOuter) / 2;
    const y2 = position.y + (this._p5.sin(angleStart) * radiusOuter) / 2;
    p5.line(x1, y1, x2, y2);

    // line2
    const x3 = position.x + (this._p5.cos(angleEnd) * radiusInner) / 2;
    const y3 = position.y + (this._p5.sin(angleEnd) * radiusInner) / 2;
    const x4 = position.x + (this._p5.cos(angleEnd) * radiusOuter) / 2;
    const y4 = position.y + (this._p5.sin(angleEnd) * radiusOuter) / 2;
    p5.line(x3, y3, x4, y4);

    // arcs
    p5.arc(
      position.x,
      position.y,
      radiusInner,
      radiusInner,
      angleStart,
      angleEnd,
    );
    p5.arc(
      position.x,
      position.y,
      radiusOuter,
      radiusOuter,
      angleStart,
      angleEnd,
    );
    // p5.arc(
    //   position.x,
    //   position.y,
    //   (radius2 + radius1) / 2,
    //   (radius2 + radius1) / 2,
    //   angleStart,
    //   angleEnd,
    // );
    p5.pop();

    // p5.push();
    // p5.stroke(this._props?.color || "white");
    // p5.strokeCap(p5.SQUARE);
    // p5.noFill();
    // p5.strokeWeight(this._props.thickness / 2);
    // p5.arc(
    //   position.x,
    //   position.y,
    //   (radius2 + radius1) / 2,
    //   (radius2 + radius1) / 2,
    //   angleStart,
    //   angleEnd,
    // );
    // p5.pop();
  }
}
