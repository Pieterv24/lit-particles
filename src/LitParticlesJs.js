import { LitElement, html } from 'lit-element';

import { defaultOptions } from './ParticleOptions.js';
import { Particle } from './Particle.js';

export class LitParticlesJs extends LitElement {
  /** @type {Array.<Particle>} */
  storage;
  /** @type {import('./ParticleOptions.js').ParticleOptions} */
  options;
  /** @type {HTMLCanvasElement} */
  canvas;
  /** @type {CanvasRenderingContext2D} */
  context;

  static get properties() {
    return {
      options: {
        type: Object,
      },
    };
  }

  constructor() {
    super();

    this.options = defaultOptions;
  }

  firstUpdated() {
    this._animate = this._animate.bind(this);

    this._initializeCanvas();
    this._initializeStorage();

    this._animate();
  }

  render() {
    return html`
      <canvas></canvas>
    `;
  }

  /**
   * @private
   */
  _initializeCanvas() {
    this.canvas = this.shadowRoot.querySelector('canvas');
    this.context = this.canvas.getContext('2d');

    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio =
      this.context.webkitBackingStorePixelRatio ||
      this.context.mozBackingStorePixelRatio ||
      this.context.msBackingStorePixelRatio ||
      this.context.oBackingStorePixelRatio ||
      this.context.backingStorePixelRatio ||
      1;

    const ratio = devicePixelRatio / backingStoreRatio;

    this.canvas.width = this.canvas.offsetParent
      ? this.canvas.offsetParent.clientWidth * ratio
      : this.canvas.clientWidth * ratio;

    if (this.canvas.offsetParent && this.canvas.offsetParent.nodeName === 'BODY') {
      this.canvas.height = window.innerHeight * ratio;
    } else {
      this.canvas.height = this.canvas.offsetParent
        ? this.canvas.offsetParent.clientHeight * ratio
        : this.canvas.clientHeight * ratio;
    }

    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.context.scale(ratio, ratio);
  }

  /**
   * @private
   */
  _initializeStorage() {
    this.storage = [];

    for (let i = 0; i < this.options.maxParticles; i++) {
      this.storage.push(new Particle(this.canvas, this.options));
    }
  }

  /**
   * control animation cycle
   * @private
   */
  _animate() {
    this._draw();
    window.requestAnimationFrame(this._animate);
  }

  _draw() {
    const parentWidth = this.canvas.offsetParent
      ? this.canvas.offsetParent.clientWidth
      : this.canvas.clientWidth;
    const parentHeight = this.canvas.offsetParent
      ? this.canvas.offsetParent.clientHeight
      : this.canvas.clientHeight;
    const { showParticles } = this.options;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();

    for (let i = this.storage.length; i--; ) {
      const particle = this.storage[i];

      if (showParticles) {
        particle.draw();
      }

      particle.updateCoordinates(parentWidth, parentHeight);
    }

    if (this.options.connectParticles) {
      this.storage.sort(this._particleCompareFunc);
      this._updateEdges();
    }
  }

  /**
   * sort particles based on how close they are together
   * @param {Particle} p1
   * @param {Particle} p2
   * @private
   */
  _particleCompareFunc(p1, p2) {
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
  }

  /**
   * Calculate whether a line should be shown between particles
   * @private
   */
  _updateEdges() {
    const { minDistance } = this.options;
    const storageLength = this.storage.length;

    for (let i = 0; i < storageLength; i++) {
      const p1 = this.storage[i];

      for (let j = i + 1; j < storageLength; j++) {
        const p2 = this.storage[j];

        const r = p1.x - p2.x;
        const dy = p1.y - p2.y;

        const distance = Math.sqrt(r * r + dy * dy);

        if (Math.abs(r) > minDistance) {
          break;
        }

        if (distance <= minDistance) {
          this._drawEdge(p1, p2, 1.2 - distance / minDistance);
        }
      }
    }
  }

  /**
   * Draw line between 2 particles
   * @param {Particle} p1
   * @param {Particle} p2
   * @param {Number} opacity
   */
  _drawEdge(p1, p2, opacity) {
    const gradient = this.context.createLinearGradient(p1.x, p1.y, p2.x, p2.y);

    const c1 = this._hex2rgb(p1.color);
    const c2 = this._hex2rgb(p2.color);

    gradient.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${opacity})`);
    gradient.addColorStop(1, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${opacity})`);

    this.context.beginPath();
    this.context.strokeStyle = gradient;
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();
  }

  /**
   * Get RGB value of a hex color
   * @param {String} hex
   * @private
   */
  _hex2rgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
}
