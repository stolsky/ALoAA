/* globals PIXI */

/** Converts a hexadecimal number to a rgb color string.
 *
 * Example: hexToRGB(0xFF0000) returns "255,0,0"
 *
 * Explanation of PIXI.utils.hexToRGB
 * @see https://api.pixijs.io/@pixi/utils/PIXI/utils/hex2rgb.html
 *
 * @param {number} hex
 *
 * @returns {string} rgb string, like "255,100,0"
 */
const hexToRGB = (hex) => PIXI.utils.hex2rgb(hex).map((part) => part * 255).join(",");

export {
    hexToRGB
};
