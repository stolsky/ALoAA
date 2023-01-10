import Configuration from "./Configuration.js";
import { ClassType } from "./core/Types.js";

const Simulation = new (class {

    #worldZoom = 1;

    #timePassed = 0;

    #speedFactor = 1;

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

    get worldZoom() {
        return this.#worldZoom;
    }

    set worldZoom(zoom) {
        if (Number.isFinite(zoom) && zoom > 0) {
            this.#worldZoom = zoom;
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
