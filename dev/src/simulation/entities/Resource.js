import { mapMassToPixel } from "../../utilities/math.js";
import Entity from "../core/Entity.js";
import { addProperties, validateProperties } from "../core/requirements.js";
import { ClassType } from "../core/Types.js";
import { getColorFromType } from "../core/utilities.js";

const Resource = class extends Entity {

    static ClassType = ClassType.RESOURCE;

    static Requirements = Object.freeze({
        Mass: { classType: ClassType.BAR, default: { min: 0, now: 50, max: 100 } },
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
            addProperties(properties),
            Resource.Requirements
        );
        this.type = Resource.#getTypeFromDecomposition(this.genes.Decomposition.getValue());
        this.color = getColorFromType(this.type);
    }

    draw(context) {
        if (this.graphics === null) {
            this.graphics = context;
        }
        const pixelSize = mapMassToPixel(this.genes.Mass.getValue());
        this.graphics.clear();
        this.graphics.lineStyle(2, this.color, 1);
        this.graphics.beginFill();
        const halfSize = pixelSize / 2;
        if (this.type === Entity.Type.ANORGANIC) {
            this.graphics.drawRect(this.position.x - halfSize, this.position.y - halfSize, pixelSize, pixelSize);
        } else if (this.type === Entity.Type.ORGANIC) {
            this.graphics.drawRoundedRect(this.position.x - halfSize, this.position.y - halfSize, pixelSize, pixelSize, 10);
        }
        this.graphics.endFill();
    }

    getDecompositionDegree() {
        return this.genes.Decomposition.getValue();
    }

    render() {
        if (this.genes.Mass.hasChanged()) {
            this.draw();
        }
    }

    update() {
        this.genes?.Decay?.use();
    }

};

export default Resource;
