[![npm version](https://badge.fury.io/js/lit-particles.svg)](https://badge.fury.io/js/lit-particles)
# \<lit-particles>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i lit-particles-js
```

## Usage
### in index.html
```html
  <lit-particles options='{
    "maxParticles": 200,
    <desired options>
  }'></lit-particles>

  <script type="module">
    import 'lit-particles/lit-particles.js';
  </script>
```
```
NOTE: when using an attribute the value in options should be in proper json format
```

### in lit-elements component
```js
  import { html, LitElement } from 'lit-element';
  import 'lit-particles/lit-particles.js';

  const options = {
    maxParticles: 200,
    color: ["#FF0000", "#00FF00", "#0000FF"]
  }

  class ExampleComponent extends LitElement {
    render() {
      return html`
        <lit-particles .options="${options}"></lit-particles>
      `;
    }
  }
```
```
NOTE: when passing an object directly into the options property a '.' should be appendend to the attribute.
```

### other frameworks
Importing the following should register the custom component.
```js
import 'lit-particles/lit-particles.js;
```
Afterward, you should be able to use it by using the custom tags.
```html
<lit-particles></lit-paritcles>
```
The options can either be handled with the data-binding method of the framework or by using attributes.  
For more information about properties and attributes read [this](https://lit-element.polymer-project.org/guide/properties).

## Configuration
```js
const defaultOptions = {
  // The amount of particles {Number}
  maxParticles: 150,
  // The size of the particles {Number}
  size: 2,
  // Whether to draw the particles on the canvas {Boolean}
  showParticles: true,
  // The speed with which the particles move {Number}
  speed: 1,
  // The color(s) of the particles {Array.<String>, String}
  // This can either be a single color, or an array of colors
  color: '#000000',
  // The minimum distance particles should be from eachother before a line between them is created {Number}
  minDistance: 120,
  // Whether the particles will be connected with lines
  connectParticles: true,
};
```

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```
