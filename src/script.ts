class Vec2 {
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

class FractalTrees implements IModel {
  name = "Fractal Trees";
  leftAngle = (2 * Math.PI) / 11;
  rightAngle = (2 * Math.PI) / 7;
  ratio = 0.75;
  getCanvasCenter(ctx: CanvasRenderingContext2D): Vec2 {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    return new Vec2(w / 2, h / 2);
  }

  render(ctx: CanvasRenderingContext2D): void {
    const depth = 1;
    const start = this.getCanvasCenter(ctx);
    const dir = new Vec2(0, -75);
    this.drawRect(ctx, start, dir.rev());
    this.renderBranch(ctx, start, dir, depth);
  }

  renderBranch(
    ctx: CanvasRenderingContext2D,
    pos: Vec2,
    dir: Vec2,
    depth: number,
  ) {
    if (depth === 0) return;
    const left = dir.copy().addAngle(this.leftAngle).mul(this.ratio);
    const right = dir.copy().addAngle(-this.rightAngle).mul(this.ratio);

    this.drawRect(ctx, pos, left);
    this.drawRect(ctx, pos, right);

    this.renderBranch(ctx, pos.add(left), left, depth - 1);
    this.renderBranch(ctx, pos.add(right), right, depth - 1);
  }

  drawLine(ctx: CanvasRenderingContext2D, pos: Vec2, dir: Vec2) {
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + dir.x, pos.y + dir.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  drawRect(ctx: CanvasRenderingContext2D, pos: Vec2, dir: Vec2) {
    this.drawLine(ctx, pos, dir);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.fillStyle = "black";
    ctx.strokeRect(pos.x, pos.y, dir.x, dir.y);
  }
}

function getCanvas2D(): CanvasRenderingContext2D {
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

function displayModelName(name: string) {
  const modelNameEl: HTMLElement | null = document.getElementById("model-name");
  if (modelNameEl === null) {
    throw new Error("No model-name element found");
  }
  modelNameEl.innerText = name;
}

function renderModel(ctx: CanvasRenderingContext2D, model: IModel) {
  displayModelName(model.name);
  model.render(ctx);
}

function main() {
  const ctx = getCanvas2D();
  renderModel(ctx, new FractalTrees());
}

main();
