import { ClassType } from "../core/Types.js";
import { add, limit, multiplyScalar } from "../../pixi-adapter/math.js";
import Simulation from "../Simulation.js";
import Ability from "../core/Ability.js";

const Motion = class extends Ability {

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

    static Requirements = Object.freeze({
        Energy: { classType: ClassType.BAR },
        Speed: { classType: ClassType.TRAIT },
        Agility: { classType: ClassType.TRAIT }
    });

    #acceleration = { x: 0, y: 0 };

    // TODO add modifier EnergyConsumption Trait
    constructor(parent) {
        super(parent, "Motion");
        Object.freeze(this);
    }

    use(force) {

        /** @type {Bar} */
        const energy = this.parent.genes.Energy;
        /** @type {number} */
        const speed = this.parent.genes.Speed.getValue();

        // TODO add/improve trigger

        this.#acceleration = add(this.#acceleration, force);

        this.parent.velocity = add(this.parent.velocity, this.#acceleration);
        this.parent.velocity = limit(this.parent.velocity, speed);

        this.parent.position = add(this.parent.position, this.parent.velocity);

        this.#acceleration = multiplyScalar(this.#acceleration, 0);

        // TODO calculate influence of speed & agility -> the better the stats the greater the energy consumption
        energy.decrease(1);

        Motion.checkCollisionWithBoundary(this.parent);

    }

};

export default Motion;
