export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  len(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  addAngle(angle: number): Vec2 {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vec2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }

  copy(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  norm(): Vec2 {
    const l = this.len();
    if (l === 0) {
      return new Vec2(0, 0);
    }
    return new Vec2(this.x / l, this.y / l);
  }

  angle(): number {
    return Math.atan2(this.x, this.y);
  }

  mul(fac: number): Vec2 {
    return new Vec2(this.x * fac, this.y * fac);
  }

  add(that: Vec2): Vec2 {
    return new Vec2(this.x + that.x, this.y + that.y);
  }

  sub(that: Vec2): Vec2 {
    return new Vec2(this.x - that.x, this.y - that.y);
  }

  rev(): Vec2 {
    return new Vec2(-this.x, -this.y);
  }
}

export function getCanvas2D(): CanvasRenderingContext2D {
  const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
  if (canvas === null) {
    throw new Error("No canvas element found");
  }

  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (ctx === null) {
    throw new Error(
      "2D Renderig context not supported by your browser - bruh!",
    );
  }

  return ctx;
}
