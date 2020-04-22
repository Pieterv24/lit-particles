/**
 * @typedef ParticleOptions
 *
 * @property {Number} maxParticles - The amount of particles that will be shown on the canva
 * @property {Number} size - The size of the particles
 * @property {Boolean} showParticles - Whether to draw the particles on the canvas
 * @property {Number} speed - The speed of the particles
 * @property {Array.<String>|String} color - The color or list of colors the particles will use
 * @property {Boolean} connectParticles - Whether to connect the particles with lines
 * @property {Number} minDistance - The minimum distance particles should be from eachother before a line is drawn between them
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
