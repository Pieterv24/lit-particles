```js script
import { html } from '@open-wc/demoing-storybook';
import '../lit-particles-js.js';

export default {
  title: 'LitParticlesJs',
  component: 'lit-particles-js',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# LitParticlesJs

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add lit-particles-js
```

```js
import 'lit-particles-js/lit-particles-js.js';
```

```js preview-story
export const Simple = () => html`
  <lit-particles-js></lit-particles-js>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <lit-particles-js title="Hello World"></lit-particles-js>
`;
```
