import { ClassType } from "../core/Types.js";
import Ability from "../core/Ability.js";

const Growth = class extends Ability {

    static Requirements = Object.freeze({
        Energy: { classType: ClassType.BAR },
        Mass: { classType: ClassType.BAR },
        Stomach: { classType: ClassType.BAR }
    });

    constructor() {
        super("Growth");
    }

    use() {
        const { Energy, Mass, Stomach } = this.parent.genes;
        if (!Stomach.isEmpty() && !Energy.isEmpty() && !Mass.isFull()) {
            Mass.increase(1);
            Stomach.decrease(1);
            Energy.decrease(1);
        }
    }

};

export default Growth;
