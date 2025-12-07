const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, argv) => {
  const isDev = argv.mode === "development";

  const baseConfig = {
    entry: "./src/index.ts",
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
          use: isDev
            ? ["style-loader", "css-loader"]
            : [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: isDev
      ? [
          new HtmlWebpackPlugin({
            template: "./demo.html",
          }),
        ]
      : [new MiniCssExtractPlugin({ filename: "tiny-toasts.css" })],
  };

  return [
    {
      ...baseConfig,
      devServer: {
        static: "./dist",
        hot: true,
        port: 3000,
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
      ...baseConfig,
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "tiny-toasts.esm.js",
        library: {
          type: "module",
        },
      },
      experiments: {
        outputModule: true,
      },
    },
  ];
};
