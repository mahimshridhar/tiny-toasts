const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [
  {
    mode: "production",
    entry: "./src/index.ts",
    resolve: { extensions: [".ts", ".js"] },
    module: {
      rules: [
        { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "tiny-toasts.umd.js",
      library: {
        name: "tinyToasts",
        type: "umd",
        export: "default",
      },
      globalObject: "this",
    },
  },
  {
    mode: "production",
    entry: "./src/index.ts",
    resolve: { extensions: [".ts", ".js"] },
    module: {
      rules: [
        { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: "tiny-toasts.css" })],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "tiny-toasts.esm.js",
      library: { type: "module" },
    },
    experiments: { outputModule: true },
  },
];
