const gopackConfig = require("./gopack.config");

// FUNCTION TO CHECK IF A LIBRARY EXISTS
const validateLibrary = (string) => gopackConfig?.libraries?.includes(string);

const supportedLibraries = {
  // JAVASCRIPT AND REACT COMPATIBILTY
  react: {
    preset: ["@babel/preset-react", { runtime: "automatic" }],
    plugins: process.env.MODE === "production" ? null : "react-refresh/babel",
  },
};

// GET A LIST OF PROPERTIES OF ALL SUPPORTED LIBRARIES
const getSupportedLibrariesProperties = (key) => {
  if (!gopackConfig?.libraries) return [];

  const properties = [];
  for (const library of gopackConfig?.libraries) {
    if (!supportedLibraries[library]) continue;
    if (!supportedLibraries[library][key]) continue;
    properties.push(supportedLibraries[library][key]);
  }

  return properties;
};

module.exports = {
  presets: [
    gopackConfig?.useCoreJs
      ? [
          "@babel/preset-env",
          { useBuiltIns: "usage", corejs: "3.8", debug: false },
        ]
      : "@babel/preset-env",
    ...getSupportedLibrariesProperties("preset"),
  ],
  plugins: [...getSupportedLibrariesProperties("plugins")],
};
