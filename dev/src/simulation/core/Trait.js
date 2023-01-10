import { ClassType } from "./Types.js";
import Value from "./Value.js";
import { addInformation } from "./utilities.js";

const Trait = class {

    static ClassType = ClassType.TRAIT;

    #value;

    constructor({ id = "Trait", name, description, value = {} } = {}) {
        addInformation(this, { id, name, description });
        this.#value = new Value(value);
        Object.freeze(this);
    }

    getValue() {
        return this.#value.current;
    }

    mutate() {
        return new Trait({
            id: this.id,
            name: this.name,
            description: this.description,
            value: this.#value.mutate()
        });
    }

};

export default Trait;
