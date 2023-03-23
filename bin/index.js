#! /usr/bin/env node

// IMPORTS
const { execSync } = require("child_process");
const { readFileSync } = require("fs");
const yargs = require("yargs");
const inquirer = require("inquirer");
const { readFile, writeFile } = require("fs/promises");
const path = require("path");

// FUNCTIONS
const run = (command, options) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute command '${command}'`, e);
    if (options?.throw) throw new Error(e);
    process.exit(-1);
  }
};

// WRITE FILES FROM GOPACK-TEMPLATE FOLDER INTO PROJECT FOLDER
const writeFilesToProjectFolder = async () => {
  const filePath = `node_modules\\@go-pack\\gopack\\gopack-template\\`;

  // READ FILES FROM GOPACK-TEMPLATE FOLDER
  const packgeJson = await readFile(path.resolve(filePath, "package.json"));
  const webpackConfig = await readFile(
    path.resolve(filePath, "webpack.config.js")
  );
  const babelConfig = await readFile(path.resolve(filePath, "babel.config.js"));
  const postcssConfig = await readFile(
    path.resolve(filePath, "postcss.config.js")
  );
  const browserslistrc = await readFile(
    path.resolve(filePath, ".browserslistrc")
  );

  console.log("CREATING PACKAGE.JSON FILE");
  console.log("CREATING WEBPACK.CONFIG.JS FILE");
  console.log("CREATING POSTCSS.CONFIG.JS FILE");
  console.log("CREATING .BROWSERSLISTRC FILE");

  // WRITE FILES FROM GOPACK-TEMPLATE FOLDER INTO PROJECT FOLDER
  await writeFile("package.json", packgeJson).catch((e) => {
    console.log(`There was an error creating package.json file`);
    throw new Error(e);
  });
  await writeFile("webpack.config.js", webpackConfig).catch((e) => {
    console.log(`There was an error creating webpack.config.js file`);
    throw new Error(e);
  });
  await writeFile("babel.config.js", babelConfig).catch((e) => {
    console.log(`There was an error creating babel.config.js file`);
    throw new Error(e);
  });
  await writeFile("postcss.config.js", postcssConfig).catch((e) => {
    console.log(`There was an error creating postcss.config.js file`);
    throw new Error(e);
  });
  await writeFile(".browserslistrc", browserslistrc).catch((e) => {
    console.log(`There was an error creating .browserslistrc file`);
    throw new Error(e);
  });

  console.log("CREATED PACKAGE.JSON FILE SUCCESSFULLY");
  console.log("CREATED WEBPACK.CONFIG.JS FILE SUCCESSFULLY");
  console.log("CREATED POSTCSS.CONFIG.JS FILE SUCCESSFULLY");
  console.log("CREATED .BROWSERSLISTRC FILE SUCCESSFULLY");
};

// CHECK IF FILES TO BE CREATED ALREADY EXISTS INSIDE PROJECT FOLDER
const checkIfAnyOftheFilesExist = async () => {
  const packgeJson = await readFile(path.resolve("package.json")).catch(
    (e) => undefined
  );
  const webpackConfig = await readFile(path.resolve("webpack.config.js")).catch(
    (e) => undefined
  );
  const babelConfig = await readFile(path.resolve("babel.config.js")).catch(
    (e) => undefined
  );
  const postcssConfig = await readFile(path.resolve("postcss.config.js")).catch(
    (e) => undefined
  );
  const browserslistrc = await readFile(path.resolve(".browserslistrc")).catch(
    (e) => undefined
  );

  // IF ANY FILE EXISTS
  if (
    packgeJson ||
    webpackConfig ||
    babelConfig ||
    browserslistrc ||
    postcssConfig
  ) {
    const arr = [];
    arr.push(
      ["package.json", packgeJson],
      ["webpack.config.js", webpackConfig],
      ["babel.config.js", babelConfig],
      [".browserslistrc", browserslistrc],
      ["postcss.config.js", postcssConfig]
    );
    console.log(
      "These files already exists, they will be overwritten \n",
      arr
        .filter(([name, file]) => file !== undefined)
        ?.map(([name, value]) => name)
    );

    // INQUIRE IF PROCESS SHOULD OVERWRITE EXISTING FILES
    const prompt = inquirer.createPromptModule();
    const answers = await prompt([
      {
        name: "overwriteFiles",
        type: "Should the existing files be overwritten?",
        default: false,
      },
    ]);

    // IF ALLOWED TO OVERWRITE EXISTING FILES CONTINUE
    if (answers?.overwriteFiles === true) {
      await writeFilesToProjectFolder();
    }
    // ELSE EXIT THE PROCESS
    else {
      process.exit(-1);
    }
  }

  // IF NO FILE EXISTS WRITE TO THE PROJECT FOLDER
  await writeFilesToProjectFolder();
};

// CHECK IF GO.CONFIG.JS EXISTS IN PROJECT FOLDER
const checkIfGoConfigFileExists = () => {
  readFileSync("./gopack.config.js", (error, data) => {
    if (error) {
      console.log(
        "Please add a gopack.config.js file to your project's root folder",
        error
      );
      throw new Error(error);
    }
  });
};

// HANDLE ARGUMENTS FUNCTION
const handleArgs = async () => {
  switch (args[0]) {
    case "init":
      await checkIfAnyOftheFilesExist();
      console.log(
        "Created files successfully now run either `npm start` to start the development server"
      );
      break;
    case "start":
      run("webpack && webpack serve");
      break;
    case "serve":
      run(
        "cross-env MODE=production webpack && cross-env MODE=production webpack serve"
      );
      break;
    case "build":
      run("cross-env MODE=production webpack");
      break;
    default:
      console.error(
        `Arg '${args[0]}' is not supported, supported arguments are:`,
        `\n 'init': To initialize the project template.
      \n 'start': To build and start the development server.
      \n 'serve': To build and start the production server.
      \n 'build': To build the production project.`
      );
      throw new Error(
        "Please specify an argument either 'start', 'serve' or 'build' "
      );
      break;
  }
};

// VARIABLES
const args = yargs.argv._;

// CHECK IF ARGUMENT LIST IS EMPTY
if (!Array.isArray(args) || args?.length < 1) {
  throw new Error(
    "Please specify an argument either 'init', 'start', 'serve' or 'build' "
  );
}

checkIfGoConfigFileExists();

handleArgs();
