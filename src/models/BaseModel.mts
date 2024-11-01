import { IModel } from "./IModel.mjs";

export abstract class BaseModel implements IModel {
  name: string;

  constructor(
    protected ctx: CanvasRenderingContext2D,
    name: string,
  ) {
    this.ctx = ctx;
    this.name = name;
  }

  resetCanvas(): void {
    this.ctx.reset();
  }

  abstract render(): void;
}
