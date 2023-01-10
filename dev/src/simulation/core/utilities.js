import { magnitude, substract } from "../../pixi-adapter/math.js";
import { hexToRGB } from "../../pixi-adapter/utils.js";
import Configuration from "../Configuration.js";
import Entity from "./Entity.js";
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
        // TODO create new object store "info = { id, name, description }"
        target.id = (isNotEmptyString(id)) ? id : "";
        target.name = (isNotEmptyString(name)) ? name : "";
        target.description = (isNotEmptyString(description)) ? description : "";
    }
};

const getColorFromType = (type, toRGBString = false) => {
    let color = 0xCCCCCC;
    // TODO improve by using loop from availablle entities
    if (type === Entity.Type.ANORGANIC) {
        color = Configuration.Entities.Anorganic.color;
    } else if (type === Entity.Type.ORGANIC) {
        color = Configuration.Entities.Organic.color;
    } else if (type === Entity.Type.AUTOTROPH) {
        color = Configuration.Entities.Autotroph.color;
    } else if (type === Entity.Type.HETEROTROPH) {
        color = Configuration.Entities.Heterotroph.color;
    } else if (type === Entity.Type.MIXOTROPH) {
        color = Configuration.Entities.Mixotroph.color;
    }
    if (toRGBString) {
        color = hexToRGB(color);
    }
    return color;
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
    getColorFromType,
    isNotEmptyString,
    mutate
};
