import Value from "../../src/simulation/core/Value.js";
import { ClassType } from "../../src/simulation/core/Types.js";
import Bar from "../../src/simulation/core/Bar.js";
import Trait from "../../src/simulation/core/Trait.js";
import { round } from "../../src/utilities/math.js";

describe("Test Trait class", () => {

    describe("Test instantiation", () => {
        it("With all correct (not default) parameters", () => {
            const id = "speed";
            const name = "Speed";
            const description = "How fast an agent can move";
            const value = { min: 0, now: 20, max: 100 };

            const trait = new Trait({ id, name, description, value });

            expect(Trait).to.have.property("ClassType");
            expect(trait).to.have.property("id");
            expect(trait).to.have.property("name");
            expect(trait).to.have.property("description");
            expect(trait).to.have.property("getValue");

            expect(Trait.ClassType).to.equal(ClassType.TRAIT);
            expect(trait.id).to.equal(id);
            expect(trait.name).to.equal(name);
            expect(trait.description).to.equal(description);
            expect(trait.getValue()).to.equal(value.now);
        });

        it("With without parameters (except for id)", () => {
            const id = "speed";
            const trait = new Trait({ id });

            expect(Trait).to.have.property("ClassType");
            expect(trait).to.have.property("id");
            expect(trait).to.have.property("name");
            expect(trait).to.have.property("description");
            expect(trait).to.have.property("getValue");

            console.log(trait);
            expect(Trait.ClassType).to.equal(ClassType.TRAIT);
            expect(trait.id).to.equal(id);
            expect(trait.name).to.equal("");
            expect(trait.description).to.equal("");
            expect(trait.getValue()).to.equal(Value.MAX);
        });

        it("With wrong parameters (except id)", () => {
            const id = "speed";
            const name = [2, 3];
            const description = { a: "test" };
            const value = { min: "0", now: Symbol("20"), max: false };
            const base = { min: null, now: true, max: undefined };

            const trait = new Trait({ id, name, description, value, base });

            expect(Trait).to.have.property("ClassType");
            expect(trait).to.have.property("id");
            expect(trait).to.have.property("name");
            expect(trait).to.have.property("description");
            expect(trait).to.have.property("getValue");

            expect(Trait.ClassType).to.equal(ClassType.TRAIT);
            expect(trait.id).to.equal(id);
            expect(trait.name).to.equal("");
            expect(trait.description).to.equal("");
            expect(trait.getValue()).to.equal(Value.MAX);
        });

    });

});

describe("Test Bar class", () => {

    describe("Test instantiation", () => {
        it("With all correct (not default) parameters", () => {
            const id = "age";
            const name = "Age";
            const description = "How many seconds the agents has already survived.";
            const value = { min: 0, now: 20, max: 100 };
            const rate = { min: 0, now: 2, max: 10 };

            const bar = new Bar({ id, name, description, value, rate });

            expect(Bar).to.have.property("ClassType");
            expect(bar).to.have.property("id");
            expect(bar).to.have.property("name");
            expect(bar).to.have.property("description");
            expect(bar).to.have.property("getValue");
            expect(bar).to.have.property("increase");
            expect(bar).to.have.property("decrease");

            expect(Bar.ClassType).to.equal(ClassType.BAR);
            expect(bar.id).to.equal(id);
            expect(bar.name).to.equal(name);
            expect(bar.description).to.equal(description);
            expect(bar.getValue()).to.equal(value.now);
        });

        it("Without parameters (except for id)", () => {
            const id = "age";
            const bar = new Bar({ id });

            expect(Bar).to.have.property("ClassType");
            expect(bar).to.have.property("id");
            expect(bar).to.have.property("name");
            expect(bar).to.have.property("description");
            expect(bar).to.have.property("getValue");
            expect(bar).to.have.property("increase");
            expect(bar).to.have.property("decrease");

            expect(Bar.ClassType).to.equal(ClassType.BAR);
            expect(bar.id).to.equal(id);
            expect(bar.name).to.equal("");
            expect(bar.description).to.equal("");
            expect(bar.getValue()).to.equal(Value.MAX);
        });

        it("With wrong parameters (except id)", () => {
            const id = "age";
            const name = [2, 3];
            const description = { a: "test" };
            const value = { min: "0", now: Symbol("20"), max: false };
            const rate = { min: null, now: true, max: undefined };

            const bar = new Bar({ id, name, description, value, rate });

            expect(Bar).to.have.property("ClassType");
            expect(bar).to.have.property("id");
            expect(bar).to.have.property("name");
            expect(bar).to.have.property("description");
            expect(bar).to.have.property("getValue");
            expect(bar).to.have.property("increase");
            expect(bar).to.have.property("decrease");

            expect(Bar.ClassType).to.equal(ClassType.BAR);
            expect(bar.id).to.equal(id);
            expect(bar.name).to.equal("");
            expect(bar.description).to.equal("");
            expect(bar.getValue()).to.equal(Value.MAX);
        });

        it("Test increase bar with default rate of 1", () => {
            const bar = new Bar({ id: "age", value: { now: 0 } });
            expect(bar.getValue()).to.equal(0);

            const inc = 10;
            bar.increase(inc);
            // current rate value is by default 1
            expect(bar.getValue()).to.equal(inc);

        });

        it("Test increase bar without default rate", () => {
            const valueNow = 0;
            const rateNow = 0.5;
            const bar = new Bar({ id: "age", value: { now: valueNow }, rate: { now: rateNow } });
            expect(bar.getValue()).to.equal(valueNow);

            const inc = 20;
            bar.increase(inc);
            expect(bar.getValue()).to.equal(round(inc * rateNow));

        });

        it("Test decrease bar with default rate of 1", () => {
            const now = 50;
            const bar = new Bar({ id: "age", value: { now } });
            expect(bar.getValue()).to.equal(now);

            const dec = 10;
            bar.decrease(dec);
            // current rate value is by default 1
            expect(bar.getValue()).to.equal(now - dec);
        });

        it("Test decrease bar without default rate (set rate.maximum accordingly)", () => {
            const valueNow = 50;
            const rateNow = 0.5;
            const rateMax = 1;
            const bar = new Bar({ id: "age", value: { now: valueNow }, rate: { now: rateNow, max: rateMax } });
            expect(bar.getValue()).to.equal(valueNow);

            const dec = 20;
            bar.decrease(dec);
            expect(bar.getValue()).to.equal(round(valueNow - dec * (rateMax - rateNow)));

        });

        it("Test increase bar above maximum (with default rate of 1) should be set to maximum", () => {
            const now = 50;
            const max = 1000;
            const bar = new Bar({ id: "age", value: { now, max } });
            expect(bar.getValue()).to.equal(now);

            const inc = 6000;
            bar.increase(inc);
            // current rate value is by default 1
            expect(bar.getValue()).to.equal(max);
        });

        it("Test decrease bar below minimum (with default rate of 1) should be set to minimum", () => {
            const now = 50;
            const min = 0;
            const bar = new Bar({ id: "age", value: { min, now } });
            expect(bar.getValue()).to.equal(now);

            const dec = 60;
            bar.decrease(dec);
            // current rate value is by default 1
            expect(bar.getValue()).to.equal(min);
        });

    });

});
