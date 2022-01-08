const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";
if (process.env.NODE_ENV === "production") {mode = "production";}
console.log("mode " + mode);
console.log("NODE_ENV  " + process.env.NODE_ENV);


module.exports = {
  mode: mode,
  entry: {
    index: resolve(__dirname, "./src/script/index.js"),
    module: resolve(__dirname, "./src/script/module.js"),
  },
  output: {
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[hash][ext][query]",
    path: resolve(__dirname, "./dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: join(__dirname, "src"),
    },
    compress: true,
    port: 8080,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    alias: {
      "@module": resolve(__dirname, "src/assets/module"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};
