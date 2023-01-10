import Simulation from "./simulation/Simulation.js";
import * as Renderer from "./pixi-adapter/renderer.js";
import { getChartsPanel, getRendererContainer } from "./gui/components/simulation.js";
import { create as createTotalNumbersChart } from "./gui/charts/totalNumbers.js";
import { create as createTotalMassesChart } from "./gui/charts/totalMasses.js";
import { createEntity } from "./simulation/entities/generator.js";

import startSimulation from "./loop.js";
import { setSeed } from "./utilities/random.js";
import Configuration from "./simulation/Configuration.js";

const init = () => {
// disable right click context menu
    document.addEventListener("contextmenu", (event) => {
        event.stopPropagation();
        event.preventDefault();
    });

    Renderer.createRenderer(getRendererContainer());

    setSeed(Configuration.seed);

    Object.values(Configuration.Entities).forEach((config) => {
        for (let i = 0; i < config.quantity; i = i + 1) {
            const entity = createEntity(config.symbol, config.defaults);
            Simulation.addEntity(entity);
            Renderer.addElement(entity);
        }
    });

    const chartsPanel = getChartsPanel();
    createTotalNumbersChart(chartsPanel);
    createTotalMassesChart(chartsPanel);

    startSimulation();
};

export default init;
