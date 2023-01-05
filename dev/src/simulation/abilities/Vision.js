import { ClassType } from "../core/Types.js";
import { magnitude, substract } from "../../pixi-adapter/math.js";
import Ability from "../core/Ability.js";
import Entity from "../core/Entity.js";
import Simulation from "../Simulation.js";

const Vision = class extends Ability {

    static Requirements = Object.freeze({
        VisionDistance: { classType: ClassType.TRAIT },
        VisionWidth: { classType: ClassType.TRAIT }
    });

    static #loadTargets = (diet) => {
        const type = Entity.Type;
        let targets = null;
        if (diet === type.AUTOTROPH) {
            targets = Simulation.getResources().filter((resource) => resource.type === type.ANORGANIC);
        } else if (diet === type.MIXOTROPH) {
            targets = Simulation.getEntities();
        } else if (diet === type.HETEROTROPH) {
            targets = [...Simulation.getAgents(), ...Simulation.getResources().filter((resource) => resource.type === type.ORGANIC)];
        }
        return targets;
    };

    constructor(parent) {
        super(parent, "Vision");
        Object.freeze(this);
    }

    /**
     * @param {Array<Entity>} entities
     *
     * @returns {}
     */
    use(diet) {
        const entities = Vision.#loadTargets(diet);
        let target = null;
        if (Array.isArray(entities)) {

            // the longer the distance the more narrow the width
            const visionWidth = this.parent.genes.VisionWidth.getValue();
            //
            const visionDistance = this.parent.genes.VisionDistance.getValue();
            const distance = this.parent.calculateDistanceFromCurrentPosition(visionDistance);

            let closestDistance = visionWidth;
            entities.forEach((entity) => {
                const distanceToEntity = magnitude(substract(distance, entity.position));
                if (distanceToEntity < closestDistance && distanceToEntity < visionWidth) {
                    target = entity;
                    closestDistance = distanceToEntity;
                }
            });
        }
        return target;
    }

};

export default Vision;
