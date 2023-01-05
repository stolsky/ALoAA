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
    constructor(parent, id, name, description) {
        this.parent = (ClassType.has(parent?.constructor?.ClassType)) ? parent : null;
        // TODO method necessary?? improve
        addInformation(this, { id, name, description });
    }

};

export default Ability;
