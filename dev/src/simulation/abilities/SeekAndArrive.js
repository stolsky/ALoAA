import { ClassType } from "../core/Types.js";
import { limit, magnitude, setMagnitude, substract } from "../../pixi-adapter/math.js";
import { remap } from "../../utilities/math.js";
import Ability from "../core/Ability.js";

const SeekAndArrive = class extends Ability {

    static Requirements = Object.freeze({
        Vision: { classType: ClassType.ABILITY },
        Motion: { classType: ClassType.ABILITY }
    });

    constructor() {
        super("SeekAndArrive");
    }

    /**
     * @param {Entity} target
     *
     * @returns {{ x: number, y: number }}
     */
    use(target) {
        const speed = this.parent.genes.Speed.getValue();
        const agility = this.parent.genes.Agility.getValue();
        const viewWidth = this.parent.genes.VisionWidth.getValue();

        let force = substract(target.position, this.parent.position) || { x: 0, y: 0 };

        // arrival behaviour
        const distance = magnitude(force);
        let desiredSpeed = speed;
        if (distance < viewWidth) {
            desiredSpeed = remap(distance, 0, viewWidth, 0, speed);
        }

        force = setMagnitude(force, desiredSpeed);
        force = substract(force, this.parent.velocity);
        return limit(force, agility);
    }
};

export default SeekAndArrive;
