import Simulation from "./simulation/Simulation.js";

import { updateOutputTimePassed } from "./gui/components.js";
import * as Renderer from "./pixi-adapter/renderer.js";
import updateTotalNumbers from "./gui/charts/totalNumbers.js";

import "./setup.js";
import Resource from "./simulation/entities/Resource.js";
import Bar from "./simulation/core/Bar.js";
import { ClassType } from "./simulation/core/Types.js";

const calculateTime = (deltaTime) => {
    const adjustedDeltaTime = Simulation.speedFactor * deltaTime;
    Simulation.timePassed = Simulation.timePassed + adjustedDeltaTime;
    updateOutputTimePassed(Simulation.timePassed);
    return adjustedDeltaTime;
};

// TODO refactor
/**
 * @param {Array<Entity>} entities
 */
const updateEntities = (entities) => {
    entities.forEach((entity, index) => {
        entity.update();

        let remove = false;
        let organicMass = 0;

        if (entity.genes.Mass.isEmpty()) {
            remove = true;
        }

        if (entity.constructor.ClassType === ClassType.AGENT) {
            if (entity.genes.Energy.isEmpty()) {
                remove = true;
                organicMass = entity.genes.Mass.getValue();
            }
        }

        if (remove) {
            const removedEntity = entities.splice(index, 1).pop();
            Renderer.removeElement(removedEntity);
            // TODO add data to statistics
        }
        if (organicMass > 0) {
            const resource = new Resource({
                // the right padding must be twice as large as the left padding because the shape's translation point is (0, 0).
                x: entity.position.x,
                y: entity.position.y
            });
            resource.addProperties(
                new Bar({ id: "Mass", value: { min: 0, now: organicMass, max: organicMass } }),
                new Bar({ id: "Decomposition", value: { min: 0, now: 100, max: 100 } })
            );
            Simulation.addEntity(resource);
            Renderer.addElement(resource);
        }
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
