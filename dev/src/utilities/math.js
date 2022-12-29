
/** Perofrms directed rounding to an integer, rounding half up.
 *
 * @param {number} value
 *
 * @returns the rounded result
 */
const round = (value) => Math.round(value);

// TODO TEST
const addLeadingZero = (value) => ((value < 10) ? "0" : "");

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

export {
    formatTime,
    mapMassToPixel,
    round
};
