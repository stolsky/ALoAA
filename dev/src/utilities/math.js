
/** Perofrms directed rounding to an integer, rounding half up.
 *
 * @param {number} value
 *
 * @returns the rounded result
 */
const round = (value) => Math.round(value);

// TODO TEST
const addLeadingZero = (value) => ((value < 10) ? "0" : "");

/** Constrains a value between a minimum and maximum value.
 *
 * Taken from the implementation of p5.js
 * {@link https://github.com/processing/p5.js/blob/00821f33ca1d8a6990364568f0374c4aaf713faa/src/math/calculation.js#L110}
 *
 * @param  {Number} value number to constrain
 * @param  {Number} low minimum limit
 * @param  {Number} high maximum limit
 *
 * @return {Number} constrained number
 */
const constrain = (value, low, high) => Math.max(Math.min(value, high), low);

// TODO TEST
const formatTime = (msec) => {
    const seconds = msec / 1000;
    const secondsString = `${addLeadingZero(seconds % 60)}${(seconds % 60).toFixed(2)}`;
    const minutes = seconds / 60;
    const minutesString = `${addLeadingZero(minutes % 60)}${Math.floor(minutes % 60)}`;
    const hours = minutes / 60;
    const hoursString = `${addLeadingZero(hours % 24)}${Math.floor(hours % 24)}`;
    return `${hoursString}:${minutesString}:${secondsString}`;
};

// research: https://www.desmos.com/calculator
// TODO TEST
// TODO get min pixel size and max pixel size from Configuration
const mapMassToPixel = (mass) => {
    if (mass === 0) {
        return 0;
    }
    let result = round(mass * 0.25 + 10); // round(Math.sqrt(mass) * 2 + 5);
    if (result > 30) {
        result = 30;
    }
    return result;
};

/** Re-maps a number from one range to another.
 *
 * Taken from the implementation of p5.js
 * {@link https://github.com/processing/p5.js/blob/v1.5.0/src/math/calculation.js#L406}
 *
 * @param  {Number} value  the incoming value to be converted
 * @param  {Number} start1 lower bound of the value's current range
 * @param  {Number} stop1  upper bound of the value's current range
 * @param  {Number} start2 lower bound of the value's target range
 * @param  {Number} stop2  upper bound of the value's target range
 *
 * @return {Number} remapped number
 */
const remap = (value, start1, stop1, start2, stop2) => {
    const mapped = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (start2 < stop2) {
        return constrain(mapped, start2, stop2);
    }
    return constrain(mapped, stop2, start2);
};

export {
    formatTime,
    mapMassToPixel,
    remap,
    round
};
