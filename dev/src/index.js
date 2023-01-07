import Simulation from "./simulation/Simulation.js";

import { updateOberverPanel, updateOutputTimePassed } from "./gui/components.js";
import * as Renderer from "./pixi-adapter/renderer.js";
import updateTotalNumbers from "./gui/charts/totalNumbers.js";
import updateTotalMasses from "./gui/charts/totalMasses.js";

import "./setup.js";
import Bar from "./simulation/core/Bar.js";
import { ClassType } from "./simulation/core/Types.js";
import Decay from "./simulation/abilities/Decay.js";
import { createResource } from "./simulation/entities/generator.js";

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
        const { Energy, Mass, Rectum } = entity.genes;

        let remove = false;
        const organic = { mass: 0, decomposition: 0 };

        // mass is required
        if (Mass.isEmpty()) {
            remove = true;
        }

        if (entity.constructor.ClassType === ClassType.AGENT) {
            if (Energy && Energy.isEmpty()) {
                remove = true;
                organic.mass = Mass.getValue();
                organic.decomposition = 100; // TODO is 100 appropriate? and not 70 or so?
            } else if (Rectum && Rectum.isFull()) {
                organic.mass = Rectum.getValue();
                organic.decomposition = 50;
                Rectum.empty();
            }
        }

        if (remove) {
            const removedEntity = entities.splice(index, 1).pop();
            Renderer.removeElement(removedEntity);
            // TODO add data to statistics
        }
        if (organic.mass > 0) {
            const resource = createResource(
                entity.position,
                new Bar({ id: "Mass", value: { min: 0, now: organic.mass, max: organic.mass } }),
                new Bar({ id: "Decomposition", value: { min: 0, now: organic.decomposition, max: organic.decomposition } }),
                new Decay()
            );
            Simulation.addEntity(resource);
            Renderer.addElement(resource);
        }
    });
};

const renderEntities = (entities) => entities.forEach((entity) => entity.render());


const updateCharts = (adjustedDeltaTime) => {
    // TODO consider speedFactor
    updateTotalNumbers(adjustedDeltaTime);
    updateTotalMasses(adjustedDeltaTime);
};

const updateInfoBox = () => {
    const { element } = Renderer.getObservedEntity();
    if (element) {
        updateOberverPanel(element.type, element.genes);
    }
};

let slowDownCounter = 0;
Renderer.loop((deltaTime) => {

    const { element } = Renderer.getObservedEntity();
    if (element) {
        updateOberverPanel(element.type, element.genes);
    }

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

        updateCharts(adjustedDeltaTime);
        updateInfoBox();

        renderEntities(resources);
        renderEntities(agents);

        slowDownCounter = 0;
    }

});
