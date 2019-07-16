import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "./src/index.js",
    output: {
      name: "vuexPluginLoading",
      file: pkg.browser,
      format: "umd",
      sourcemap: "inline"
    },
    plugins: [resolve(), babel({ exclude: "node_modules/**" })]
  },
  {
    input: "./src/index.js",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: "inline" },
      { file: pkg.module, format: "es", sourcemap: "inline" }
    ]
  }
];
