/* eslint-disable no-unused-expressions */

import {
    add,
    heading,
    limit,
    magnitude,
    multiplyScalar,
    normalize,
    setMagnitude
} from "../../src/pixi-adapter/math.js";

describe("Test methods of math module of the Pixi.js adapter", () => {

    before("Test successful import and access PIXI library", () => {
        expect(add).to.be.a("function");
        cy.visit("dev").then((win) => {
            globalThis.PIXI = win.PIXI;
        });
    });

    describe("Test addition of two point", () => {

        it("Add two points with positive parameters", () => {
            const point1 = { x: 5, y: 5 };
            const point2 = { x: 3, y: 3 };
            const result = add(point1, point2);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");
            expect(result.x).to.equal(8);
            expect(result.y).to.equal(8);
        });

        it("Add point and neutral element", () => {
            const point1 = { x: 3, y: 4 };
            const point2 = { x: 0, y: 0 };
            const { x, y } = add(point1, point2);
            expect(x).to.equal(3);
            expect(y).to.equal(4);
        });

        it("Add point and inverse element", () => {
            const point1 = { x: 3, y: 4 };
            const point2 = { x: -3, y: -4 };
            const { x, y } = add(point1, point2);
            expect(x).to.equal(0);
            expect(y).to.equal(0);
        });

        it("Add points with negative parameters", () => {
            const point1 = { x: -5, y: 5 };
            const point2 = { x: 3, y: -3 };
            const { x, y } = add(point1, point2);
            expect(x).to.equal(-2);
            expect(y).to.equal(2);

        });

    });

    describe("Test scalar multiplication", () => {

        it("Test point with positive scalar", () => {
            const point = { x: 17, y: 5 };
            const result = multiplyScalar(point, 3);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");
            expect(result.x).to.equal(17 * 3);
            expect(result.y).to.equal(15);
        });

        it("Test point with neutral scalar", () => {
            const point = { x: 17, y: 5 };
            const { x, y } = multiplyScalar(point, 1);
            expect(x).to.equal(17);
            expect(y).to.equal(5);
        });

        it("Test point with inverse scalar", () => {
            const point = { x: 17, y: 5 };
            const { x, y } = multiplyScalar(point, -1);
            expect(x).to.equal(-17);
            expect(y).to.equal(-5);
        });

        it("Test point with null scalar", () => {
            const point = { x: 17, y: 5 };
            const { x, y } = multiplyScalar(point, 0);
            expect(x).to.equal(0);
            expect(y).to.equal(0);
        });

    });

    describe("Test use multiplyScalar for scalar division", () => {

        it("Test point with positive scalar", () => {
            const point = { x: 12, y: 8 };
            const result = multiplyScalar(point, 1 / 4);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");
            expect(result.x).to.equal(3);
            expect(result.y).to.equal(2);
        });

        it("Test point with inverse scalar", () => {
            const point = { x: 17, y: 5 };
            const { x, y } = multiplyScalar(point, 1 / -1);
            expect(x).to.equal(-17);
            expect(y).to.equal(-5);
        });

        it("Test point with null scalar", () => {
            const point = { x: 17, y: 5 };
            const zero = 0;
            const { x, y } = multiplyScalar(point, 0 / zero);
            expect(x).to.be.NaN;
            expect(y).to.be.NaN;
        });

    });

    describe("Test normalization", () => {

        it("Compare library method with implementation", () => {
            const point = { x: -4, y: 4 };
            const result = normalize(point);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");

            // implementation of normalization
            const mag = Math.sqrt(point.x * point.x + point.y * point.y);
            const normalized = multiplyScalar(point, 1 / mag);

            expect(result.x).to.equal(normalized.x);
            expect(result.y).to.equal(normalized.y);
        });

        it("normalize null point (0,0)", () => {
            const point = { x: 0, y: 0 };
            const result = normalize(point);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");

            expect(result.x).to.equal(0);
            expect(result.y).to.equal(0);
        });

        it("x != 0, y = 0", () => {
            const point = { x: 4, y: 0 };
            const result = normalize(point);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");

            // implementation of normalization
            const mag = Math.sqrt(point.x * point.x + point.y * point.y);
            const normalized = multiplyScalar(point, 1 / mag);

            expect(result.x).to.equal(normalized.x);
            expect(result.y).to.equal(normalized.y);
        });

        it("x = 0, y != 0", () => {
            const point = { x: 0, y: -4 };
            const result = normalize(point);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");

            // implementation of normalization
            const mag = Math.sqrt(point.x * point.x + point.y * point.y);
            const normalized = multiplyScalar(point, 1 / mag);

            expect(result.x).to.equal(normalized.x);
            expect(result.y).to.equal(normalized.y);
        });

    });

    describe("Test limit(ation) of point/vector", () => {

        it("Compare library method with implementation", () => {

            const point = { x: 10, y: 10 };
            const maximum = 5;
            const result = limit(point, maximum);
            expect(result).to.have.property("x");
            expect(result).to.have.property("y");

            // implementation of limitation
            const magnitudeSquared = point.x * point.x + point.y * point.y;
            let limited = null;
            if (magnitudeSquared > maximum * maximum) {
                const normalized = multiplyScalar(point, 1 / Math.sqrt(magnitudeSquared));
                console.log(normalized);
                limited = multiplyScalar(normalized, maximum);
            }
            expect(limited).to.have.property("x");
            expect(limited).to.have.property("y");

            expect(result.x).to.equal(limited.x);
            expect(result.y).to.equal(limited.y);
        });

        it("Length of point/vector is smaller than limit", () => {
            const point = { x: -5, y: 6 };
            const maximum = 10;
            const { x, y } = limit(point, maximum);
            expect(x).to.equal(-5);
            expect(y).to.equal(6);
        });

    });

    describe("Test heading (rotation) of point)", () => {

        it("x = 0 & y = 0 => 0", () => {
            const point = { x: 0, y: 0 };
            const result = heading(point);
            expect(result).to.equal(0);
        });

        it("x > 0 & y = 0 => 0", () => {
            const point1 = { x: 1, y: 0 };
            const result1 = heading(point1);
            expect(result1).to.equal(0);

            const point2 = { x: 4, y: 0 };
            const result2 = heading(point2);
            expect(result2).to.equal(0);
        });

        it("x < 0 & y = 0 => PI", () => {
            const point1 = { x: -1, y: 0 };
            const result1 = heading(point1);
            expect(result1).to.equal(Math.PI);

            const point2 = { x: -4, y: 0 };
            const result2 = heading(point2);
            expect(result2).to.equal(Math.PI);
        });

        it("x = 0 & y > 0 => PI/2", () => {
            const point1 = { x: 0, y: 1 };
            const result1 = heading(point1);
            expect(result1).to.equal(Math.PI / 2);

            const point2 = { x: 0, y: 4 };
            const result2 = heading(point2);
            expect(result2).to.equal(Math.PI / 2);
        });

        it("x = 0 & y < 0 => PI/2", () => {
            const point1 = { x: 0, y: -1 };
            const result1 = heading(point1);
            expect(result1).to.equal(Math.PI / -2);

            const point2 = { x: 0, y: -4 };
            const result2 = heading(point2);
            expect(result2).to.equal(Math.PI / -2);
        });

        it("x < 0 & y < 0 => PI * -3/4, -x = -y", () => {
            const point1 = { x: -1, y: -1 };
            const result1 = heading(point1);
            expect(result1).to.equal(Math.PI * (-3 / 4));

            const point2 = { x: -4, y: -4 };
            const result2 = heading(point2);
            expect(result2).to.equal(Math.PI * (-3 / 4));
        });

        it("x < 0 & y > 0 => PI * 3/4, -x = y", () => {
            const point1 = { x: -1, y: 1 };
            const result1 = heading(point1);
            expect(result1).to.equal(Math.PI * (3 / 4));

            const point2 = { x: -4, y: 4 };
            const result2 = heading(point2);
            expect(result2).to.equal(Math.PI * (3 / 4));
        });

        it("x > 0 & y < 0 => PI/4, x = -y", () => {
            const point1 = { x: 1, y: -1 };
            const result1 = heading(point1);
            expect(result1).to.equal(Math.PI / -4);

            const point2 = { x: 4, y: -4 };
            const result2 = heading(point2);
            expect(result2).to.equal(Math.PI / -4);
        });

        it("x > 0 & y > 0 => PI/4, x = y", () => {
            const point1 = { x: 1, y: 1 };
            const result1 = heading(point1);
            expect(result1).to.equal(Math.PI / 4);

            const point2 = { x: 4, y: 4 };
            const result2 = heading(point2);
            expect(result2).to.equal(Math.PI / 4);
        });

    });

    describe("Test setMagnitude", () => {

        it("x != 0, y != 0", () => {
            const point = { x: 5, y: 5 };
            const length = 10;
            const result = setMagnitude(point, length);

            expect(result).to.have.property("x");
            expect(result).to.have.property("y");

            // calculate magnitude by hand
            const norm = normalize(point);
            const mag = multiplyScalar(norm, length);

            expect(result.x).to.equal(mag.x);
            expect(result.y).to.equal(mag.y);

        });

        it("of null point (0, 0)", () => {
            const point = { x: 0, y: 0 };
            const length = 75;
            const result = setMagnitude(point, length);

            expect(result).to.have.property("x");
            expect(result).to.have.property("y");

            const norm = normalize(point);
            const mag = multiplyScalar(norm, length);

            expect(result.x).to.equal(mag.x);
            expect(result.y).to.equal(mag.y);

        });

    });

    describe("Test calculate magnitude", () => {

        it("calculate normal point (5, 3) ", () => {
            const point = { x: 5, y: 3 };
            const result = magnitude(point);

            // calculate magnitude by hand
            const magSq = point.x * point.x + point.y * point.y;
            const mag = Math.sqrt(magSq);

            expect(result).to.equal(mag);
        });

        it("calculate normal point (0, 3) ", () => {
            const point = { x: 0, y: 3 };
            const result = magnitude(point);

            expect(result).to.equal(3);
        });

        it("calculate normal point (5, 0) ", () => {
            const point = { x: 5, y: 0 };
            const result = magnitude(point);

            expect(result).to.equal(5);
        });

        it("calculate normal point (0, 0) ", () => {
            const point = { x: 0, y: 0 };
            const result = magnitude(point);

            expect(result).to.equal(0);
        });

    });

});
