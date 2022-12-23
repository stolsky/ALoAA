import Value from "./Value.js";
import Behaviour from "./Behaviour.js";
import { round } from "../../utilities/math.js";

const Trait = class extends Behaviour {

    static BASE_DEFAULT = 1;

    #value;

    #base;

    constructor({ id = "Trait", name, description, value = {}, base } = {}) {
        super({ id, type: Behaviour.Type.TRAIT, name, description });

        this.#value = new Value(value);
        this.#base = (Number.isFinite(base)) ? base : Trait.BASE_DEFAULT;
    }

    // TODO add getter and setter methods -> 4 values to modify/mutate: min, now, max, base

    getValue() {
        return round(this.#value.current * this.#base);
    }

};

export default Trait;
