/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

// JavaScript implementations of various pseudorandom  umber generators
// https://github.com/bryc/code/blob/master/jshash/PRNGs.md

/** Hash function for generating hashes to be used as seeds in pseudorandom number generators (PRNG).
 *
 * @param {string} str
 *
 * Example:
 * ```
 * var seed = xmur3("apples");
 * var rand = sfc32(seed(), seed(), seed(), seed());
 * rand();
 * rand();
 * ```
 *
 * @returns new "random" 32-bit hash value each time
 */
const xmur3 = (str) => {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i = i + 1) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    return () => {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        h = h ^ h >>> 16;
        return h >>> 0;
    };
};

const TWO_POW_32 = 2 ** 32;

// https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
const mulberry32 = (a) => () => {
    a = a | 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / TWO_POW_32;
};

const sfc32 = (a, b, c, d) => () => {
    a = a | 0;
    b = b | 0;
    c = c | 0;
    d = d | 0;
    const t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21) | (c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / TWO_POW_32;
};

// https://prng.di.unimi.it/
// https://vigna.di.unimi.it/ftp/papers/ScrambledLinear.pdf
const xoshiro128ss = (a, b, c, d) => () => {
    const t = b << 9;
    let r = a * 5;
    r = ((r << 7) | (r >>> 25)) * 9;
    c = c ^ a;
    d = d ^ b;
    b = b ^ c;
    a = a ^ d;
    c = c ^ t;
    d = (d << 11) | (d >>> 21);
    return (r >>> 0) / TWO_POW_32;
};

export {
    mulberry32,
    sfc32,
    xoshiro128ss,
    xmur3
};
