import { IModel } from "../models/IModel.mjs";

function displayModelName(name: string) {
  const modelNameEl: HTMLElement | null = document.getElementById("model-name");
  if (modelNameEl === null) {
    throw new Error("No model-name element found");
  }
  modelNameEl.innerText = name;
}

export function renderModel(model: IModel) {
  displayModelName(model.name);
  model.render();
}

export function getModelSelect(): HTMLSelectElement {
  const modelSelect: HTMLSelectElement | null =
    document.querySelector("#model-select");

  if (modelSelect === null) {
    throw new Error("No select element with id 'model-select' provided");
  }

  if (!(modelSelect instanceof HTMLSelectElement)) {
    throw new Error("Element with id 'model-select' is not a <select>");
  }

  return modelSelect;
}

export function createModelOptionElement(model: IModel): HTMLOptionElement {
  const el = document.createElement("option");
  el.value = model.name;
  el.innerText = model.name;
  return el;
}

export function initModelSelection(models: IModel[]): void {
  const modelSelect = getModelSelect();
  models.forEach((m) => {
    const optionEl = createModelOptionElement(m);
    modelSelect.appendChild(optionEl);
  });
  modelSelect.addEventListener("change", function () {
    const modelToRender = models.filter((m) => m.name === this.value);
    if (modelToRender.length === 0) {
      throw new Error("Unreachable");
    }

    if (modelToRender.length > 1) {
      throw new Error(
        "Ambigious Modelname provided. Please change it in the code brev.",
      );
    }
    const model: IModel = modelToRender[0];
    model.resetCanvas();
    model.render();
  });
}
