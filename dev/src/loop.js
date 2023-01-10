import Simulation from "./simulation/Simulation.js";

import * as Renderer from "./pixi-adapter/renderer.js";
import updateTotalNumbers from "./gui/charts/totalNumbers.js";
import updateTotalMasses from "./gui/charts/totalMasses.js";
import { update as updateObserverPanel } from "./gui/components/ObserverPanel.js";
import { updateOutputTimePassed } from "./gui/components/simulation.js";

import Bar from "./simulation/core/Bar.js";
import { ClassType } from "./simulation/core/Types.js";
import Decay from "./simulation/abilities/Decay.js";
import * as Generator from "./simulation/entities/generator.js";
import Configuration from "./simulation/Configuration.js";
import random from "./utilities/random.js";

const adjustTimeToSpeedFactor = (deltaTime) => {
    const adjustedDeltaTime = Simulation.speedFactor * deltaTime;
    Simulation.timePassed = Simulation.timePassed + adjustedDeltaTime;
    updateOutputTimePassed(Simulation.timePassed);
    return adjustedDeltaTime;
};

const { Min, Max } = Configuration.Values;

const createAgent = ({ genes = [], mass = 0, position = {} }) => {
    // add mass property to mutated genes => newProperties
    genes.push(new Bar({
        id: "Mass",
        name: "Mass",
        value: {
            min: Min.AgentMass,
            now: mass,
            max: Max.AgentMass
        }
    }));
    return Generator.createDefaultAgent(
        position,
        genes
    );
};

const createResource = (material) => {
    const { mass, decomposition, position } = material;
    const resource = Generator.createDefaultResource(
        position,
        [
            // TODO add helper methods to avoid setting trivial data like name, min, description -> DefaultBar(id, now, max)
            new Bar({
                id: "Mass",
                name: "Mass",
                value: { min: Min.Mass, now: mass, max: mass }
            }),
            new Bar({
                id: "Decomposition",
                name: "Decomposition",
                value: { min: Min.Decomposition, now: decomposition, max: decomposition }
            }),
            new Decay()
        ]
    );
    return resource;
};

const cellDivision = (entity) => {
    const amountOffspring = 2;
    const offspring = [];
    for (let i = 0; i < amountOffspring; i = i + 1) {
        offspring.push(createAgent({
            genes: (random() * 100 < Configuration.mutationRate) ? entity.mutate() : [],
            mass: entity.genes.Mass.getValue() / amountOffspring,
            position: entity.position
        }));
    }
    return offspring;
};

const defecate = (rectum, position) => {
    const resource = {};
    resource.mass = rectum.getValue();
    resource.decomposition = Max.Decomposition / 2;
    resource.position = { x: position.x, y: position.y };
    rectum.empty();
    return resource;
};

const dying = (mass, position) => ({
    mass: mass.getValue(),
    decomposition: Max.Decomposition,
    position: { ...position }
});

// TODO refactor
/**
 * @param {Array<Entity>} entities
 */
const updateEntities = (entities) => {
    const addToSimulation = [];
    const removeFromSimulation = [];
    entities.forEach((entity, index) => {
        entity.update();
        const { Energy, Mass, Rectum } = entity.genes;

        let isEntityToBeRmoved = false;
        let resource = null;

        // mass is required
        if (Mass.isEmpty()) {
            isEntityToBeRmoved = true;
        }

        // TODO make this editable -> in configuration add/remove these events -> use array to store all events and cycle through them
        if (entity.constructor.ClassType === ClassType.AGENT) {
            if (Energy && Energy.isEmpty()) {
                resource = dying(Mass, entity.position);
                isEntityToBeRmoved = true;
            } else if (Rectum && Rectum.isFull()) {
                resource = defecate(Rectum, entity.position);
            } else if (Mass.isFull()) {
                cellDivision(entity).forEach((offspring) => addToSimulation.push(offspring));
                isEntityToBeRmoved = true;
            }
        }

        if (resource) {
            addToSimulation.push(createResource(resource));
        }

        if (isEntityToBeRmoved) {
            removeFromSimulation.push({ index, entity });
        }

    });

    addToSimulation.forEach((entity) => {
        Simulation.addEntity(entity);
        Renderer.addElement(entity);
    });
    removeFromSimulation.forEach((entity) => {
        entities.splice(entity.index, 1).pop();
        Renderer.removeElement(entity.entity);
        // TODO add data to statistics
    });
};

const renderEntities = (entities) => entities.forEach((entity) => entity.render());

// TODO improve performance if hidden?
const updatePanels = (adjustedDeltaTime) => {

    // TODO consider speedFactor
    updateTotalNumbers(adjustedDeltaTime);
    updateTotalMasses(adjustedDeltaTime);

    const { element } = Renderer.getObservedEntity();
    if (element) {
        updateObserverPanel(element.genes);
    }
};

const startSimulation = () => {
    let slowDownCounter = 0;
    Renderer.loop((deltaTime) => {
        const speed = Simulation.speedFactor;
        if (speed < 1 && slowDownCounter < 1 / speed) {
            slowDownCounter = slowDownCounter + 1;
        } else {
            const adjustedDeltaTime = adjustTimeToSpeedFactor(deltaTime);

            const resources = Simulation.getResources();
            const agents = Simulation.getAgents();

            for (let i = 0; i < Simulation.speedFactor; i = i + 1) {
                updateEntities(resources);
                updateEntities(agents);
            }

            renderEntities(resources);
            renderEntities(agents);

            updatePanels(adjustedDeltaTime);

            slowDownCounter = 0;
        }
    });
};

export default startSimulation;
