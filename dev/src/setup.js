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
import Motion from "./simulation/abilities/Motion.js";
import Trait from "./simulation/core/Trait.js";
import Wander from "./simulation/abilities/Wander.js";

// disable right click context menu
document.addEventListener("contextmenu", (event) => {
    event.stopPropagation();
    event.preventDefault();
});

const world = Simulation.getWorldAttributes();
Renderer.createRenderer(getRendererContainer());

// TODO add to configuration
const maxNumberOfMaterial = 100;
const resourceStartMass = 100;
const resourceMargin = mapMassToPixel(resourceStartMass);
for (let i = 0; i < maxNumberOfMaterial; i = i + 1) {
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
    Simulation.addEntity(resource);
    Renderer.addElement(resource);
}

const maxNumberOfAgents = 50;
const agentsStartMass = 50;
const agentsMargin = mapMassToPixel(agentsStartMass);
for (let i = 0; i < maxNumberOfAgents; i = i + 1) {
    const agent = new Agent({
        // the bottom padding must be twice as large as the top padding because the shape's translation point is (0, 0).
        x: random(agentsMargin, world.width - 2 * agentsMargin),
        y: random(agentsMargin, world.height - 2 * agentsMargin),
        type: Entity.Type.AUTOTROPH,
        mass: new Bar({
            id: "mass",
            value: { min: 0, now: agentsStartMass, max: 100 }
        })
    });
    agent.addProperty(new Bar({ id: "Energy", value: { min: 0, now: 1000, max: 1000 } }));
    agent.addProperty(new Trait({ id: "Speed", value: { min: 0, now: 5, max: 10 } }));
    agent.addProperty(new Trait({ id: "Agility", value: { min: 0, now: 1, max: 1 } }));
    agent.addProperty(new Motion(agent));
    agent.addProperty(new Wander(agent));

    Simulation.addEntity(agent);
    Renderer.addElement(agent);
}

createTotalNumbersChart(getChartsPanel());

// TODO call initial render

// TODO call chart to display amount of resources (per type) and agents

// TODO mouse functionality
// research: https://pixijs.io/examples/#/demos-advanced/star-warp.js
