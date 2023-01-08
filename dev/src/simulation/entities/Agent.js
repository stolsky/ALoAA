import Entity from "../core/Entity.js";
import { heading } from "../../pixi-adapter/math.js";
import { ClassType } from "../core/Types.js";
import { checkDistanceIsZero, getColorFromType } from "../core/utilities.js";
import { mapMassToPixel } from "../../utilities/math.js";
import { addProperties, validateProperties } from "../core/requirements.js";

const Agent = class extends Entity {

    static ClassType = ClassType.AGENT;

    static Requirements = Object.freeze({
        Mass: { classType: ClassType.TRAIT, default: { min: 0, now: 50, max: 100 } },
        // The food source is a value between 0 and 100 and describes the way an agent feeds itself.
        // by default (food is omitted) all agents are autotroph
        Food: { classType: ClassType.TRAIT, default: { min: 0, now: 0, max: 100 } }
    });

    /** Assigns a type to the current numerical value of the Trait `Food`.
     *
     * From 0 to 30 it feeds autotrophically, from 70 to 100 heterotrophically and in between from both food sources.
     *
     * Note: This method should only be called if the current value of food source is changing like during mutation.
     *
     * @param {number} value
     *
     * @returns {Symbol} The Symbol describing the type.
     */
    static #getTypeFromDiet = (value) => {
        let type = Entity.Type.MIXOTROPH;
        if (value <= 30) {
            type = Entity.Type.AUTOTROPH;
        } else if (value >= 70) {
            type = Entity.Type.HETEROTROPH;
        }
        return type;
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
            Agent.Requirements
        );
        this.type = Agent.#getTypeFromDiet(this.genes.Food.getValue());
        this.color = getColorFromType(this.type);
    }

    draw(context) {
        if (this.graphics === null) {
            this.graphics = context;
        }
        this.pixelSize = mapMassToPixel(this.genes.Mass.getValue());
        // body
        context.lineStyle(2, this.color, 1);
        context.beginFill();
        context.drawEllipse(-this.pixelSize, 0, this.pixelSize, this.pixelSize / 2);
        context.endFill();
        // eye
        // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        context.lineStyle(0);
        context.beginFill(this.color, 1);
        const padding = Math.ceil(this.pixelSize / 10);
        context.drawCircle(-padding * 2, 0, padding);
        context.endFill();
    }

    render() {
        if (this.genes.Mass.hasChanged()) {
            this.draw();
        }
        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
        this.graphics.rotation = heading(this.velocity);
    }

    update() {
        // TODO add checks if ability is present
        // TODO improve collision checks

        // TODO imptrove vision so that also threats are recognized
        const nextTarget = this.genes.Vision.use(this.type);

        if (this.target === null && nextTarget !== null) {
            this.target = nextTarget;
        }

        let force = null;
        if (this.target !== null) {
            if (checkDistanceIsZero(this.position, this.target.position)) {
                const done = this.genes.Ingestion.use(this.target);
                if (done) {
                    this.target = null;
                }
            } else {
                force = this.genes.SeekAndArrive.use(this.target);
            }
        } else {
            const isDigesting = this.genes.Digestion.use();
            if (!isDigesting) {
                force = this.genes.Wander.use();
            }
        }

        this.genes.Motion.use(force);
        // this.genes.Growth.use();
    }

};

export default Agent;
