import { ClassType } from "../core/Types.js";
import Ability from "../core/Ability.js";

const Digestion = class extends Ability {

    static Requirements = Object.freeze({
        Food: { classType: ClassType.TRAIT },
        Energy: { classType: ClassType.BAR },
        Stomach: { classType: ClassType.BAR },
        Rectum: { classType: ClassType.BAR }
    });

    constructor() {
        super("Digestion");
    }

    use() {
        const stomach = this.parent.genes.Stomach;
        const energy = this.parent.genes.Energy;
        const rectum = this.parent.genes.Rectum;
        if (!stomach.isEmpty() && !energy.isFull() && !rectum.isFull()) {
            // decrease of stomach and increase of rectum must be the same -> no waste of mass
            stomach.decrease(1);
            rectum.increase(1);
            // TODO organic food give more energy
            energy.increase(1);
            return true;
        }
        return false;
    }

};

export default Digestion;
