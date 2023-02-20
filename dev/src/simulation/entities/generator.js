import { mapMassToPixel, round } from "../../utilities/math.js";
import random from "../../utilities/random.js";

import Configuration from "../Configuration.js";

import { ClassType } from "../core/Types.js";
import Bar from "../core/Bar.js";
import Trait from "../core/Trait.js";
import Agent from "./Agent.js";
import Resource from "./Resource.js";

import Ingestion from "../abilities/Ingestion.js";
import Motion from "../abilities/Motion.js";
import SeekAndArrive from "../abilities/SeekAndArrive.js";
import Vision from "../abilities/Vision.js";
import Wander from "../abilities/Wander.js";
import Growth from "../abilities/Growth.js";
import Decay from "../abilities/Decay.js";
import Digestion from "../abilities/Digestion.js";

const { width, height } = Configuration.World;

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
        x = random(margin, width - 2 * margin);
    }
    if (!Number.isFinite(y) || y < 0) {
        // the bottom padding must be twice as large as the top padding because the shape's translation point is (0, 0).
        y = random(margin, height - 2 * margin);
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
    if (!useProperties) {
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

/** Merges to properties arrays.
 *
 * If a property already exists, it will replaced by the new one or else it will be added to the list of properties;
 *
 * @param {Array} oldProperties
 * @param {Array} newProperties
 *
 * @returns {Array}
 */
const mergeProperties = (oldProperties, newProperties = []) => {
    newProperties.forEach((property) => {
        const existingIndex = oldProperties.findIndex((existing) => existing.id === property.id);
        if (existingIndex !== -1) {
            oldProperties.splice(existingIndex, 1, property);
        } else {
            oldProperties.push(property);
        }
    });
    return oldProperties;
};

const { Min, Max } = Configuration.Values;

const agentsStartMass = Max.AgentMass / 2;
const agentsMargin = mapMassToPixel(agentsStartMass);
const createAgent = (position, properties) => {
    const entity = new Agent(adjustPosition(position, agentsMargin));
    entity.addProperties(...adjustProperties(entity, properties));
    return entity;
};

const resourceMargin = mapMassToPixel(Max.ResourceMass);
const createResource = (position, properties) => {
    const entity = new Resource(adjustPosition(position, resourceMargin));
    entity.addProperties(...adjustProperties(entity, properties));
    return entity;
};

const createDefaultResource = (position = {}, uniqueProperties = []) => {
    const defaultProperties = [
        new Bar({
            id: "Mass",
            name: "Mass",
            value: { min: Min.ResourceMass, now: Max.ResourceMass, max: Max.ResourceMass }
        }),
        new Bar({
            id: "Decomposition",
            name: "Decomposition",
            value: { min: Min.Decomposition, now: Min.Decomposition, max: Max.Decomposition }
        })
    ];

    return createResource(
        position,
        mergeProperties(defaultProperties, uniqueProperties)
    );
};

const createDefaultAgent = (position = {}, uniqueProperties = []) => {
    const defaultProperties = [
        new Bar({ id: "Mass", name: "Mass", value: { min: Min.AgentMass, now: agentsStartMass, max: Max.AgentMass } }),
        new Trait({ id: "Food", name: "Food", value: { min: Min.Food, now: Min.Food, max: Max.Food } }),

        new Bar({ id: "Energy", name: "Energy", value: { min: Min.Energy, now: Max.Energy, max: Max.Energy } }),

        new Trait({ id: "Speed", name: "Speed", value: { min: 0, now: 5, max: 10 } }),
        new Trait({ id: "Agility", name: "Agility", value: { min: 0, now: 1, max: 1 } }),
        new Motion(),

        new Wander(
            new Trait({ id: "WanderDistance", name: "Wander Distance", value: { min: 0, now: 75, max: 150 } }),
            new Trait({ id: "WanderWidth", name: "Wander Width", value: { min: 0, now: 50, max: 100 } })
        ),

        new Trait({ id: "VisionDistance", name: "Vision Distance", value: { min: 0, now: 150, max: 300 } }),
        new Trait({ id: "VisionWidth", name: "Vision Width", value: { min: 0, now: 100, max: 200 } }),
        new Vision(),

        new SeekAndArrive(),

        new Bar({ id: "Stomach", name: "Stomach", value: { min: 0, now: 0, max: 100 } }),
        new Ingestion(
            // const { foodPerTurn, energyConsumption } = modifier;
            // this.#foodPerTurn = (foodPerTurn instanceof Trait) ? foodPerTurn : 1;
        ),
        new Bar({ id: "Rectum", name: "Rectum", value: { min: 0, now: 0, max: 100 } }),
        new Digestion(),
        new Growth()
    ];

    return createAgent(
        position,
        mergeProperties(defaultProperties, uniqueProperties)
    );
};

/**
 * @param {Symbol} type
 *
 * @returns {Entity}
 */
const createEntity = (type) => {
    let entity = null;
    if (type === Configuration.Entities.Anorganic.symbol) {
        entity = createDefaultResource();
    } else if (type === Configuration.Entities.Organic.symbol) {
        entity = createDefaultResource({}, [
            new Bar({
                id: "Decomposition",
                name: "Decomposition",
                value: { min: Min.Decomposition, now: Max.Decomposition, max: Max.Decomposition }
            }),
            new Decay()
        ]);
    } else if (type === Configuration.Entities.Autotroph.symbol) {
        entity = createDefaultAgent();
    } else if (type === Configuration.Entities.Heterotroph.symbol) {
        entity = createDefaultAgent({}, [
            new Trait({ id: "Food", name: "Food", value: { min: Min.Food, now: Max.Food, max: Max.Food } })
        ]);
    } else if (type === Configuration.Entities.Mixotroph.symbol) {
        entity = createDefaultAgent({}, [
            new Trait({ id: "Food", name: "Food", value: { min: Min.Food, now: round(Max.Food / 2), max: Max.Food } })
        ]);
    }
    return entity;
};

export {
    createAgent,
    createDefaultAgent,
    createDefaultResource,
    createEntity,
    createResource
};
