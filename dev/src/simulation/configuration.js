import Value from "./core/Value.js";

const Configuration = new (class {

    #speedMultiplier = new Value({ min: 2 ** -3, now: 2, max: 2 ** 10 });

    get speedMultiplier() {
        return this.#speedMultiplier.current;
    }

    set speedMultiplier(value) {
        this.#speedMultiplier.current = value;
    }

    get speedMultiplierMin() {
        return this.#speedMultiplier.minimum;
    }

    set speedMultiplierMin(value) {
        this.#speedMultiplier.minimum = value;
    }

    get speedMultiplierMax() {
        return this.#speedMultiplier.maximum;
    }

    set speedMultiplierMax(value) {
        this.#speedMultiplier.maximum = value;
    }

})();

export default Configuration;
