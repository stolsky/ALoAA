/* eslint-disable no-unused-expressions */

import { round } from "../../src/utilities/math.js";
import createEnum from "../../src/utilities/Enum.js";
import { isNotEmptyString } from "../../src/simulation/core/utilities.js";
import { ClassType } from "../../src/simulation/core/Types.js";
import Bar from "../../src/simulation/core/Bar.js";
import { createAgent } from "../../src/simulation/entities/generator.js";

describe("Test method \"round\"", () => {
    it("performs directed rounding to an integer, rounding half up", () => {
        expect(round(1.4)).to.equal(1);
        expect(round(1.6)).to.equal(2);
        expect(round(1.5)).to.equal(2);
    });
});

describe("Test Enum class", () => {

    it("Access elements of Enum", () => {
        const Directions = createEnum("UP", "RIGHT", "DOWN", "LEFT");
        expect(Directions.UP).to.be.a("symbol");
        expect(Directions).to.have.property("UP");
        expect(Directions).to.have.property("RIGHT");
        expect(Directions).to.have.property("DOWN");
        expect(Directions).to.have.property("LEFT");
        expect(Directions).to.have.property("has");
        expect(Directions.has(Directions.UP)).to.be.true;
        expect(Directions.has(Directions.RIGHT)).to.be.true;
        expect(Directions.has(Directions.DOWN)).to.be.true;
        expect(Directions.has(Directions.LEFT)).to.be.true;
    });

    it("Resetting Enum properties is not allowed", () => {
        const Directions = createEnum("UP", "RIGHT", "DOWN", "LEFT");
        expect(() => { Directions.UP = "NEW_UP"; }).to.throw();
    });

    it("The test method \"has\" of the Enum-like object works only with that object's members", () => {
        const Directions = createEnum("UP", "RIGHT", "DOWN", "LEFT");
        expect(Directions.has(Directions.UP)).to.be.true;
        expect(Directions.has("UP")).to.be.false;
        expect(Directions.has(Symbol("UP"))).to.be.false;
    });

    describe("Enum members must only consist of basic Latin alphabet, including the underscore", () => {

        it("Test allowed characters", () => {
            expect(() => createEnum("_UP_", "RIGHT", "DOWN", "LEFT")).to.not.throw();
            expect(() => createEnum("1UP1", "RIGHT", "DOWN", "LEFT")).to.not.throw();
            expect(() => createEnum("up", "RIGHT", "DOWN", "LEFT")).to.not.throw();
        });

        it("Test NOT allowed characters", () => {
            expect(() => createEnum("U$P", "RIGHT", "DOWN", "LEFT")).to.throw();
            expect(() => createEnum("U%P", "RIGHT", "DOWN", "LEFT")).to.throw();
            expect(() => createEnum("U P", "RIGHT", "DOWN", "LEFT")).to.throw();
            expect(() => createEnum("U-P", "RIGHT", "DOWN", "LEFT")).to.throw();
        });

    });

});

describe("Test if Symbol check has better performance than instanceof check", () => {
    it("than instanceof: identify Bar class", () => {

        const bar = new Bar({ id: "Test" });
        const testSize = 100_000_000;

        const startInstanceOf = performance.now();
        let barInstance;
        for (let i = 0; i < testSize; i = i + 1) {
            barInstance = bar instanceof Bar;
        }
        const endInstanceOf = performance.now();
        const deltaInstanceOf = endInstanceOf - startInstanceOf;
        expect(barInstance).to.be.true;

        const startSymbol = performance.now();
        for (let i = 0; i < testSize; i = i + 1) {
            barInstance = bar.constructor.ClassType === ClassType.BAR;
        }
        const endSymbol = performance.now();
        const deltaSymbol = endSymbol - startSymbol;
        expect(barInstance).to.be.true;

        expect(deltaInstanceOf).to.be.above(deltaSymbol);
        const result = deltaInstanceOf - deltaSymbol;
        cy.log(`After ${testSize} iterations ${(result >= 0) ? "\"Symbol\"" : "\"instanceof\""} comparison is ${result} ms faster`);
    });

    it("than undefined: distinguish classes by type or missing property", () => {

        const agent = createAgent();
        const testSize = 100_000_000;

        const startSymbol = performance.now();
        let counterSymbols = 0;
        for (let i = 0; i < testSize; i = i + 1) {
            // default type is autotroph
            if (agent.constructor.ClassType === ClassType.AGENT) {
                counterSymbols = counterSymbols + 1;
            }
        }
        const endSymbol = performance.now();
        const deltaSymbol = endSymbol - startSymbol;
        expect(counterSymbols).to.equal(testSize);

        const startUndefined = performance.now();
        let counterUndefined = 0;
        for (let i = 0; i < testSize; i = i + 1) {
            if (agent.genes.Stomach) {
                counterUndefined = counterUndefined + 1;
            }
        }
        const endUndefined = performance.now();
        const deltaUndefined = endUndefined - startUndefined;
        expect(counterUndefined).to.equal(testSize);

        expect(deltaUndefined).to.be.above(deltaSymbol);
        const result = deltaUndefined - deltaSymbol;
        cy.log(`After ${testSize} iterations ${(result >= 0) ? "\"Symbol\"" : "\"undefined\""} comparison is ${result} ms faster`);
    });


});

describe("Test isNotEmptyString method", () => {

    it("Not empty string", () => {
        expect(isNotEmptyString("Not Empty")).to.be.true;
    });

    it("Empty string", () => {
        expect(isNotEmptyString("")).to.be.false;
    });

    it("Parameter not of type string", () => {
        expect(isNotEmptyString(5)).to.be.false;
        expect(isNotEmptyString({})).to.be.false;
        expect(isNotEmptyString([])).to.be.false;
        expect(isNotEmptyString(true)).to.be.false;
    });

});
