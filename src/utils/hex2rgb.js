/**
 * @typedef {Object} rgbValue
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 */

/**
 * Get RGB value of a hex color
 * @param {String} hex
 * @returns {rgbValue} rgb
 */
export const hex2rgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
