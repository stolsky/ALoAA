import Simulation from "./simulation/Simulation.js";

import { updateOutputTimePassed } from "./gui/components.js";
import * as Renderer from "./pixi-adapter/renderer.js";
import updateTotalNumbers from "./gui/charts/totalNumbers.js";

import "./setup.js";

const calculateTime = (deltaTime) => {
    const adjustedDeltaTime = Simulation.speedFactor * deltaTime;
    Simulation.timePassed = Simulation.timePassed + adjustedDeltaTime;
    updateOutputTimePassed(Simulation.timePassed);
    return adjustedDeltaTime;
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

const updateCharts = (adjustedDeltaTime) => {
    updateTotalNumbers(adjustedDeltaTime);
};

let slowDownCounter = 0;
Renderer.loop((deltaTime) => {

    const speed = Simulation.speedFactor;

    if (speed < 1 && slowDownCounter < 1 / speed) {
        slowDownCounter = slowDownCounter + 1;
    } else {
        const adjustedDeltaTime = calculateTime(deltaTime);

        const resources = Simulation.getResources();
        const agents = Simulation.getAgents();

        for (let i = 0; i < Simulation.speedFactor; i = i + 1) {
            updateEntities(resources);
            updateEntities(agents);
        }

        renderEntities(resources);
        renderEntities(agents);
        updateCharts(adjustedDeltaTime);

        slowDownCounter = 0;
    }

});
