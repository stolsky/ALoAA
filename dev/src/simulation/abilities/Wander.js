import Behaviour from "../core/Behaviour.js";
import Entity from "../core/Entity.js";
import random from "../../utilities/random.js";
import Trait from "../core/Trait.js";
import { add, heading, setMagnitude, substract } from "../../pixi-adapter/math.js";

const Wander = class extends Behaviour {

    static id = "Wander";

    static type = Behaviour.Type.ABILITY;

    static Requirements = Object.freeze({ Motion: { type: Behaviour.Type.ABILITY } });

    #parent;

    #distance;

    #width;

    #theta;

    constructor(parent) {
        super({ id: Wander.id, type: Wander.type });

        this.#parent = (parent instanceof Entity) ? parent : null;

        // TODO make them Traits
        this.#distance = new Trait({ id: "WanderDistance", value: { min: 0, now: 75, max: 100 } });
        this.#width = new Trait({ id: "WanderWidth", value: { min: 0, now: 50, max: 100 } });

        this.#theta = Math.PI * 0.5;
    }

    execute() {
        const agility = this.#parent.genes.Agility.getValue();

        let distance = this.#parent.calculateDistanceFromCurrentPosition(this.#distance.getValue());
        const theta = this.#theta + heading(this.#parent.velocity);
        const x = this.#width.getValue() * Math.cos(theta);
        const y = this.#width.getValue() * Math.sin(theta);
        distance = add(distance, { x, y });
        this.#theta = this.#theta + random(-agility, agility);

        const force = substract(distance, this.#parent.position);
        return setMagnitude(force, agility);
    }

};

export default Wander;
