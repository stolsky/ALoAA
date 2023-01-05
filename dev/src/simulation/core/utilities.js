import { magnitude, substract } from "../../pixi-adapter/math.js";
import { ClassType } from "./Types.js";

/**
 *
 * @param {{ x: number, y: number }} point1
 * @param {{ x: number, y: number }} point2
 *
 * @returns {boolean}
 */
const checkDistanceIsZero = (point1, point2) => Math.floor(magnitude(substract(point1, point2))) === 0;

/**
 *
 * @param {string} str the string to test
 *
 * @returns {boolean}
 */
const isNotEmptyString = (str) => typeof str === "string" && str.length > 0;

/**
 *
 * @param {Object} target
 *
 * @param {{ id: string, name: string, description: string }} information
 */
const addInformation = (target, information = {}) => {
    if (ClassType.has(target.constructor.ClassType)) {
        const { id, name, description } = information;
        target.id = (isNotEmptyString(id)) ? id : "";
        target.name = (isNotEmptyString(name)) ? name : "";
        target.description = (isNotEmptyString(description)) ? description : "";
    }
};

const mutate = (target) => {
    const classType = target.constructor.Type;
    if (ClassType.has(classType)) {
        // TODO
    }
};

export {
    addInformation,
    checkDistanceIsZero,
    isNotEmptyString,
    mutate
};
