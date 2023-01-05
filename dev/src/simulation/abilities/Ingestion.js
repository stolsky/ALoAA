import { ClassType } from "../core/Types.js";
import Entity from "../core/Entity.js";
import { createProperties, validateProperties } from "../core/requirements.js";
import Ability from "../core/Ability.js";

const Ingestion = class extends Ability {

    /**
     *
     * @param {Entity} predator
     * @param {Entity} prey
     */
    static #isCorrectFoodSource = (diet, prey) => {

        const type = Entity.Type;
        const food = prey.constructor.ClassType;

        if (diet === type.AUTOTROPH && prey.type === type.ANORGANIC) {
            return true;
        }

        if (diet === type.HETEROTROPH && food === ClassType.AGENT) {
            return true;
        }

        return diet === type.MIXOTROPH && (food === ClassType.AGENT || prey.type === type.ORGANIC);
    };

    static Requirements = Object.freeze({
        Energy: { classType: ClassType.BAR },
        Stomach: { classType: ClassType.BAR }
        // TODO add energy consumption + default
        // TODO add amount of food consumed per turn + default
    });

    #modifiers;

    constructor(parent, ...modifiers) {
        super(parent, "Ingestion");
        this.#modifiers = validateProperties(
            createProperties(modifiers),
            Ingestion.Requirements,
            true
        );
        Object.freeze(this);
    }

    use(target) {
        let done = true;
        if (Ingestion.#isCorrectFoodSource(this.parent.type, target)) {
            /** @type {Bar} */
            const stomach = this.parent.genes.Stomach;
            /** @type {Bar} */
            const energy = this.parent.genes.Energy;

            if (!stomach.isFull()) {
                const mass = target.genes.Mass;
                if (!mass.isEmpty()) {
                    // TODO organic food is harder to eat (assume fights, etc.) and fills stomach faster
                    mass.decrease(1);
                    stomach.increase(1);
                    energy.decrease(1);
                    done = false;
                }
            }
        }
        return done;
    }

};

export default Ingestion;
