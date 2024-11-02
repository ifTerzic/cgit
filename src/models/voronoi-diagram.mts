import { BaseModel } from "./BaseModel.mjs";
import { Vec2, Point, getRandomColor } from "../utils.mjs";

export class VoronoiDiagram extends BaseModel {
  name = "Voronoi Diagram";
  points: Point[] = [];
  render(): void {
    const points = 8;
    this.initRandomPoints(points);
    this.renderPoints();
    this.calculatePointColor();
  }

  getCanvasDimensions(): [number, number] {
    const w = this.ctx.canvas.width;
    const h = this.ctx.canvas.height;
    return [w, h];
  }

  calculatePointColor() {
    const [w, h] = this.getCanvasDimensions();
    for (let y = 0; y < h; ++y) {
      for (let x = 0; x < w; ++x) {
        let shortestDistance = w * h;
        for (const point of this.points) {
          const c = new Vec2(x, y);
          const d = point.pos.sub(c).len();
          if (d < shortestDistance) {
            shortestDistance = d;
            const p = new Point(c, point.color);
            this.renderPoint(p);
          }
        }
      }
    }
  }
  renderPoint(p: Point) {
    this.ctx.moveTo(p.pos.x, p.pos.y);
    this.ctx.beginPath();
    this.ctx.arc(p.pos.x, p.pos.y, p.radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = p.color;
    this.ctx.fillStyle = p.color;
    this.ctx.fill();
    this.ctx.stroke();
  }
  renderPoints() {
    for (const point of this.points) {
      const p = point.pos;
      this.ctx.moveTo(p.x, p.y);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, point.radius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = point.color;
      this.ctx.fillStyle = point.color;
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  initRandomPoints(n: number) {
    this.points.length = 0;
    const [w, h] = this.getCanvasDimensions();
    for (let i = 0; i < n; ++i) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const c = getRandomColor();
      const r = 3;

      const pos = new Vec2(x, y);
      const p = new Point(pos, c, r);

      this.points.push(p);
    }
  }
}
