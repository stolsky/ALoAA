import {
    mulberry32,
    sfc32,
    xoshiro128ss,
    xmur3
} from "../src/utilities/prng.js";

const testSize = 1000000;
function test(method) {

    const diversity = new Set();
    const timestamp = performance.now();
    for (let i = 0; i < testSize; i = i + 1) {
        diversity.add(method());
    }
    console.log(`time: ${performance.now() - timestamp}ms, diversity: ${diversity.size}`);
    // console.log(JSON.stringify([...diversity.values()]));
}

const seed = xmur3("apples");
console.log(seed());

const rand1 = mulberry32(seed());
const rand2 = sfc32(seed(), seed(), seed(), seed());
const rand3 = xoshiro128ss(seed(), seed(), seed(), seed());

test(rand1);
test(rand2);
test(rand3);
