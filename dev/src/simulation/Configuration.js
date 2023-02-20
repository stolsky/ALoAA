import Value from "./core/Value.js";

const Configuration = new (class {

    constructor() {

        this.World = {
            width: 3000,
            height: 2000
        };

        this.Entities = {
            Anorganic: {
                index: 0,
                symbol: Symbol("Anorganic"),
                name: "Anorganic",
                color: 0xFDE802, // 0xD1FE49
                quantity: 100
            },
            Organic: {
                index: 1,
                symbol: Symbol("Organic"),
                name: "Organic",
                color: 0xFF901B,
                quantity: 0
            },
            Autotroph: {
                index: 2,
                symbol: Symbol("Autotroph"),
                name: "Autotroph",
                color: 0x07F985,
                quantity: 10
            },
            Heterotroph: {
                index: 3,
                symbol: Symbol("Heterotroph"),
                name: "Heterotroph",
                color: 0xFC5E01,
                quantity: 0
            },
            Mixotroph: {
                index: 4,
                symbol: Symbol("Mixotroph"),
                name: "Mixotroph",
                color: 0xFF00FA,
                quantity: 0
            }
        };

        /** Defines ghow often a mutation occurs in percent from 0 to 100 */
        this.mutationRate = 5;

        this.seed = "ALoAA";

        this.speedMultiplier = new Value({ min: 2 ** -3, now: 2, max: 2 ** 10 });

        this.Values = {
            Min: {
                AgentMass: 0,
                Decomposition: 0,
                Energy: 0,
                Food: 0,
                ResourceMass: 0
            },
            Max: {
                AgentMass: 100,
                Decomposition: 500,
                Energy: 1000,
                Food: 100,
                ResourceMass: 100
            }
        };

    }

    assign() {
        Object.freeze(this);
        Object.freeze(this.World);
        Object.freeze(this.Entities);
        Object.values(this.Entities).forEach((entity) => Object.freeze(entity));
        Object.freeze(this.speedMultiplier);
        Object.freeze(this.Values);
        Object.freeze(this.Values.Min);
        Object.freeze(this.Values.Max);
    }

})();

export default Configuration;
