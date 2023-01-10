import { ClassType } from "./Types.js";
import { addInformation } from "./utilities.js";

const Ability = class {

    static ClassType = ClassType.ABILITY;

    /**
     * @param {Entity} parent
     * @param {string} id
     * @param {string} name
     * @param {string} description
     */
    constructor(id, name, description) {
        // TODO method necessary?? improve
        addInformation(this, { id, name, description });
    }

    setParent(parent) {
        this.parent = (ClassType.has(parent?.constructor?.ClassType)) ? parent : null;
        // Object.freeze(this);
    }

};

export default Ability;
