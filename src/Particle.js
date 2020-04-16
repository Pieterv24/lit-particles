export class Particle {
  /** @type {Number} */
  speed;
  /** @type {String} */
  color;
  /** @type {CanvasRenderingContext2D} */
  context;
  /** @type {Number} */
  x;
  /** @type {Number} */
  y;
  /** @type {Number} */
  vx;
  /** @type {Number} */
  vy;
  /** @type {Number} */
  radius;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {import('./ParticleOptions.js').ParticleOptions} options
   */
  constructor(canvas, options) {
    this.speed = options.speed;
    this.color =
      options.color instanceof Array ? this._selectRandomColor(options.color) : options.color;
    this.context = canvas.getContext('2d');

    this.x = canvas.offsetParent
      ? Math.random() * canvas.offsetParent.clientWidth
      : Math.random() * canvas.clientWidth;
    this.y = canvas.offsetParent
      ? Math.random() * canvas.offsetParent.clientHeight
      : Math.random() * canvas.clientHeight;

    this.vx = Math.random() * this.speed * 2 - this.speed;
    this.vy = Math.random() * this.speed * 2 - this.speed;
    this.radius = options.size;

    this.draw();
  }

  /**
   * Selects a random color from an array with colors
   * @param {Array.<String>} colors
   * @returns {String} color
   * @static
   * @private
   */
  static _selectRandomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * draw particle
   * @public
   */
  draw() {
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.moveTo(0, 0);
    this.context.beginPath();
    this.context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.restore();
  }

  /**
   * Move particle a new position for the next frame
   * @param {Number} parentWidth
   * @param {Number} parentHeight
   */
  updateCoordinates(parentWidth, parentHeight) {
    let x = this.x + this.vx;
    let y = this.y + this.vy;

    if (x + this.radius > parentWidth) {
      x = this.radius;
    } else if (x - this.radius < 0) {
      x = parentWidth - this.radius;
    }

    if (y + this.radius > parentHeight) {
      y = this.radius;
    } else if (y - this.radius < 0) {
      y = parentHeight - this.radius;
    }

    this.x = x;
    this.y = y;
  }
}
