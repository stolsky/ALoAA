import {
    sfc32,
    xmur3,
    xoshiro128ss
} from "../../src/utilities/prng.js";

import {
    gauss,
    random,
    setSeed
} from "../../src/utilities/random.js";

describe("Test hash algorithm xmur3", () => {

    it("Result always a positive 32 bit number", () => {

        const seed = xmur3("ALoAA");
        let isNumber = false;
        let isGreaterZero = false;
        let isMax32Bit = false;
        let currentNumber = null;

        const MAX_SIZE = 2 ** 32;
        const testSize = 500_000;
        for (let i = 0; i < testSize; i = i + 1) {
            currentNumber = seed();
            isNumber = Number.isFinite(currentNumber);
            if (isNumber) {
                isGreaterZero = currentNumber > 0;
                isMax32Bit = currentNumber < MAX_SIZE;
                if (!isGreaterZero || !isMax32Bit) {
                    break;
                }
            } else {
                break;
            }
        }

        // eslint-disable-next-line no-unused-expressions
        expect(isNumber).to.be.true;
        // eslint-disable-next-line no-unused-expressions
        expect(isGreaterZero).to.be.true;
        // eslint-disable-next-line no-unused-expressions
        expect(isMax32Bit).to.be.true;

    });

    it("Create very different hashes, despite the seed is almost the same", () => {

        /** Calculates all permutations of a string.
         *
         * source: https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/stringPermutations.md
         * @param {string} str
         * @returns {Array<string>}
         */
        const stringPermutations = (str) => {
            if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
            return str.split("").reduce(
                (acc, letter, i) => acc.concat(
                    stringPermutations(str.slice(0, i) + str.slice(i + 1))
                        .map((val) => letter + val)
                ),
                []
            );
        };

        const phrase = "ALoAA";
        const seed = xmur3(phrase);

        const uniquePermutations = new Set();
        stringPermutations(phrase).forEach((permutation) => uniquePermutations.add(permutation));
        uniquePermutations.delete(phrase);

        let allPhrasesAreDifferent = true;
        let allHashesDifferGreatly = true;
        const hashDifference = 50_000_000;
        [...uniquePermutations].every((permutation) => {
            allPhrasesAreDifferent = phrase !== permutation;
            if (!allPhrasesAreDifferent) {
                return false;
            }
            const compareSeed = xmur3(permutation);
            if (Math.abs(seed() - compareSeed()) < hashDifference) {
                allHashesDifferGreatly = false;
                return false;
            }
            return true;

        });

        // eslint-disable-next-line no-unused-expressions
        expect(allPhrasesAreDifferent).to.be.true;
        // eslint-disable-next-line no-unused-expressions
        expect(allHashesDifferGreatly).to.be.true;

    });

});

describe("Test pseudorandom number generator for its uniform distribution", () => {

    it("Results of xoshiro128ss are on average between 0.4995 and 0.5005", () => {

        const seed = xmur3("ALoAA");
        const prng = xoshiro128ss(seed(), seed(), seed(), seed());

        const testSize = 500_000;
        let sum = 0;
        for (let i = 0; i < testSize; i = i + 1) {
            const rnd = prng();
            sum = sum + rnd;
        }

        sum = sum / testSize;
        expect(sum).to.be.within(0.4995, 0.5005);

    });

    it("Results of sfc32 are on average between 0.4995 and 0.5005", () => {

        const seed = xmur3("ALoAA");
        const prng = sfc32(seed(), seed(), seed(), seed());

        const testSize = 500_000;
        let sum = 0;
        for (let i = 0; i < testSize; i = i + 1) {
            const rnd = prng();
            sum = sum + rnd;
        }

        sum = sum / testSize;
        expect(sum).to.be.within(0.4995, 0.5005);

    });

});

describe("Test own wrapper of \"prng.js\"", () => {

    it("\"random()\" and its internal used \"xoshiro128ss()\" produce the same results.", () => {

        const phrase = "ALoAA";
        const seed = xmur3(phrase);
        const xoshiro = xoshiro128ss(seed(), seed(), seed(), seed());
        setSeed(phrase);

        let isSameResult = true;
        const testSize = 500000;
        for (let i = 0; i < testSize; i = i + 1) {
            const rand1 = xoshiro();
            const rand2 = random();
            if (rand1 !== rand2) {
                isSameResult = false;
                break;
            }
        }

        // eslint-disable-next-line no-unused-expressions
        expect(isSameResult).to.be.true;

    });

    it("\"gauss()\" generates a normal distribution (mean = 0, standard deviation = 1)", () => {

        const phrase = "ALoAA";
        setSeed(phrase);

        const testSize = 500_000;
        let sum = 0;
        for (let i = 0; i < testSize; i = i + 1) {
            const rnd = gauss();
            sum = sum + Math.abs(rnd);
        }

        const avg = sum / testSize;
        expect(avg).to.be.above(0.79);

    });

});
