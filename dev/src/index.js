import { getRendererContainer, updateOutputTimePassed } from "./gui/components.js";
import * as Renderer from "./pixi-adapter/renderer.js";
import Resource from "./simulation/core/Resource.js";
import Value from "./simulation/core/Value.js";
import Simulation from "./simulation/simulation.js";
import { random } from "./utilities/random.js";

// https://jsdoc.app/

const world = Simulation.getWorldAttributes();
Renderer.createRenderer(getRendererContainer());

const maxNumberOfMaterial = 100;
// TODO calculate presentational size from mass: for start use: sqrt(x) * 4
// research: https://www.desmos.com/calculator
const resourceStartMass = 20;
for (let i = 0; i < maxNumberOfMaterial; i = i + 1) {
    const resource = new Resource({
        x: random(resourceStartMass, world.width - resourceStartMass),
        y: random(resourceStartMass, world.height - resourceStartMass),
        type: Resource.Type.ANORGANIC,
        mass: new Value({ min: 0, now: resourceStartMass, max: 100 })
    });
    Simulation.addResource(resource);
    Renderer.addElement(resource);
}

// TODO add agents

// TODO call initial render

// TODO call chart to display amount of resources (per type) and agents

// TODO mouse functionality
// research: https://pixijs.io/examples/#/demos-advanced/star-warp.js

// TODO add movement
// research: https://pixijs.io/examples/#/demos-advanced/collision-detection.js

const updateTimer = (deltaTime) => {
    let time = Simulation.timePassed;
    time = time + Simulation.speedFactor * deltaTime;
    Simulation.timePassed = time;
    updateOutputTimePassed(time);
};

const updateResources = (deltaTime) => {

};

Renderer.loop((deltaTime) => {

    updateTimer(deltaTime);

    updateResources(deltaTime);

});
