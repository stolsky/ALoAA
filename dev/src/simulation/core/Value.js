import { round } from "../../utilities/math.js";
import { gauss } from "../../utilities/random.js";

/** A storage class for a number as the current value.
 *
 * A minimum and a maximum can also be defined.
 * This interval specifies the upper and lower bound in which the current value must be.
 *
 * If the parameters "min" and "max" are omitted, they are set to the corresponding minimum and maximum values of the class (see static variables).
 *
 */
const Value = class {

    // due to JavaScript floating point arithmitic problems all numbers will be integers
    // @see https://floating-point-gui.de/formats/exact/

    static MIN = 0;

    static MAX = 100_000;

    #min;

    #max;

    #now;

    #checkNowAgainstMin = () => {
        if (this.#now < this.#min) {
            this.#now = this.#min;
        }
    };

    #checkNowAgainstMax = () => {
        if (this.#now > this.#max) {
            this.#now = this.#max;
        }
    };

    /**
     *
     * @param {{ min: number, now: number, max: number }} param0
     */
    constructor({ min, now, max } = {}) {
        this.#min = Value.MIN;
        this.#now = Value.MAX;
        this.#max = Value.MAX;

        Object.seal(this);

        this.minimum = min;
        this.maximum = max;
        this.current = now;
    }

    /** Returns the current value of the storage object.
     *
     * @returns { number }
     */
    get current() {
        return this.#now;
    }

    /** Sets the new current value if it is between the minimum and maximum of the instance.
     *
     * @param {number} now
     */
    set current(now) {
        if (Number.isFinite(now)) {
            this.#now = round(now);
            this.#checkNowAgainstMax();
            this.#checkNowAgainstMin();
        }
    }

    /** Returns the maximum allowed value.
     *
     * @returns { number }
     */
    get maximum() {
        return this.#max;
    }

    /** Sets the new maximum if the new maximum is greater than the minimum.
     *
     * If the current (now) value is greater than the new maximum value, the current value is set to this new maximum value.
     *
     * @param {number} max
     */
    set maximum(max) {
        if (Number.isFinite(max) && max > this.#min && max <= Value.MAX) {
            this.#max = round(max);
            this.#checkNowAgainstMax();
        }
    }

    /** Returns the minimum allowed value.
     *
     * @returns { number }
     */
    get minimum() {
        return this.#min;
    }

    /** Sets the new minimum if the new minimum is lower than the maximum.
     *
     * If the current (now) value is lower than the new minimum value, the current value is set to this new minimum value.
     *
     * @param {number} min
     */
    set minimum(min) {
        if (Number.isFinite(min) && min < this.#max && min >= Value.MIN) {
            this.#min = round(min);
            this.#checkNowAgainstMin();
        }
    }

    /**
     *
     * @param {number} sd standard deviation
     *
     * @returns {Value}
     */
    mutate(sd = 1) {
        const mean = (this.#max - this.#min) / 2;
        const mutatedValue = gauss(mean, sd);
        // console.log(mean, mutatedValue);
        return {
            min: this.#min,
            now: this.#now + mean - mutatedValue,
            max: this.#max
        };
    }
};

export default Value;
