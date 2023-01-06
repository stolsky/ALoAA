import createEnum from "../../utilities/Enum.js";
import { add, setMagnitude } from "../../pixi-adapter/math.js";

const Entity = class {

    static Type = createEnum("NONE", "ANORGANIC", "ORGANIC", "AUTOTROPH", "MIXOTROPH", "HETEROTROPH");

    /**
     * @param {{ x: number, y: number }} param0
     */
    constructor({ x, y }) {

        this.type = Entity.Type.NONE;

        this.position = (Number.isFinite(x) && Number.isFinite(y)) ? { x, y } : { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 }; // TODO check what this variable influences -> current speed AND orientation??

        // pool for all abilities, bars and traits, identified by unique id
        this.genes = {};

        this.target = null;
        this.threat = null;

        this.graphics = null;
        this.color = null;

        Object.seal(this);
    }

    // TODO refactor to utilities or math or ability?
    calculateDistanceFromCurrentPosition(length) {
        let distance = { ...this.velocity };
        distance = setMagnitude(distance, length);
        return add(distance, this.position);
    }

};

export default Entity;
