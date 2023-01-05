import { ClassType } from "../core/Types.js";
import { createProperties, validateProperties } from "../core/requirements.js";
import random from "../../utilities/random.js";
import {
    add,
    heading,
    setMagnitude,
    substract
} from "../../pixi-adapter/math.js";
import Ability from "../core/Ability.js";

const Wander = class extends Ability {

    static Requirements = Object.freeze({
        Motion: { classType: ClassType.ABILITY },
        WanderDistance: { classType: ClassType.TRAIT, self: true, default: { min: 0, now: 75, max: 150 } },
        WanderWidth: { classType: ClassType.TRAIT, self: true, default: { min: 0, now: 50, max: 100 } }
    });

    #modifiers;

    #theta = Math.PI * 0.5;

    constructor(parent, ...modifiers) {
        super(parent, "Wander");
        this.#modifiers = validateProperties(
            createProperties(modifiers),
            Wander.Requirements,
            true
        );
        Object.freeze(this);
    }

    use() {
        const agility = this.parent.genes.Agility.getValue();

        let distance = this.parent.calculateDistanceFromCurrentPosition(this.#modifiers.WanderDistance.getValue());
        const theta = this.#theta + heading(this.parent.velocity);
        const x = this.#modifiers.WanderWidth.getValue() * Math.cos(theta);
        const y = this.#modifiers.WanderWidth.getValue() * Math.sin(theta);
        distance = add(distance, { x, y });
        this.#theta = this.#theta + random(-agility, agility);

        const force = substract(distance, this.parent.position);
        return setMagnitude(force, agility);
    }

};

export default Wander;
