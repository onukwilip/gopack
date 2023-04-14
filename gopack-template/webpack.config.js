const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const gopackConfig = require("./gopack.config");

// FUNCTION TO CHECK IF A LIBRARY EXISTS
const validateLibrary = (string) =>
  gopackConfig?.libraries?.includes(string) ||
  gopackConfig?.libraries?.find((library) => library?.name === string);

// OPTIONAL LIBRARIES IMPORTS
const librariesRequires = {
  react: {
    ReactRefreshPlugin: validateLibrary("react")
      ? require("@pmmmwh/react-refresh-webpack-plugin")
      : undefined,
  },
  vue: {
    vueLoader: validateLibrary("vue") ? require("vue-loader") : undefined,
  },
};

//MODE
let mode = "development";
// REACT REFRESH
let reactRefresh = librariesRequires.react.ReactRefreshPlugin
  ? [new librariesRequires.react.ReactRefreshPlugin()]
  : [];
// COPY WEBPACK PLUGIN
const copyWebpackPlugin = gopackConfig?.copy
  ? [new CopyPlugin(gopackConfig?.copy)]
  : [];
let miniCssExtractPlugin = [];
let classLoader = "style-loader";
// HTML PLUGINS
const htmlPlugins =
  typeof gopackConfig?.pages === "object"
    ? gopackConfig?.pages?.map((page) => new HTMLWebpackPlugin(page))
    : [];
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

// VALIDATE LIBRARIES

// PROPERTIES OF ALL SUPPORTED LIBRARIES
const supportedLibraries = {
  // JAVASCRIPT AND REACT COMPATIBILTY
  react: {
    loader: {
      test: /\.(jsx)$/,
      exclude: /node_modules/,
      use: [{ loader: "babel-loader" }],
    },
    extension: ".jsx",
    plugin: reactRefresh[0],
  },
  // TYPESCRIPT AND REACT COMPATIBILTY
  typescript: {
    loader: {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
    },
    extension: [".ts", ".tsx"],
  },
  // VUEJS COMPATIBILTY
  vue: {
    loader: {
      test: /\.vue$/,
      use: ["vue-loader"],
    },
    extension: ".vue",
    plugin: librariesRequires.vue.vueLoader
      ? new librariesRequires.vue.vueLoader.VueLoaderPlugin()
      : undefined,
  },
  // ANGULAR COMPATIBILTY
  angular: {
    plugin: new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.join(
        __dirname,
        gopackConfig?.libraries?.find((lib) => lib.name === "angular")?.src ||
          "./src"
      ),
      {}
    ),
  },
  // PUG COMPATIBILTY
  pug: {
    loader: {
      test: /\.pug$/,
      use: ["pug-loader"],
    },
  },
  // HANDLE BARS COMPATIBILTY
  hbs: {
    loader: {
      test: /\.hbs$/,
      use: [
        {
          loader: "handlebars-loader",
          query: {
            inlineRequires: `/${gopackConfig?.assetsFolder || "images"}/`,
          },
        },
      ],
    },
  },
};
// GET A LIST OF PROPERTIES OF ALL SUPPORTED LIBRARIES
const getSupportedLibrariesProperties = (key) => {
  if (!gopackConfig?.libraries) return [];

  const properties = [];
  for (const library of gopackConfig?.libraries) {
    const libraryName = library?.name || library;
    if (!supportedLibraries[libraryName]) continue;
    if (!supportedLibraries[libraryName][key]) continue;
    properties.push(supportedLibraries[libraryName][key]);
  }

  return properties;
};
// PARSE ARRAY OF EXTENSIONS RETURNED BY THE `getSupportedLibrariesProperties` FUNCTION
const parseSupportedExtensionsArray = () => {
  const extensions = [...getSupportedLibrariesProperties("extension")];
  if (!extensions) return [];
  const parsedExtensions = [];

  for (ext of extensions) {
    if (Array.isArray(ext)) {
      ext.forEach((extString) => parsedExtensions.push(extString));
      continue;
    }
    parsedExtensions.push(ext);
  }
  return parsedExtensions;
};

//OPTIONS

//ENTRY
const entry = gopackConfig?.entry || `./src/index.js`;
//OUTPUT
const output = {
  filename: gopackConfig?.entry
    ? gopackConfig?.outputFilenameFormat || "[name].bundle.js"
    : gopackConfig?.outputFilename || "bundle.js",
  path: path.resolve(gopackConfig?.outputFolder || "public"),
  assetModuleFilename: `${gopackConfig?.assetsFolder || "images"}/${
    gopackConfig?.outputImageNameFormat || "[name][ext][query]"
  }`,
  clean: true,
};
//DEV SERVER
const devServer = {
  static: path.resolve("public"),
  ...(validateLibrary("angular") ? { historyApiFallback: true } : {}),
  hot: true,
};
//DEV TOOL
const devtool = gopackConfig?.devtool || false;
//EXTENSIONS
const extensions = [".js", ...parseSupportedExtensionsArray()];
//RESOLVE
const resolve = {
  extensions: extensions,
  alias: {
    ...(validateLibrary("vue") ? { vue$: "vue/dist/vue.esm.js" } : {}),
  },
};
//RULES
const rules = [
  // JAVASCRIPT COMPATIBILTY/LOADERS
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: [{ loader: "babel-loader" }],
  },
  // CSS, SCSS, SASS AND STYLES COMPATIBILTY/LOADERS
  {
    test: /\.(sa|sc|c)ss$/,
    use: [classLoader, "css-loader", "postcss-loader", "sass-loader"],
  },
  // ASSETS AND FILES COMPATIBILTY/LOADERS
  {
    test: /\.(png|jpe?g|svg|pdf)$/,
    type: "asset/resource",
  },
  // HTML COMPATIBILTY/LOADERS
  {
    test: /\.html?$/,
    use: ["html-loader"],
  },
  // GET ALL SUPPORTED LIBRARY LOADERS
  ...getSupportedLibrariesProperties("loader"),
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
  ...webpackProvidePlugin,
  ...copyWebpackPlugin,
  ...getSupportedLibrariesProperties("plugin"),
];
// TARGET
const target = gopackConfig?.target || "browserslist";
// NODE
const node = gopackConfig?.node ? { node: gopackConfig.node } : {};

module.exports = {
  mode: mode,
  entry: entry,
  output: output,
  devServer: devServer,
  devtool: devtool,
  resolve: resolve,
  module: _module,
  plugins: plugins,
  target: target,
  ...node,
};
