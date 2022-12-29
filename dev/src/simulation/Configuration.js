import Value from "./core/Value.js";

const Configuration = new (class {

    constructor() {
        this.speedMultiplier = new Value({ min: 2 ** -3, now: 2, max: 2 ** 10 });
        this.Colors = {
            ANORGANIC: 0x1BAD00,
            ORGANIC: 0xAD001B,
            AUTOTROPH: 0x39FF14,
            HETEROTROPH: 0xFF1439
        };
    }

    assign() {
        Object.freeze(this);
        Object.freeze(this.Colors);
        Object.freeze(this.speedMultiplier);
    }

})();

export default Configuration;
