import { Vec2 } from "../utils.mjs";

export class FractalTrees implements IModel {
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
