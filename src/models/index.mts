function displayModelName(name: string) {
  const modelNameEl: HTMLElement | null = document.getElementById("model-name");
  if (modelNameEl === null) {
    throw new Error("No model-name element found");
  }
  modelNameEl.innerText = name;
}

export function renderModel(ctx: CanvasRenderingContext2D, model: IModel) {
  displayModelName(model.name);
  model.render(ctx);
}


