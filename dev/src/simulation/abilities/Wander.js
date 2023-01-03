import Behaviour from "../core/Behaviour.js";
import Entity from "../core/Entity.js";
import random from "../../utilities/random.js";
import { add, heading, setMagnitude, substract } from "../../pixi-adapter/math.js";

const Wander = class extends Behaviour {

    static id = "Wander";

    static type = Behaviour.Type.ABILITY;

    static Requirements = Object.freeze({
        Motion: { type: Behaviour.Type.ABILITY },
        WanderDistance: { type: Behaviour.Type.TRAIT },
        WanderWidth: { type: Behaviour.Type.TRAIT }
    });

    #parent;

    #theta = Math.PI * 0.5;

    constructor(parent) {
        super({ id: Wander.id, type: Wander.type });
        this.#parent = (parent instanceof Entity) ? parent : null;
    }

    execute() {
        const agility = this.#parent.genes.Agility.getValue();

        let distance = this.#parent.calculateDistanceFromCurrentPosition(this.#parent.genes.WanderDistance.getValue());
        const theta = this.#theta + heading(this.#parent.velocity);
        const x = this.#parent.genes.WanderWidth.getValue() * Math.cos(theta);
        const y = this.#parent.genes.WanderWidth.getValue() * Math.sin(theta);
        distance = add(distance, { x, y });
        this.#theta = this.#theta + random(-agility, agility);

        const force = substract(distance, this.#parent.position);
        return setMagnitude(force, agility);
    }

};

export default Wander;
