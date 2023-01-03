import Entity from "./Entity.js";
import Trait from "./Trait.js";
import { heading } from "../../pixi-adapter/math.js";
import Simulation from "../Simulation.js";

const Agent = class extends Entity {

    // TODO replace with Symbol and compare with Symbols
    static id = "Agent";

    /** Assigns a type to the current numerical value of the Trait FoodSource.
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

    #move = () => {
        let force;
        // move to private movement method
        if (this.target !== null) {
            force = this.genes.SeekAndArrive.execute(this.target);
        } else {
            force = this.genes.Wander.execute();
        }
        this.genes.Motion.execute(force);
    };

    #see = () => {
        let targets = null;
        if (this.type === Entity.Type.AUTOTROPH) {
            targets = Simulation.getResources().filter((resource) => resource.type === Entity.Type.ANORGANIC);
        } else if (this.type === Entity.Type.MIXOTROPH) {
            targets = Simulation.getEntities();
        } else if (this.type === Entity.Type.HETEROTROPH) {
            targets = [...Simulation.getAgents(), ...Simulation.getResources().filter((resource) => resource.type === Entity.Type.ORGANIC)];
        }
        const nextTarget = this.genes.Vision.execute(targets);
        if (this.target === null && nextTarget !== null) {
            this.target = nextTarget;
        }
    };

    /**
     *
     * @param {{ x: number, y: number, mass: Bar, food: Trait}} param0
     */
    constructor({ x, y, mass, food }) {

        // The food source is a value between 0 and 100 and describes the way an agent feeds itself.
        // From 0 to 30 it feeds autotrophically, from 70 to 100 heterotrophically and in between from both food sources.
        // by default (foodSource is omitted) all agents are autotroph
        // use Trait instead of Bar because the food source changes only during mutation
        const foodSource = (food instanceof Trait) ? food : new Trait({
            id: "FoodSource",
            value: { min: 0, now: 0, max: 100 }
        });

        super({ x, y, type: Agent.#getTypeFromDiet(foodSource.getValue()), mass });
        super.calculateColor();

        this.addProperty(foodSource);

    }

    update() {
        // TODO add checks if ability is present

        this.#see();

        this.#move();
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

};

export default Agent;
