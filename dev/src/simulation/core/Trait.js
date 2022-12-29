import Value from "./Value.js";
import Behaviour from "./Behaviour.js";

const Trait = class extends Behaviour {

    static BASE_DEFAULT = 1;

    #value;

    #base;

    constructor({ id = "Trait", name, description, value = {} } = {}) {
        super({ id, type: Behaviour.Type.TRAIT, name, description });

        this.#value = new Value(value);

        Object.seal(this);
    }

    // TODO add getter and setter methods -> 4 values to modify/mutate: min, now, max, base

    getValue() {
        return this.#value.current;
    }

};

export default Trait;
