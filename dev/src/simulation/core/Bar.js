import Value from "./Value.js";
import Behaviour from "./Behaviour.js";
import { round } from "../../utilities/math.js";

const Bar = class extends Behaviour {

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
        super({ id, type: Behaviour.Type.BAR, name, description });

        this.#value = new Value(value);
        this.#rate = new Value(rate || { min: 0, now: Bar.RATE_DEFAULT, max: Bar.RATE_DEFAULT });
    }

    /**
     * Before setting the value, method {@link round} is used to avoid floating point inaccuracies.
     *
     * @param {number} newValue
     */
    increase(newValue) {
        if (Number.isFinite(newValue)) {
            this.#value.current = round(this.#value.current + newValue * this.#rate.current);
        }
    }

    /**
     * TODO add explanation for rate.max - rate.now as modifier
     *
     * Before setting the value, method {@link round} is used to avoid floating point inaccuracies.
     *
     * @param {number} newValue
     */
    decrease(newValue) {
        if (Number.isFinite(newValue)) {
            let modifier = this.#rate.maximum - this.#rate.current;
            if (modifier === 0) {
                modifier = Bar.RATE_DEFAULT;
            }
            console.log(newValue, this.#value.current, modifier);
            this.#value.current = round(this.#value.current - newValue * modifier);
        }
    }

    // TODO mutate value and rate

    // getRate() {
    //     return this.#rate.current;
    // }

    getValue() {
        return this.#value.current;
    }

};

export default Bar;
