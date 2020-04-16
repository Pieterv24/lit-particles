/**
 * @typedef ParticleOptions
 *
 * @property {Number} maxParticles
 * @property {Number} size
 * @property {Boolean} showParticles
 * @property {Number} speed
 * @property {Array.<String>|String} color
 * @property {Boolean} connectParticles
 */

export const defaultOptions = {
  maxParticles: 150,
  size: 2,
  showParticles: true,
  speed: 1,
  color: '#000000',
  minDistance: 120,
  connectParticles: true,
};
