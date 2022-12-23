/* eslint-disable no-unused-expressions */
import { round } from "../../src/utilities/math.js";
import createEnum from "../../src/utilities/Enum.js";

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
