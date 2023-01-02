import Behaviour from "../core/Behaviour.js";
import Entity from "../core/Entity.js";
import { add, limit, multiplyScalar } from "../../pixi-adapter/math.js";
import Simulation from "../Simulation.js";

// research: https://pixijs.io/examples/#/demos-advanced/collision-detection.js

/*
@interface

Ability {
    requirements - all bars, trait, abilites for this abolity to work properly
    energy consumption
    storage - Abilities private variables
    triggers - all conditions when this ability executes
    execute - all the operations of this ability
        checks inside execute
}
*/

const Motion = class extends Behaviour {

    static checkCollisionWithBoundary(object) {
        const { width, height } = Simulation.getWorldAttributes();
        const { position, velocity, pixelSize } = object;
        if (position.x > width - pixelSize) {
            position.x = width - pixelSize;
            velocity.x = velocity.x * -1;
        } else if (position.x < pixelSize) {
            position.x = pixelSize;
            velocity.x = velocity.x * -1;
        } else if (position.y > height - pixelSize) {
            position.y = height - pixelSize;
            velocity.y = velocity.y * -1;
        } else if (position.y < pixelSize) {
            position.y = pixelSize;
            velocity.y = velocity.y * -1;
        }
    }

    // TODO add more of those to check
    static id = "Motion";

    static type = Behaviour.Type.ABILITY;

    static Requirements = Object.freeze({
        Energy: { type: Behaviour.Type.BAR },
        Speed: { type: Behaviour.Type.TRAIT },
        Agility: { type: Behaviour.Type.TRAIT }
    });

    #parent;

    #acceleration = { x: 0, y: 0 };

    constructor(parent) {
        super({ id: Motion.id, type: Motion.type });

        this.#parent = (parent instanceof Entity) ? parent : null;
    }

    execute(force) {

        /** @type {Bar} */
        const energy = this.#parent.genes.Energy;
        /** @type {number} */
        const speed = this.#parent.genes.Speed.getValue();

        // TODO add/improve trigger
        if (energy.getValue() > 0) {

            this.#acceleration = add(this.#acceleration, force);

            this.#parent.velocity = add(this.#parent.velocity, this.#acceleration);
            this.#parent.velocity = limit(this.#parent.velocity, speed);

            this.#parent.position = add(this.#parent.position, this.#parent.velocity);

            this.#acceleration = multiplyScalar(this.#acceleration, 0);

            // TODO calculate influence of speed & agility -> the better the stats the greater the energy consumption
            energy.decrease();

            Motion.checkCollisionWithBoundary(this.#parent);
        }

    }

};

export default Motion;
