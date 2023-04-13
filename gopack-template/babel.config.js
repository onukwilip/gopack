const gopackConfig = require("./gopack.config");

// FUNCTION TO CHECK IF A LIBRARY EXISTS
const validateLibrary = (string) =>
  gopackConfig?.libraries?.includes(string) ||
  gopackConfig?.libraries?.find((library) => library?.name === string);

// PROPERTIES OF ALL SUPPORTED LIBRARIES
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
    const libraryName = library?.name || library;
    if (!supportedLibraries[libraryName]) continue;
    if (!supportedLibraries[libraryName][key]) continue;
    properties.push(supportedLibraries[libraryName][key]);
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
