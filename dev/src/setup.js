import Simulation from "./simulation/Simulation.js";

import * as Renderer from "./pixi-adapter/renderer.js";
import { getChartsPanel, getRendererContainer } from "./gui/components.js";
import { create as createTotalNumbersChart } from "./gui/charts/totalNumbers.js";

import { mapMassToPixel } from "./utilities/math.js";
import random from "./utilities/random.js";

import Resource from "./simulation/core/Resource.js";
import Entity from "./simulation/core/Entity.js";
import Agent from "./simulation/core/Agent.js";
import Bar from "./simulation/core/Bar.js";
import Trait from "./simulation/core/Trait.js";
import Motion from "./simulation/abilities/Motion.js";
import Wander from "./simulation/abilities/Wander.js";
import Vision from "./simulation/abilities/Vision.js";
import SeekAndArrive from "./simulation/abilities/SeekAndArrive.js";

// disable right click context menu
document.addEventListener("contextmenu", (event) => {
    event.stopPropagation();
    event.preventDefault();
});

const world = Simulation.getWorldAttributes();
Renderer.createRenderer(getRendererContainer());

const agentsStartMass = 50;
const agentsMargin = mapMassToPixel(agentsStartMass);
const createDefaultAgent = () => {
    const agent = new Agent({
        // the bottom padding must be twice as large as the top padding because the shape's translation point is (0, 0).
        x: random(agentsMargin, world.width - 2 * agentsMargin),
        y: random(agentsMargin, world.height - 2 * agentsMargin),
        food: new Trait({
            id: "FoodSource",
            value: { min: 0, now: 0, max: 100 }
        }),
        mass: new Bar({
            id: "mass",
            value: { min: 0, now: agentsStartMass, max: 100 }
        })
    });

    // TODO test values
    // TODO add as default create method to another module

    agent.addProperty(new Bar({ id: "Energy", value: { min: 0, now: 1000, max: 1000 } }));
    agent.addProperty(new Trait({ id: "Speed", value: { min: 0, now: 5, max: 10 } }));
    agent.addProperty(new Trait({ id: "Agility", value: { min: 0, now: 1, max: 1 } }));
    agent.addProperty(new Motion(agent));

    agent.addProperty(new Trait({ id: "WanderDistance", value: { min: 0, now: 75, max: 150 } }));
    agent.addProperty(new Trait({ id: "WanderWidth", value: { min: 0, now: 50, max: 100 } }));
    agent.addProperty(new Wander(agent));

    agent.addProperty(new Trait({ id: "VisionDistance", value: { min: 0, now: 150, max: 300 } }));
    agent.addProperty(new Trait({ id: "VisionWidth", value: { min: 0, now: 100, max: 200 } }));
    agent.addProperty(new Vision(agent));

    agent.addProperty(new SeekAndArrive(agent));

    return agent;
};

const resourceStartMass = 100;
const resourceMargin = mapMassToPixel(resourceStartMass);
const createDefaultResource = () => {
    const resource = new Resource({
        // the right padding must be twice as large as the left padding because the shape's translation point is (0, 0).
        x: random(resourceMargin, world.width - 2 * resourceMargin),
        y: random(resourceMargin, world.height - 2 * resourceMargin),
        type: Entity.Type.ANORGANIC,
        mass: new Bar({
            id: "mass",
            value: { min: 0, now: resourceStartMass, max: 100 }
        })
    });

    return resource;
};

// TODO add to configuration
const maxNumberOfMaterial = 100;
for (let i = 0; i < maxNumberOfMaterial; i = i + 1) {
    const resource = createDefaultResource();
    Simulation.addEntity(resource);
    Renderer.addElement(resource);
}

const maxNumberOfAgents = 50;
for (let i = 0; i < maxNumberOfAgents; i = i + 1) {
    const agent = createDefaultAgent();
    Simulation.addEntity(agent);
    Renderer.addElement(agent);
}

createTotalNumbersChart(getChartsPanel());

// TODO call initial render
