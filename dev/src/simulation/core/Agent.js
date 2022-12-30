import Entity from "./Entity.js";
import Trait from "./Trait.js";
import Value from "./Value.js";
import { heading } from "../../pixi-adapter/math.js";

const Agent = class extends Entity {

    #foodSource;

    /**
     *
     * @param {{ x: number, y: number, mass: Value}} param0
     */
    constructor({ x, y, type, mass, foodSource }) {
        super({ x, y, type, mass });
        super.calculateColor();

        // The food source is a value between 0 and 100 and describes the way an agent feeds itself.
        // From 0 to 30 it feeds autotrophically, from 70 to 100 heterotrophically and in between from both food sources.
        // by default (foodSource is omitted) all agents are autotroph
        // use Trait instead of Bar because the food source changes only during mutation
        this.#foodSource = (foodSource instanceof Trait) ? foodSource : new Trait({
            id: "FoodSource",
            value: new Value({ min: 0, now: 0, max: 100 })
        });
    }

    update() {
        const force = this.genes.Wander.execute();
        this.genes.Motion.execute(force);
    }

    render() {
        this.graphics.x = this.position.x;
        this.graphics.y = this.position.y;
        this.graphics.rotation = heading(this.velocity);
    }

    draw(context) {
        this.graphics = context;

        // body
        context.lineStyle(2, this.color, 1);
        context.beginFill();
        context.drawEllipse(0, 0, this.pixelSize, this.pixelSize / 2);
        context.endFill();

        // eye
        context.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        context.beginFill(this.color, 1);
        const padding = Math.ceil(this.pixelSize / 10);
        context.drawCircle(this.pixelSize - 2 * padding, 0, padding);
        context.endFill();
    }

};

export default Agent;
