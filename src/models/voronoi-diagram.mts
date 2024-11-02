import { BaseModel } from "./BaseModel.mjs";
import { Vec2, Point, getRandomColor } from "../utils.mjs";

export class VoronoiDiagram extends BaseModel {
  name = "Voronoi Diagram";
  render(): void {
    const points = 8;
    const centroids = this.initRandomPoints(points);
    const vColors = this.calculatePointColor(centroids);
    this.renderPoints(vColors);
    this.renderPoints(centroids, "black");
  }

  getCanvasDimensions(): [number, number] {
    const w = this.ctx.canvas.width;
    const h = this.ctx.canvas.height;
    return [w, h];
  }

  calculatePointColor(points: Point[]): Point[] {
    const [w, h] = this.getCanvasDimensions();
    const result: Point[] = [];
    for (let y = 0; y < h; ++y) {
      for (let x = 0; x < w; ++x) {
        let shortestDistance = w * h;
        const c = new Vec2(x, y);
        const p = new Point(c, "black");
        for (const point of points) {
          const d = point.pos.sub(c).len();
          if (d < shortestDistance) {
            shortestDistance = d;
            p.color = point.color;
          }
        }

        result.push(p);
      }
    }
    return result;
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
  renderPoints(points: Point[], color: string | undefined = undefined) {
    for (const point of points) {
      const p = point.pos;
      this.ctx.moveTo(p.x, p.y);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, point.radius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = color ?? point.color;
      this.ctx.fillStyle = color ?? point.color;
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  initRandomPoints(n: number): Point[] {
    const result: Point[] = [];
    const [w, h] = this.getCanvasDimensions();
    for (let i = 0; i < n; ++i) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const c = getRandomColor();
      const r = 3;

      const pos = new Vec2(x, y);
      const p = new Point(pos, c, r);

      result.push(p);
    }
    return result;
  }
}
