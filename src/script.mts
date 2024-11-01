import { FractalTrees } from "./models/fractal-trees.mjs";
import { VoronoiDiagram } from "./models/voronoi-diagram.mjs";
import { getCanvas2D, initModelSelection } from "./utils.mjs";
// import { renderModel } from "./models/index.mjs";

function main() {
  const ctx = getCanvas2D();
  const models: Array<IModel> = [new FractalTrees(), new VoronoiDiagram()];
  initModelSelection(models);
  // renderModel(ctx, new FractalTrees());
  // renderModel(ctx, new VoronoiDiagram());
}

main();
