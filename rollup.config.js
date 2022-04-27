import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
export default {
  input: ["./src/index.js"],
  output: {
    file: "dist/vue.js",
    format: "umd",
    name: "Vue",
    sourcemap: true
  },
  plugins: [resolve(), commonjs(), babel()],
};