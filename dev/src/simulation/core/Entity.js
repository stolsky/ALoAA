import Bar from "./Bar.js";
import createEnum from "../../utilities/Enum.js";

const Entity = class {

    static Type = createEnum("NONE", "RESOURCE", "AGENT");

    constructor({ x, y, type, mass }) {

        /** @type {Entity.Type} */
        this.type = (Entity.Type.has(type)) ? type : Entity.Type.NONE;

        this.position = (Number.isFinite(x) && Number.isFinite(y)) ? { x, y } : { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 }; // current speed & orientation

        // property pool for all abilities, bars and traits, identified by unique id
        this.props = {};

        if (mass instanceof Bar) {
            this.props.mass = mass;
        }

        this.target = null;
        this.threat = null;

        this.isHighlighted = false;
    }
};

export default Entity;
