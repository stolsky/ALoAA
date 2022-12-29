/* globals PIXI */

// import * as PIXI from "pixi.js";
// import "@pixi/math-extras";

/**
 *
 * @param {{ x: number, y: number }} point1
 * @param {{ x: number, y: number }} point2
 *
 * @returns {{ x: number, y: number }}
 */
const add = (point1, point2) => {
    const pixiPoint1 = new PIXI.Point(point1.x, point1.y);
    const pixiPoint2 = new PIXI.Point(point2.x, point2.y);
    const { x, y } = pixiPoint1.add(pixiPoint2);
    return { x, y };
};

/** Calculates the angle of rotation for this point.
 *
 * @param {{ x: number, y: number }} point
 *
 * @returns {number} the angle of rotation
 */
const heading = (point) => Math.atan2(point.y, point.x);

/**
 *
 * @param {{ x: number, y: number }} point
 * @param {number} scalar
 *
 * @returns {{ x: number, y: number }}
 */
const multiplyScalar = (point, scalar) => {
    const pixiPoint = new PIXI.Point(point.x, point.y);
    const { x, y } = pixiPoint.multiplyScalar(scalar);
    return { x, y };
};

/**
 *
 * @param {{ x: number, y: number }} point
 *
 * @returns {{ x: number, y: number }}
 */
const normalize = (point) => {
    if (point.x === 0 && point.y === 0) {
        return { x: 0, y: 0 };
    }
    const pixiPoint = new PIXI.Point(point.x, point.y);
    const { x, y } = pixiPoint.normalize();
    return { x, y };
};

/**
 *
 * @param {{ x: number, y: number }} point
 * @param {number} maximum
 *
 * @returns {{ x: number, y: number }}
 */
const limit = (point, maximum) => {
    let pixiPoint = new PIXI.Point(point.x, point.y);
    const magnitudeSquared = pixiPoint.magnitudeSquared();
    if (magnitudeSquared > maximum * maximum) {
        pixiPoint = pixiPoint.multiplyScalar(1 / Math.sqrt(magnitudeSquared)) // normalize it
            .multiplyScalar(maximum);
    }
    const { x, y } = pixiPoint;
    return { x, y };
};

/**
 *
 * @param {{ x: number, y: number }} point
 * @param {number} length
 *
 * @returns {{ x: number, y: number }}
 */
const setMagnitude = (point, length) => {
    if (point.x === 0 && point.y === 0) {
        return { x: 0, y: 0 };
    }
    const pixiPoint = new PIXI.Point(point.x, point.y);
    const { x, y } = pixiPoint.normalize().multiplyScalar(length);
    return { x, y };
};

/**
 *
 * @param {{ x: number, y: number}} point1
 * @param {{ x: number, y: number}} point2
 *
 * @returns {{ x: number, y: number}}
 */
const substract = (point1, point2) => {
    const pixiPoint = new PIXI.Point(point1.x, point1.y);
    const { x, y } = pixiPoint.subtract(new PIXI.Point(point2.x, point2.y));
    return { x, y };
};

export {
    add,
    heading,
    limit,
    multiplyScalar,
    normalize,
    setMagnitude,
    substract
};
