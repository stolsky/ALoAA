import Entity from "./Entity.js";
import Bar from "./Bar.js";
import Value from "./Value.js";

const Resource = class extends Entity {

    #decomposition;

    /**
     *
     * @param {{ x: number, y: number, type: Resource.Type, mass: Bar}} param0
     */
    constructor({ x, y, type, mass, decomposition }) {
        super({ x, y, type, mass });
        super.calculateColor();

        // decomposition describes the degree of decomposition from the organic to the anorganic state
        // as soon as it reaches 100, it changes from organic to anorganic
        this.#decomposition = (decomposition instanceof Bar) ? decomposition : new Bar({
            id: "Decomposition",
            value: new Value({ min: 0, now: 0, max: 100 })
        });
    }

    update() {
        // TODO add decay method
    }

    render() {

    }

    draw(context) {
        context.lineStyle(2, this.color, 1);
        context.beginFill();
        context.drawRect(this.position.x, this.position.y, this.pixelSize, this.pixelSize);
        context.endFill();
    }

    getDecompositionDegree() {
        return this.#decomposition;
    }

};

export default Resource;
