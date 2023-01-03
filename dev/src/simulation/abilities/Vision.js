import Entity from "../core/Entity.js";
import Behaviour from "../core/Behaviour.js";
import { magnitude, substract } from "../../pixi-adapter/math.js";

const Vision = class extends Behaviour {

    static id = "Vision";

    static type = Behaviour.Type.ABILITY;

    static Requirements = Object.freeze({
        VisionDistance: { type: Behaviour.Type.TRAIT },
        VisionWidth: { type: Behaviour.Type.TRAIT }
    });

    #parent;

    constructor(parent) {
        super({ id: Vision.id, type: Vision.type });
        this.#parent = (parent instanceof Entity) ? parent : null;
    }

    /**
     * @param {Array<Entity>} entities
     *
     * @returns {}
     */
    execute(entities) {

        let target = null;

        if (entities instanceof Array) {

            // the longer the distance the more narrow the width
            const visionWidth = this.#parent.genes.VisionWidth.getValue();
            //
            const visionDistance = this.#parent.genes.VisionDistance.getValue();
            const distance = this.#parent.calculateDistanceFromCurrentPosition(visionDistance);

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
