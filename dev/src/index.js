import Simulation from "./simulation/Simulation.js";

import { updateOutputTimePassed } from "./gui/components.js";
import * as Renderer from "./pixi-adapter/renderer.js";
import updateBarChart from "./charts/bar.js";

import "./setup.js";

// https://jsdoc.app/

const updateTimer = (deltaTime) => {
    let time = Simulation.timePassed;
    time = time + Simulation.speedFactor * deltaTime;
    Simulation.timePassed = time;
    updateOutputTimePassed(time);
};

const updateEntities = (entities) => {
    entities.forEach((entity) => {
        entity.update();
    });
};

const renderEntities = (entities) => {
    entities.forEach((entity) => {
        entity.render();
    });
};

const updateCharts = () => {
    updateBarChart();
};

Renderer.loop((deltaTime) => {

    updateTimer(deltaTime);

    const resources = Simulation.getResources();
    const agents = Simulation.getAgents();

    for (let i = 0; i < Simulation.speedFactor; i = i + 1) {
        updateEntities(resources);
        updateEntities(agents);
    }

    renderEntities(resources);
    renderEntities(agents);
    updateCharts();

});
