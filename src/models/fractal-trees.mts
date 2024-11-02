import { Vec2 } from "../utils.mjs";
import { BaseModel } from "./BaseModel.mjs";

export class FractalTrees extends BaseModel {
  leftAngle = (2 * Math.PI) / 11;
  rightAngle = (2 * Math.PI) / 7;
  ratio = 0.75;

  getCanvasCenter(): Vec2 {
    const w = this.ctx.canvas.width;
    const h = this.ctx.canvas.height;

    return new Vec2(w / 2, h / 2);
  }

  render(): void {
    const depth = 8;
    const start = this.getCanvasCenter();
    const dir = new Vec2(0, -75);
    this.drawRect(start, dir.rev());
    this.renderBranch(start, dir, depth);
  }

  renderBranch(pos: Vec2, dir: Vec2, depth: number) {
    if (depth === 0) return;
    const left = dir.copy().addAngle(this.leftAngle).mul(this.ratio);
    const right = dir.copy().addAngle(-this.rightAngle).mul(this.ratio);

    this.drawRect(pos, left);
    this.drawRect(pos, right);

    this.renderBranch(pos.add(left), left, depth - 1);
    this.renderBranch(pos.add(right), right, depth - 1);
  }

  drawLine(pos: Vec2, dir: Vec2) {
    this.ctx.moveTo(pos.x, pos.y);
    this.ctx.lineTo(pos.x + dir.x, pos.y + dir.y);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }

  drawRect(pos: Vec2, dir: Vec2) {
    this.drawLine(pos, dir);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
    this.ctx.fillStyle = "black";
    this.ctx.strokeRect(pos.x, pos.y, dir.x, dir.y);
  }
}
