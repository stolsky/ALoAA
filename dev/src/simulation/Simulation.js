import Configuration from "./Configuration.js";
import { ClassType } from "./core/Types.js";

const Simulation = new (class {

    #World = {
        width: 3000,
        height: 2000,
        scale: 1
    };

    #timePassed = 0;

    #speedFactor = 1;

    #isRunning = false;

    #resources = [];

    #agents = [];

    get timePassed() {
        return this.#timePassed;
    }

    set timePassed(value) {
        if (Number.isFinite(value)) {
            this.#timePassed = value;
        }
    }

    get speedFactor() {
        return this.#speedFactor;
    }

    set speedFactor(value) {
        if (Number.isFinite(value)) {
            if (value <= Configuration.speedMultiplier.maximum && value >= Configuration.speedMultiplier.minimum) {
                this.#speedFactor = value;
            }
        }
    }

    get isRunning() {
        return this.#isRunning;
    }

    set isRunning(state) {
        if (typeof state === "boolean") {
            this.#isRunning = state;
        }
    }

    getWorldAttributes() {
        return this.#World;
    }

    setWorldScale(scale) {
        if (Number.isFinite(scale) && scale > 0) {
            this.#World.scale = scale;
        }
    }

    addEntity(entity) {
        const classType = entity.constructor.ClassType;
        if (classType === ClassType.RESOURCE) {
            this.#resources.push(entity);
        } else if (classType === ClassType.AGENT) {
            this.#agents.push(entity);
        }
    }

    getAgents() {
        return this.#agents;
    }

    getEntities() {
        return [...this.#resources, ...this.#agents];
    }

    getResources() {
        // TODO test if copy/filtered array is enough
        return this.#resources;
    }

})();

export default Simulation;
