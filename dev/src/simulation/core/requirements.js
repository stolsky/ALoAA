import { ClassType } from "./Types.js";
import Bar from "./Bar.js";
import Trait from "./Trait.js";
import { isNotEmptyString } from "./utilities.js";

const createDefaultProperty = (key, requirement) => {
    const defaults = { id: key, value: requirement.default };
    const defaultProperty = {};
    if (requirement.classType === ClassType.BAR) {
        defaultProperty[`${key}`] = new Bar(defaults);
    } else if (requirement.classType === ClassType.TRAIT) {
        defaultProperty[`${key}`] = new Trait(defaults);
    }
    return defaultProperty;
};

const addProperties = (properties) => {
    const result = {};
    if (Array.isArray(properties)) {
        properties.forEach((property) => {
            if (ClassType.has(property.constructor.ClassType)) {
                const { id } = property;
                if (isNotEmptyString(id)) {
                    result[`${id}`] = property;
                }
            }
        });
    }
    return result;
};

/**
 *
 * @param {{}} properties
 * @param {{}} requirements
 * @param {boolean} onSelf defines which requirements should be validated, all (default) or only those with property "self"
 *
 * @returns {{}}
 */
const validateProperties = (properties, requirements, onSelf = false) => {
    let validated = { ...properties };
    Object.keys(requirements).forEach((key) => {
        /** @type {{ classType: Symbol, default?: { min?: number, now?: number, max?: number }, warn?: boolean }} */
        const requirement = requirements[`${key}`];
        if (!onSelf || (onSelf && Object.hasOwn(requirement, "self"))) {
            if (requirement && !Object.hasOwn(properties, key)) {
                if (ClassType.has(requirement.classType) && Object.hasOwn(requirement, "default")) {
                    validated = { ...validated, ...createDefaultProperty(key, requirement) };
                    if (Object.hasOwn(requirement, "warn")) {
                        console.warn(`Using default "${key}"!`);
                    }
                }
                console.error(`Requirement "${key}" is missing!`);
            }
        }
    });
    return validated;
};

export {
    addProperties,
    validateProperties
};
