import Behaviour from "../../src/simulation/core/Behaviour.js";
import Value from "../../src/simulation/core/Value.js";
import Bar from "../../src/simulation/core/Bar.js";
import Trait from "../../src/simulation/core/Trait.js";
import { round } from "../../src/utilities/math.js";

describe("Test Value class", () => {

    describe("Test Value class with correct parameters", () => {
        it("After instantiation the object's properties are all of type number.", () => {
            const value = new Value({ min: 0, now: 100, max: 200 });
            expect(value.minimum).to.be.a("number");
            expect(value.current).to.be.a("number");
            expect(value.maximum).to.be.a("number");
        });
        it("After instantiation the values of the passed parameters have not changed.", () => {
            const min = 0;
            const now = 100;
            const max = 200;
            const value = new Value({ min, now, max });

            expect(value.minimum).to.equal(min);
            expect(value.current).to.equal(now);
            expect(value.maximum).to.equal(max);
        });
    });

    describe("Test Value class with missing or wrong parameters", () => {

        it("The attributes should be set to the default values if the parameters are omitted", () => {
            const value = new Value({ min: "0", now: {}, max: false });
            expect(value.minimum).to.be.a("number");
            expect(value.current).to.be.a("number");
            expect(value.maximum).to.be.a("number");
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
        });

        it("The attributes should be set to the default values if wrong parameters used", () => {
            const value = new Value({ min: "0", now: {}, max: false });
            expect(value.minimum).to.be.a("number");
            expect(value.current).to.be.a("number");
            expect(value.maximum).to.be.a("number");
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
        });
    });

    describe("Setting the attributes after instantiation", () => {

        it("Correct values (no auto correction)", () => {
            const value = new Value();
            value.minimum = 50;
            value.current = 75;
            value.maximum = 100;
            expect(value.minimum).to.equal(50);
            expect(value.current).to.equal(75);
            expect(value.maximum).to.equal(100);
        });

        describe("\"Wrong\" numbers used, expect auto corrections", () => {
            it("If \"now\" is lower \"min\", it will not be reset.", () => {
                const min = 50;
                const now = 20;
                const value = new Value();
                value.minimum = min;
                value.current = now;

                expect(now).to.be.below(min);
                expect(value.current).to.not.equal(now);
            });
            it("If \"now\" is greater \"max\", it will not be reset.", () => {
                const max = 100;
                const now = 150;
                const value = new Value();
                value.maximum = max;
                value.current = now;

                expect(now).to.above(max);
                expect(value.current).to.not.equal(now);
            });
            it("If \"min\" is set and \"now\" is lower \"min\", \"now\" will be reset to new lower bound.", () => {
                const min = 100;
                const now = 50;
                const value = new Value();
                value.current = now;
                value.minimum = min;

                expect(now).to.be.below(min);
                expect(value.current).to.equal(value.minimum);
            });
            it("If \"max\" is set and \"now\" is greater \"max\", \"now\" will be reset to new upper bound.", () => {
                const max = 100;
                const now = 150;
                const value = new Value();
                value.current = now;
                value.maximum = max;

                expect(now).to.above(max);
                expect(value.current).to.be.equal(value.maximum);
            });
        });

    });

});

describe("Test Behaviour class", () => {

    it("Correct attributes contain the same values as the passed parameters", () => {
        const id = "age";
        const type = Behaviour.Type.BAR;
        const name = "Age";
        const description = "How many seconds the agents has already survived.";
        const behaviour = new Behaviour({ id, type, name, description });

        expect(behaviour).to.have.property("getId");
        expect(behaviour).to.have.property("getType");
        expect(behaviour).to.have.property("getName");
        expect(behaviour).to.have.property("getDescription");

        expect(behaviour.getId()).to.equal(id);
        expect(behaviour.getType()).to.equal(type);
        expect(behaviour.getName()).to.equal(name);
        expect(behaviour.getDescription()).to.equal(description);
    });

    it("Parameter \"id\" is required. If omitted an error is thrown", () => {
        expect(() => new Behaviour()).to.throw();
        expect(() => new Behaviour({ id: "Test" })).not.to.throw();
    });

});

describe("Test Trait class", () => {

    describe("Test instantiation", () => {
        it("With all correct (not default) parameters", () => {
            const id = "speed";
            const name = "Speed";
            const description = "How fast an agent can move";
            const value = { min: 0, now: 20, max: 100 };
            const base = 50;

            const trait = new Trait({ id, name, description, value, base });

            expect(trait).to.have.property("getId");
            expect(trait).to.have.property("getType");
            expect(trait).to.have.property("getName");
            expect(trait).to.have.property("getDescription");
            expect(trait).to.have.property("getValue");

            expect(trait.getId()).to.equal(id);
            expect(trait.getType()).to.equal(Behaviour.Type.TRAIT);
            expect(trait.getName()).to.equal(name);
            expect(trait.getDescription()).to.equal(description);

            expect(trait.getValue()).to.equal(value.now * base);
        });

        it("With without parameters (except for id)", () => {
            const id = "speed";
            const trait = new Trait({ id });

            expect(trait).to.have.property("getId");
            expect(trait).to.have.property("getType");
            expect(trait).to.have.property("getName");
            expect(trait).to.have.property("getDescription");
            expect(trait).to.have.property("getValue");

            expect(trait.getId()).to.equal(id);
            expect(trait.getType()).to.equal(Behaviour.Type.TRAIT);
            expect(trait.getName()).to.equal("");
            expect(trait.getDescription()).to.equal("");

            expect(trait.getValue()).to.equal(Value.MAX * Trait.BASE_DEFAULT);
        });

        it("With wrong parameters (except id)", () => {
            const id = "speed";
            const name = [2, 3];
            const description = { a: "test" };
            const value = { min: "0", now: Symbol("20"), max: false };
            const base = { min: null, now: true, max: undefined };

            const trait = new Trait({ id, name, description, value, base });

            expect(trait).to.have.property("getId");
            expect(trait).to.have.property("getType");
            expect(trait).to.have.property("getName");
            expect(trait).to.have.property("getDescription");
            expect(trait).to.have.property("getValue");

            expect(trait.getId()).to.equal(id);
            expect(trait.getType()).to.equal(Behaviour.Type.TRAIT);
            expect(trait.getName()).to.equal("");
            expect(trait.getDescription()).to.equal("");

            expect(trait.getValue()).to.equal(Value.MAX * Trait.BASE_DEFAULT);
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

            expect(bar).to.have.property("getId");
            expect(bar).to.have.property("getType");
            expect(bar).to.have.property("getName");
            expect(bar).to.have.property("getDescription");
            expect(bar).to.have.property("getValue");
            expect(bar).to.have.property("increase");
            expect(bar).to.have.property("decrease");

            expect(bar.getId()).to.equal(id);
            expect(bar.getType()).to.equal(Behaviour.Type.BAR);
            expect(bar.getName()).to.equal(name);
            expect(bar.getDescription()).to.equal(description);

            expect(bar.getValue()).to.equal(value.now);
        });

        it("Without parameters (except for id)", () => {
            const id = "age";
            const bar = new Bar({ id });

            expect(bar).to.have.property("getId");
            expect(bar).to.have.property("getType");
            expect(bar).to.have.property("getName");
            expect(bar).to.have.property("getDescription");
            expect(bar).to.have.property("getValue");
            expect(bar).to.have.property("increase");
            expect(bar).to.have.property("decrease");

            expect(bar.getId()).to.equal(id);
            expect(bar.getType()).to.equal(Behaviour.Type.BAR);
            expect(bar.getName()).to.equal("");
            expect(bar.getDescription()).to.equal("");

            expect(bar.getValue()).to.equal(Value.MAX);
        });

        it("With wrong parameters (except id)", () => {
            const id = "age";
            const name = [2, 3];
            const description = { a: "test" };
            const value = { min: "0", now: Symbol("20"), max: false };
            const rate = { min: null, now: true, max: undefined };

            const bar = new Bar({ id, name, description, value, rate });

            expect(bar).to.have.property("getId");
            expect(bar).to.have.property("getType");
            expect(bar).to.have.property("getName");
            expect(bar).to.have.property("getDescription");
            expect(bar).to.have.property("getValue");
            expect(bar).to.have.property("increase");
            expect(bar).to.have.property("decrease");

            expect(bar.getId()).to.equal(id);
            expect(bar.getType()).to.equal(Behaviour.Type.BAR);
            expect(bar.getName()).to.equal("");
            expect(bar.getDescription()).to.equal("");

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
