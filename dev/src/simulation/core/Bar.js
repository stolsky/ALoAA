import { ClassType } from "./Types.js";
import Value from "./Value.js";
import { addInformation } from "./utilities.js";
import { round } from "../../utilities/math.js";

const Bar = class {

    static ClassType = ClassType.BAR;

    static RATE_DEFAULT = 1;

    #value;

    #rate;

    /** Creates a counter of some kind with a maximum and minimum bound.
     *
     * Only the "id" is required. All other parameters can be omitted and will be set with default values.
     *
     * Note: If the rate is higher, increase is higher and decrease is slower, otherwise vice versa.
     *
     * @param {{ id: string, name?: string, description?: string, value?: { min?: number, now?: number, max?: number }, rate?: { min?: number, now?: number, max?: number }}} param0
     */

    constructor({ id = "Bar", name, description, value, rate } = {}) {
        addInformation(this, { id, name, description });
        this.#value = new Value(value);
        this.#rate = new Value(rate || { min: 0, now: Bar.RATE_DEFAULT, max: Bar.RATE_DEFAULT });
        Object.freeze(this);
    }

    /** Increases the value by the passed amount in relation to the Bar's rate.
     *
     * Before setting the value, method {@link round} is used to avoid floating point inaccuracies.
     *
     * @param {number} amount
     */
    increase(amount) {
        if (Number.isFinite(amount)) {
            this.#value.current = round(this.#value.current + amount * this.#rate.current);
        }
    }

    /** Decreases the value by the passed amount in relation to the Bar's rate.
     *
     * Before setting the value, method {@link round} is used to avoid floating point inaccuracies.
     *
     * @param {number} amount
     */
    decrease(amount) {
        if (Number.isFinite(amount)) {
            let modifier = this.#rate.maximum - this.#rate.current;
            if (modifier === 0) {
                modifier = Bar.RATE_DEFAULT;
            }
            this.#value.current = round(this.#value.current - amount * modifier);
        }
    }

    getValue() {
        return this.#value.current;
    }

    isEmpty() {
        return this.#value.current === this.#value.minimum;
    }

    isFull() {
        return this.#value.current === this.#value.maximum;
    }

};

export default Bar;
