import { FractalTrees } from "./models/fractal-trees.mjs";
import { VoronoiDiagram } from "./models/voronoi-diagram.mjs";
import { getCanvas2D } from "./utils.mjs";
import { initModelSelection } from "./models/index.mjs";
import { IModel } from "./models/IModel.mjs";

function main() {
  const ctx = getCanvas2D();
  const models: Array<IModel> = [
    new VoronoiDiagram(ctx, "Voronoi Diagram"),
    new FractalTrees(ctx, "Fractal Trees"),
  ];
  initModelSelection(models);
}

main();
