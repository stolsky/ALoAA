import { ClassType } from "../core/Types.js";
import Entity from "../core/Entity.js";
import { addProperties, validateProperties } from "../core/requirements.js";
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
        Food: { classType: ClassType.TRAIT },
        Energy: { classType: ClassType.BAR },
        Stomach: { classType: ClassType.BAR }
        // TODO add energy consumption + default
        // TODO add amount of food consumed per turn + default
    });

    #modifiers;

    constructor(...modifiers) {
        super("Ingestion");
        this.#modifiers = validateProperties(
            addProperties(modifiers),
            Ingestion.Requirements,
            true
        );
    }

    use(target) {
        let done = true;
        if (Ingestion.#isCorrectFoodSource(this.parent.type, target)) {
            /** @type {Bar} */
            const stomach = this.parent.genes.Stomach;
            /** @type {Bar} */
            const energy = this.parent.genes.Energy;

            if (!stomach.isFull()) {
                const targetMass = target.genes.Mass;
                if (!targetMass.isEmpty()) {
                    // decrease of mass and increase of stomach must be the same -> no waste of mass
                    targetMass.decrease(1);
                    stomach.increase(1);
                    // TODO organic food is harder to eat (assume fights, etc.) -> more energy
                    energy.decrease(1);
                    done = false;
                }
            }
        }
        return done;
    }

};

export default Ingestion;
