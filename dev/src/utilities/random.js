import {
    xmur3,
    xoshiro128ss
} from "./prng.js";

let prng = null;

/** Checks if an instance of a pseudorandom number generator exists.
 *
 * @throws Error
 */
const checkPRNGInstance = () => {
    // TODO how to avoid instanceof here?
    if (!(prng instanceof Function)) {
        throw new Error("Random number generator not initiated");
    }
};

/** Implementation of the Box-Muller transform
 *
 * Takes two samples from the uniform distribution on the interval [0,1] and maps them to two standard, normally distributed samples.
 *
 * source: https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 * @returns {number[]} two standard, normally distributed samples
 */
const boxMullerTransform = () => {

    checkPRNGInstance();

    const u1 = prng();
    const u2 = prng();

    const magnitude = Math.sqrt(-2.0 * Math.log(u1));
    const O = 2.0 * Math.PI * u2;

    return [
        magnitude * Math.cos(O),
        magnitude * Math.sin(O)
    ];
};

let samples = [];
/** Wrapper of the `boxMullerTransform()` for generating normal distributed pseudorandom numbers.
 *
 * @param {number} m the mean (default = 0)
 * @param {number} sd the standard deviation (default = 1)
 *
 * @returns {number} random number
 */
const gauss = (m, sd) => {
    if (samples.length === 0) {
        samples = boxMullerTransform();
    }
    return (m || 0) + samples.pop() * (sd || 1);
};

/** Generates a random number from an internal random number generator.
 *
 * It is possible to use "from" and "to" to specify an interval in which the number should be located.
 *
 * @param {number} from
 * @param {number} to
 * @returns {number}
 */
const random = (from = null, to = null) => {
    checkPRNGInstance();
    const next = prng();
    if (Number.isFinite(from) && Number.isFinite(to)) {
        return from + next * (to - from);
    }
    return next;
};

/** Creates a new random number generator with the given seed.
 *
 * If "seed" is omitted a random number from `Math.random()` is used as string.
 *
 * @param {string} seed
 */
const setSeed = (seed = "") => {
    let useSeed = `${seed}`;
    if (useSeed.length === 0) {
        useSeed = `${Math.random()}`;
    }
    const hash = xmur3(useSeed);
    prng = xoshiro128ss(hash(), hash(), hash(), hash());
};

// initialization so `random()` and `gauss()` can be used right from the start
setSeed();

export default random;
export {
    gauss,
    setSeed
};
