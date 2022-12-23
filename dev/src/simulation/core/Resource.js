import createEnum from "../../utilities/Enum.js";
import Entity from "./Entity.js";

const Resource = class extends Entity {

    static Type = createEnum("NONE", "ANORGANIC", "ORGANIC1", "ORGANIC2");

    #type;

    /**
     *
     * @param {{ x: number, y: number, type: Resource.Type, mass: Value}} param0
     */
    constructor({ x, y, mass, type }) {
        super({ x, y, type: Entity.Type.RESOURCE, mass });

        this.#type = (Resource.Type.has(type)) ? type : Resource.Type.NONE;
    }

    update(deltaTime) {

    }

    draw(context) {
        context.lineStyle(2, 0xFEEB77, 1);
        context.beginFill(0x650A5A);
        context.drawRect(this.position.x, this.position.y, 50, 50);
        context.endFill();
    }

};

export default Resource;
