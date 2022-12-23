
/** Perofrms directed rounding to an integer, rounding half up.
 *
 * @param {number} value
 *
 * @returns the rounded result
 */
const round = (value) => Math.round(value);

const addLeadingZero = (value) => ((value < 10) ? "0" : "");

const formatTime = (msec) => {
    const seconds = msec / 1000;
    const secondsString = `${addLeadingZero(seconds % 60)}${(seconds % 60).toFixed(2)}`;
    const minutes = seconds / 60;
    const minutesString = `${addLeadingZero(minutes % 60)}${Math.floor(minutes % 60)}`;
    const hours = minutes / 60;
    const hoursString = `${addLeadingZero(hours % 24)}${Math.floor(hours % 24)}`;
    return `${hoursString}:${minutesString}:${secondsString}`;
};

export {
    formatTime,
    round
};
