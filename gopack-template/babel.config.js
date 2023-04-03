const gopackConfig = require("./gopack.config");

const reactRefresh =
  process.env.MODE === "production" ? [] : ["react-refresh/babel"];

module.exports = {
  presets: [
    gopackConfig?.useCoreJs
      ? [
          "@babel/preset-env",
          { useBuiltIns: "usage", corejs: "3.8", debug: false },
        ]
      : "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [...reactRefresh],
};
