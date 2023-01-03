import Entity from "../core/Entity.js";
import Behaviour from "../core/Behaviour.js";
import { limit, magnitude, setMagnitude, substract } from "../../pixi-adapter/math.js";
import { remap } from "../../utilities/math.js";

const SeekAndArrive = class extends Behaviour {

    static id = "SeekAndArrive";

    static type = Behaviour.Type.ABILITY;

    static Requirements = Object.freeze({
        Vision: { type: Behaviour.Type.ABILITY },
        Motion: { type: Behaviour.Type.ABILITY }
    });

    #parent;

    constructor(parent) {
        super({ id: SeekAndArrive.id, type: SeekAndArrive.type });
        this.#parent = (parent instanceof Entity) ? parent : null;
    }

    /**
     * @param {Entity} target
     *
     * @returns {{ x: number, y: number }}
     */
    execute(target) {
        const speed = this.#parent.genes.Speed.getValue();
        const agility = this.#parent.genes.Agility.getValue();
        const viewWidth = this.#parent.genes.VisionWidth.getValue();

        let force = substract(target.position, this.#parent.position) || { x: 0, y: 0 };

        // arrival behaviour
        const distance = magnitude(force);
        let desiredSpeed = speed;
        if (distance < viewWidth) {
            desiredSpeed = remap(distance, 0, viewWidth, 0, speed);
        }

        force = setMagnitude(force, desiredSpeed);
        force = substract(force, this.#parent.velocity);
        return limit(force, agility);
    }
};

export default SeekAndArrive;
