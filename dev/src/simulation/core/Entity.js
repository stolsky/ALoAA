import Bar from "./Bar.js";
import createEnum from "../../utilities/Enum.js";
import Behaviour from "./Behaviour.js";
import Configuration from "../Configuration.js";
import { mapMassToPixel } from "../../utilities/math.js";
import { add, setMagnitude } from "../../pixi-adapter/math.js";

const Entity = class {

    static Type = createEnum("NONE", "ANORGANIC", "ORGANIC", "AUTOTROPH", "HETEROTROPH");

    #checkRequirements = (requirements) => {
        if (requirements instanceof Array) {
            requirements.forEach((requirement) => {
                // TODO add requirement checks and auto adding bars, traits, abilities, + warnings
                console.log(requirement);
            });
        }
    };

    constructor({ x, y, type, mass }) {

        this.type = (Entity.Type.has(type)) ? type : Entity.Type.NONE;

        this.position = (Number.isFinite(x) && Number.isFinite(y)) ? { x, y } : { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 }; // TODO check if really: current speed & orientation

        // pool for all abilities, bars and traits, identified by unique id
        // TODO mutate: Bar.rate (min, max, now), Trait (min, max,now), Ability.triggers (conditions: Traits, Bars)
        this.genes = {};

        // mass is required
        this.genes.mass = (mass instanceof Bar) ? mass : new Bar({ id: "mass", value: { min: 0, now: 50, max: 100 } });
        this.pixelSize = mapMassToPixel(this.genes.mass.getValue());

        this.target = null;
        this.threat = null;

        this.graphics = null;
        this.color = null;

        Object.seal(this);
    }

    addProperty(gene) {
        if (gene instanceof Behaviour) {
            const { id } = gene;
            if (!Object.hasOwn(this.genes, id)) {
                if (Object.hasOwn(gene.constructor, "Requirements")) {
                    this.#checkRequirements(gene.constructor.Requirements);
                }
                this.genes[`${id}`] = gene;
            }
        }
    }

    calculateColor(genes) {
        // set base color
        if (this.type === Entity.Type.ANORGANIC) {
            this.color = Configuration.Colors.ANORGANIC;
        } else if (this.type === Entity.Type.ORGANIC) {
            this.color = Configuration.Colors.ORGANIC;
        } else if (this.type === Entity.Type.AUTOTROPH) {
            this.color = Configuration.Colors.AUTOTROPH;
        } else if (this.type === Entity.Type.HETEROTROPH) {
            this.color = Configuration.Colors.HETEROTROPH;
        } else {
            this.color = 0xCCCCCC;
        }
        // TODO adjust base color by genes
    }

    calculateDistanceFromCurrentPosition(length) {
        let distance = { ...this.velocity };
        distance = setMagnitude(distance, length);
        return add(distance, this.position);
    }
};

export default Entity;
