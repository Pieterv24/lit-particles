import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'lit-particles.js',
  output: {
    file: 'dist/lit-particles.js',
    format: 'cjs',
  },
  plugins: [resolve()],
};
