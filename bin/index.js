#! /usr/bin/env node

const { execSync } = require("child_process");
const { readFileSync } = require("fs");
const yargs = require("yargs");

const run = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute command '${command}'`, e);
    process.exit(-1);
  }
};

// console.log(yargs.argv);

const args = yargs.argv._;

if (!Array.isArray(args) || args?.length < 1) {
  throw new Error(
    "Please specify an argument either 'start', 'serve' or 'build' "
  );
}

const checkIfGoConfigFileExists = () => {
  readFileSync("./../../../gopack.config.js", (error) => {
    if (error) {
      console.log(
        "Please add a gopack.config.js file to your project's root folder",
        error
      );
      throw new Error(error);
    }
  });
};

checkIfGoConfigFileExists();

if (args[0] === "start") {
  run("webpack && webpack serve");
}
