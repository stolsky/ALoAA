import { ClassType } from "../core/Types.js";
import Ability from "../core/Ability.js";

const Decay = class extends Ability {

    static Requirements = Object.freeze({
        Decomposition: { classType: ClassType.BAR }
    });

    constructor() {
        super("Decay");
    }

    use() {
        const decomposition = this.parent.genes.Decomposition;
        if (!decomposition.isEmpty()) {
            // TODO get from Configutation -> no modifier -> "natural law"
            decomposition.decrease(1);
        }
    }

};

export default Decay;
