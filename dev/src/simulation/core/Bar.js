import Value from "./Value.js";
import Behaviour from "./Behaviour.js";

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

        Object.seal(this);
    }

    increase() {
        this.#value.current = this.#value.current + this.#rate.current;
    }

    /**
     * TODO add explanation for rate.max - rate.now as modifier
     *
     * Before setting the value, method {@link round} is used to avoid floating point inaccuracies.
     *
     * @param {number} newValue
     */
    decrease() {
        this.#value.current = this.#value.current - this.#rate.current;
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
