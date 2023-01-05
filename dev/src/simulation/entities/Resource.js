import { mapMassToPixel } from "../../utilities/math.js";
import Entity from "../core/Entity.js";
import { createProperties, validateProperties } from "../core/requirements.js";
import { ClassType } from "../core/Types.js";

const Resource = class extends Entity {

    static ClassType = ClassType.RESOURCE;

    static Requirements = Object.freeze({
        Mass: { classType: ClassType.TRAIT, default: { min: 0, now: 50, max: 100 } },
        Decomposition: { classType: ClassType.BAR, default: { min: 0, now: 0, max: 100 } }
    });

    static #getTypeFromDecomposition = (degree) => {
        if (degree > 0) {
            return Entity.Type.ORGANIC;
        }
        return Entity.Type.ANORGANIC;
    };

    /**
     *
     * @param {{ x: number, y: number }} param0
     */
    constructor({ x, y }) {
        super({ x, y });
    }

    addProperties(...properties) {
        this.genes = validateProperties(
            createProperties(properties),
            Resource.Requirements
        );
        this.type = Resource.#getTypeFromDecomposition(this.genes.Decomposition.getValue());
        super.calculateColor();
    }

    draw(context) {
        this.graphics = context;
        const pixelSize = mapMassToPixel(this.genes.Mass.getValue());
        context.lineStyle(2, this.color, 1);
        context.beginFill();
        const halfSize = pixelSize / 2;
        if (this.type === Entity.Type.ANORGANIC) {
            context.drawRect(this.position.x - halfSize, this.position.y - halfSize, pixelSize, pixelSize);
        } else if (this.type === Entity.Type.ORGANIC) {
            context.drawRoundedRect(this.position.x - halfSize, this.position.y - halfSize, pixelSize, pixelSize, 10);
        }
        context.endFill();
    }

    getDecompositionDegree() {
        return this.genes.Decomposition.getValue();
    }

    render() {

    }

    update() {
        // TODO add decay method
    }

};

export default Resource;
