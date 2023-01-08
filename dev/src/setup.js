import Simulation from "./simulation/Simulation.js";
import * as Renderer from "./pixi-adapter/renderer.js";
import { getChartsPanel, getRendererContainer } from "./gui/components/components.js";
import { create as createTotalNumbersChart } from "./gui/charts/totalNumbers.js";
import { create as createTotalMassesChart } from "./gui/charts/totalMasses.js";

import { createAgent, createResource } from "./simulation/entities/generator.js";

// disable right click context menu
document.addEventListener("contextmenu", (event) => {
    event.stopPropagation();
    event.preventDefault();
});

Renderer.createRenderer(getRendererContainer());

// TODO add to configuration
const maxNumberOfMaterial = 100;
for (let i = 0; i < maxNumberOfMaterial; i = i + 1) {
    const resource = createResource();
    Simulation.addEntity(resource);
    Renderer.addElement(resource);
}

// TODO add to configuration
const maxNumberOfAgents = 10;
for (let i = 0; i < maxNumberOfAgents; i = i + 1) {
    const agent = createAgent();
    Simulation.addEntity(agent);
    Renderer.addElement(agent);
}

const chartsPanel = getChartsPanel();
createTotalNumbersChart(chartsPanel);
createTotalMassesChart(chartsPanel);
