import { mapMassToPixel } from "../../utilities/math.js";
import random from "../../utilities/random.js";

import Simulation from "../Simulation.js";

import Bar from "../core/Bar.js";
import Trait from "../core/Trait.js";

import Ingestion from "../abilities/Ingestion.js";
import Motion from "../abilities/Motion.js";
import SeekAndArrive from "../abilities/SeekAndArrive.js";
import Vision from "../abilities/Vision.js";
import Wander from "../abilities/Wander.js";


import Agent from "./Agent.js";
import Resource from "./Resource.js";
import { ClassType } from "../core/Types.js";
import Digestion from "../abilities/Digestion.js";

const world = Simulation.getWorldAttributes();

/**
 *
 * @param {{ x: number, y: number }} position
 * @param {number} margin
 *
 * @returns {{ x: number, y: number }} validated and if it was necessary corrected position
 */
const adjustPosition = (position = {}, margin = 0) => {
    let { x, y } = position;
    if (!Number.isFinite(x) || x < 0) {
        // the right margin must be twice as large as the left margin because the shape's translation point is (0, 0).
        x = random(margin, world.width - 2 * margin);
    }
    if (!Number.isFinite(y) || y < 0) {
        // the bottom padding must be twice as large as the top padding because the shape's translation point is (0, 0).
        y = random(margin, world.height - 2 * margin);
    }
    return { x, y };
};

/**
 * @param {Array<Bar|Trait|Ability>} properties
 * @param {Array<Bar|Trait|Ability>} defaults
 *
 * @returns {Array<Bar|Trait|Ability>}
 */
const adjustProperties = (parent, properties, defaults) => {
    let useProperties = properties;
    if (useProperties.length === 0) {
        useProperties = defaults;
    }
    // TODO improve checks
    useProperties.forEach((property) => {
        if (property.constructor.ClassType === ClassType.ABILITY) {
            property.setParent(parent);
        }
    });
    return useProperties;
};

const agentsDefaultMaxMass = 100;
const agentsMargin = mapMassToPixel(agentsDefaultMaxMass / 2);
const createAgent = (position, ...properties) => {
    const entity = new Agent(adjustPosition(position, agentsMargin));
    entity.addProperties(...adjustProperties(
        entity,
        properties,
        [
            new Bar({ id: "Mass", value: { min: 0, now: agentsDefaultMaxMass / 2, max: agentsDefaultMaxMass } }),
            new Trait({ id: "Food", value: { min: 0, now: 0, max: 100 } }),

            new Bar({ id: "Energy", value: { min: 0, now: 1000, max: 1000 } }),

            new Trait({ id: "Speed", value: { min: 0, now: 5, max: 10 } }),
            new Trait({ id: "Agility", value: { min: 0, now: 1, max: 1 } }),
            new Motion(),

            new Wander(
                new Trait({ id: "WanderDistance", value: { min: 0, now: 75, max: 150 } }),
                new Trait({ id: "WanderWidth", value: { min: 0, now: 50, max: 100 } })
            ),

            new Trait({ id: "VisionDistance", value: { min: 0, now: 150, max: 300 } }),
            new Trait({ id: "VisionWidth", value: { min: 0, now: 100, max: 200 } }),
            new Vision(),

            new SeekAndArrive(),

            new Bar({ id: "Stomach", value: { min: 0, now: 0, max: 100 } }),
            new Ingestion(
                // const { foodPerTurn, energyConsumption } = modifier;
                // this.#foodPerTurn = (foodPerTurn instanceof Trait) ? foodPerTurn : 1;
            ),
            new Bar({ id: "Rectum", value: { min: 0, now: 0, max: 100 } }),
            new Digestion()
            // new Growth()
        ]
    ));
    return entity;
};

// TODO get from Configuration/Simulation
const resourceDefaultMass = 100;

const resourceMargin = mapMassToPixel(resourceDefaultMass);

const createResource = (position, ...properties) => {
    const entity = new Resource(adjustPosition(position, resourceMargin));
    entity.addProperties(...adjustProperties(
        entity,
        properties,
        [
            new Bar({ id: "Mass", value: { min: 0, now: resourceDefaultMass, max: 100 } }),
            new Bar({ id: "Decomposition", value: { min: 0, now: 0, max: 100 } })
        ]
    ));
    return entity;
};

export {
    createAgent,
    createResource
};
