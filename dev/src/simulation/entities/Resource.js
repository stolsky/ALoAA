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
        // TODO refactor
        this.genes = validateProperties(
            addProperties(properties),
            Resource.Requirements
        );
        // initialize appearance related properties
        this.pixelSize = mapMassToPixel(this.genes.Mass.getValue());
        this.type = Resource.#getTypeFromDecomposition(this.genes.Decomposition.getValue());
        this.color = getColorFromType(this.type);
    }

    draw(context) {
        if (this.graphics === null) {
            this.graphics = context;
        }
        this.graphics.clear();
        this.graphics.lineStyle(2, this.color, 1);
        this.graphics.beginFill();
        const halfSize = this.pixelSize / 2;
        if (this.type === Entity.Type.ANORGANIC) {
            this.graphics.drawRect(this.position.x - halfSize, this.position.y - halfSize, this.pixelSize, this.pixelSize);
        } else if (this.type === Entity.Type.ORGANIC) {
            this.graphics.drawRoundedRect(this.position.x - halfSize, this.position.y - halfSize, this.pixelSize, this.pixelSize, 10);
        }
        this.graphics.endFill();
    }

    getDecompositionDegree() {
        return this.genes.Decomposition.getValue();
    }

    render() {
        let mustDraw = false;
        if (this.genes.Mass.hasChanged()) {
            this.pixelSize = mapMassToPixel(this.genes.Mass.getValue());
            mustDraw = true;
        }
        if (this.genes.Decomposition.hasChanged() && this.genes.Decomposition.isEmpty()) {
            this.type = Resource.#getTypeFromDecomposition(this.genes.Decomposition.getValue());
            this.color = getColorFromType(this.type);
            mustDraw = true;
        }
        if (mustDraw) {
            this.draw();
        }
    }

    update() {
        // TODO get abilities from ability container and execute them if they trigger -> no optiuonal chaining
        // containers are ordered by priority
        this.genes?.Decay?.use();
    }

};

export default Resource;
