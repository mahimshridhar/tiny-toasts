const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "tiny-toasts.js",
      library: {
        name: "tinyToasts",
        type: "umd",
        export: "default",
      },
      globalObject: "this",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: isDev
      ? [
          new HtmlWebpackPlugin({
            template: "./demo.html",
          }),
        ]
      : [],
    devServer: {
      static: "./dist",
      hot: true,
      port: 3000,
    },
  };
};
