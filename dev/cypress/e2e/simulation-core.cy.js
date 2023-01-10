import Value from "../../src/simulation/core/Value.js";
import { ClassType } from "../../src/simulation/core/Types.js";
import Bar from "../../src/simulation/core/Bar.js";
import Trait from "../../src/simulation/core/Trait.js";
import { round } from "../../src/utilities/math.js";

describe.only("Test Value class", () => {

    describe("Test instantiation", () => {
        it("With correct parameters", () => {
            const value = new Value({ min: 10, now: 40, max: 90 });
            expect(value).to.have.property("minimum");
            expect(value).to.have.property("current");
            expect(value).to.have.property("maximum");
            expect(value.minimum).to.be.a("number");
            expect(value.current).to.be.a("number");
            expect(value.maximum).to.be.a("number");
            expect(value.minimum).to.equal(10);
            expect(value.current).to.equal(40);
            expect(value.maximum).to.equal(90);
        });

        it("With no parameters, expect defaults to be used", () => {
            const value = new Value({});
            expect(value).to.have.property("minimum");
            expect(value).to.have.property("current");
            expect(value).to.have.property("maximum");
            expect(value.minimum).to.be.a("number");
            expect(value.current).to.be.a("number");
            expect(value.maximum).to.be.a("number");
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
        });

        it("With wrong parameters, expect defaults to be used", () => {
            const value = new Value({ min: "0", now: { now: 500 }, max: [1000] });
            expect(value).to.have.property("minimum");
            expect(value).to.have.property("current");
            expect(value).to.have.property("maximum");
            expect(value.minimum).to.be.a("number");
            expect(value.current).to.be.a("number");
            expect(value.maximum).to.be.a("number");
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
        });

    });

    describe("Chaning the Value", () => {

        it("Setting current Value inside borders", () => {
            const value = new Value();
            value.current = 50;
            expect(value.current).to.equal(50);
        });

        it("Setting current Value to MAX", () => {
            const value = new Value();
            const digit = Value.MAX;
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
            expect(digit).to.equal(Value.MAX);
            value.current = digit;
            expect(value.current).to.equal(digit);
            expect(value.maximum).to.equal(Value.MAX);
        });

        it("Setting current Value to MIN", () => {
            const value = new Value();
            const digit = Value.MIN;
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
            expect(digit).to.equal(Value.MIN);
            value.current = digit;
            expect(value.current).to.equal(digit);
            expect(value.minimum).to.equal(Value.MIN);
        });

        it("Setting current Value greater current maximum", () => {
            const maximum = 1000;
            const value = new Value({ max: maximum });
            const digit = 1010;
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(maximum);
            expect(value.maximum).to.equal(maximum);
            expect(digit).to.be.above(value.maximum);
            value.current = digit;
            expect(value.current).to.equal(maximum);
        });

        it("Setting current Value lower current minimum", () => {
            const minimum = 100;
            const value = new Value({ min: minimum });
            const digit = 10;
            expect(value.minimum).to.equal(minimum);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
            expect(digit).to.be.below(value.minimum);
            value.current = digit;
            expect(value.current).to.equal(minimum);
        });

        it("Setting current Value greater `Value.MAX`", () => {
            const value = new Value();
            const digit = Value.MAX + 1000;
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
            expect(digit).to.be.above(value.maximum);
            value.current = digit;
            expect(value.current).to.equal(Value.MAX);
        });

        it("Setting current Value lower `Value.MIN`", () => {
            const value = new Value();
            const digit = Value.MIN - 1000;
            expect(value.minimum).to.equal(Value.MIN);
            expect(value.current).to.equal(Value.MAX);
            expect(value.maximum).to.equal(Value.MAX);
            expect(digit).to.be.below(value.minimum);
            value.current = digit;
            expect(value.current).to.equal(Value.MIN);
        });

    });

    describe("Test mutation", () => {

        it("With default standard distribution (sd=1)", () => {
            const current = 50;
            const value = new Value({ min: 0, now: current, max: 100 });

            expect(value).to.have.property("mutate");
            const mutated = new Value(value.mutate());
            expect(mutated).to.have.property("minimum");
            expect(mutated).to.have.property("current");
            expect(mutated).to.have.property("maximum");
            expect(mutated).to.have.property("mutate");

            const stdDev = 1;
            expect(mutated.current).to.be.within(value.current - 5 * stdDev, value.current + 5 * stdDev);
            expect(mutated.current % 1).to.equal(0, "check for whole number with modulo 1");
        });

    });

});

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

    });

    describe("Test changing the value of the bar", () => {

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
