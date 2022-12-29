import createEnum from "../../utilities/Enum.js";

/** A parent class for the different parts of behaviour like
 *  * actions that can be performed,
 *  * bars/counters to store the various states
 *  * and traits/modifiers/bounds which influence how the bars/counters are calculated/changed
 *
 * There are 4 properties to differentiate between those parts,
 *  * like id and type (logical)
 *  * as well as, name and description (informational)
 */
const Behaviour = class {

    static Type = createEnum("NONE", "BAR", "TRAIT", "ABILITY");

    /**
     *
     * @param {{ id: string, type: Behaviour.Type, name: string, description: string }} param0
     */
    constructor({ id, type, name, description } = {}) {

        if (typeof id === "string" && id.length > 0) {
            this.id = id;
        } else {
            throw new Error("Missing parameter. \"id\" is required");
        }

        this.type = (Behaviour.Type.has(type)) ? type : Behaviour.Type.NONE;

        this.name = (typeof name === "string" && name.length > 0) ? name : "";
        this.description = (typeof name === "string" && description.length > 0) ? description : "";

        Object.freeze(this);
    }

};

export default Behaviour;
