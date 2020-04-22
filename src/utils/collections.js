/**
 * sort particles based on how close they are together
 * @param {Particle} p1
 * @param {Particle} p2
 * @returns {Number} result
 */
export const particleCompareFunc = (p1, p2) => {
  if (p1.x < p2.x) {
    return -1;
  } else if (p1.x > p2.x) {
    return 1;
  } else if (p1.y < p2.y) {
    return -1;
  } else if (p1.y > p2.y) {
    return 1;
  }

  return 0;
};

/**
 * Selects a random item from an array with items
 * @param {Array} items
 * @returns {Any} random item
 */
export const selectRandomItem = items => items[Math.floor(Math.random() * items.length)];
