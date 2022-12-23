import Configuration from "./configuration.js";
import Resource from "./core/Resource.js";

const Simulation = new (class {

    #World = {
        width: 1024,
        height: 768
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
            if (value < Configuration.speedMultiplierMax && value > Configuration.speedMultiplierMin) {
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

    addResource(resource) {
        if (resource instanceof Resource) {
            this.#resources.push(resource);
        }
    }

    getResources() {
        // TODO test if copy/filtered array is enough
        return this.#resources;
    }

})();

export default Simulation;
