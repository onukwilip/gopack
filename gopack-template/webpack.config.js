const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const gopackConfig = require("./gopack.config");

//MODE
let mode = "development";
// REACT REFRESH
let reactRefresh = [new ReactRefreshPlugin()];
let miniCssExtractPlugin = [];
let classLoader = "style-loader";
// HTML PLUGINS
const htmlPlugins =
  typeof gopackConfig?.pages === "object"
    ? gopackConfig?.pages?.map((page) => new HTMLWebpackPlugin(page))
    : [
        new HTMLWebpackPlugin({
          template: path.resolve("./src/index.html"),
        }),
      ];
// WEBPACK.PROVIDEPLUGIN
const webpackProvidePlugin = gopackConfig?.mapPlugins
  ? [webpack.ProvidePlugin(gopackConfig?.mapPlugins)]
  : [];
// IF GOPACK.GENERATECSSFILES===TRUE
if (gopackConfig?.generateCSSFiles) {
  miniCssExtractPlugin = [new MiniCSSExtractPlugin()];
  classLoader = MiniCSSExtractPlugin.loader;
}

// IF MODE===PRODUCTION
if (process.env.MODE === "production") {
  mode = process.env.MODE;
  reactRefresh = [];
}

//OPTIONS

//ENTRY
const entry = gopackConfig?.entry || `./src/index.js`;
//OUTPUT
const output = {
  filename: gopackConfig?.entry
    ? gopackConfig?.outputFilenameFormat || "[name].bundle.js"
    : gopackConfig?.outputFilename || "bundle.js",
  path: path.resolve(gopackConfig?.outputFolder || "public"),
  assetModuleFilename: `${
    gopackConfig?.assetsFolder || "images"
  }/[hash][ext][query]`,
  clean: true,
};
//DEV SERVER
const devServer = {
  static: path.resolve("public"),
  hot: true,
};
//DEV TOOL
const devtool = gopackConfig?.devtool || false;
//EXTENSIONS
const extensions = [".js", ".ts", ".jsx", ".tsx"];
//RESOLVE
const resolve = {
  extensions: extensions,
};
//RULES
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{ loader: "babel-loader" }],
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [classLoader, "css-loader", "postcss-loader", "sass-loader"],
  },
  {
    test: /\.(png|jpe?g|svg|pdf)$/,
    type: "asset/resource",
  },
  {
    test: /\.html?$/,
    use: ["html-loader"],
  },
];
//MODULE
const _module = {
  rules: rules,
};
//PLUGINS
const plugins = [
  new webpack.ProgressPlugin(),
  ...miniCssExtractPlugin,
  ...htmlPlugins,
  ...reactRefresh,
  ...webpackProvidePlugin,
];

module.exports = {
  mode: mode,
  entry: entry,
  output: output,
  devServer: devServer,
  devtool: devtool,
  resolve: resolve,
  module: _module,
  plugins: plugins,
};
