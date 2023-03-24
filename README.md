# GOPACK
* [Introduction][intro]
* [Installation][install]
* [Usage][use]
* > [Initialization][init]
* > [Starting the development server][start]
* > [Starting the production server][serve]
* > [Bundling your project][build]
* > [Using the `gopack.config.js` file][gopackConfig]

[intro]: #introduction
[install]: #installation
[use]: #usage
[init]: #initialization
[start]: #start
[serve]: #serve
[build]: #build
[gopackConfig]: #gopackconfig

## Introduction
This is a pre written javascript bundler, which was created using webpack. It configures your project to use the already existing webpack loaders and plugins to generate static files.

## Installation
Inorder to install this package you need to have Node Js running on your system. If you don't have Node Js you can install it from their website [https://nodejs.org](https://nodejs.org). If you have Node Js installed, navigate to your project root folder and run `npm i @go-pack/gopack` in your terminal.

## Usage
### Initialization
To initialize the project (Set up the project files), run `npx gopack init`. This command will create the files you need for webpack to work, and install the `devDependencies` into your `node_modules` folder.
The files that will be created are:
- package.json (This will merge existing package.json contents into a new package.json file)
- webpack.config.js
- .browserslistrc
- postcss.config.js
- gopack.config.js

When you run `npx gopack init`, it will initialize your project and create some files, but if it files any existing file it will ask for permission to overwrite it. It will also ask for permission to run `npm install -f` in your project. To skip the permissions you can run `npx gopack init -y` 


### Start
Inorder to start the development server, you can run `npx gopack start`, the equivalent of this is `npx webpack` + `npx webpack serve`. Your server will run on `http://localhost:8080` by default. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error.

### Serve
Inorder to start the production server, you can run `npx gopack serve`, the equivalent of this is `npx cross-env MODE=production webpack` + `npx cross-env MODE=production webpack serve`. Your server will run on `http://localhost:8080` by default. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error.

### Build
Inorder to bundle your project into static files, you can run `npx gopack build`, the equivalent of this is `npx cross-env MODE=production webpack`. Doing this will bundle your project without starting the production server. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error.

### GopackConfig
The `gopack.config.js` file is written to help developers who are not familiar with webpack to customize the build output to their taste.

It comprises of key value pairs that enables flexibility in one's project. Which are:
- [generateCSSFiles][generateCSSFiles]
-  [devtool][devtool]
-  [useCoreJs][useCoreJs]
-  [entry][entry]
- [outputFilenameFormat][outputFilenameFormat] 
- [outputFilename][outputFilename]
- [outputFolder][outputFolder]
-  [pages][pages]
-  [assetsFolder][assetsFolder]

[generateCSSFiles]: #generateCSSFiles
[devtool]: #devtool
[useCoreJs]: #useCoreJs
[entry]: #entry
[outputFilenameFormat]: #outputFilenameFormat
[outputFilename]: #outputFilename
[outputFolder]: #outputFolder
[pages]: #pages
[assetsFolder]: #assetsFolder

#### generateCSSFiles
This accepts a boolean `true` or `false`. It indicates if webpack should inject CSS styles into the style tags `<style></style>` of every HTML page or if it should generate CSS files and them to various HTML pages.

#### devtool
This accepts the same parameters the webpack devtool does. It must be the same parameter that would be inserted into the webpack `devtool` key, unless webpack will throw an error upon build.
The most common used options are either `false` which is a `boolean` or `source-map` which is a `string`. If the `source-map` is inserted, it generates javascript and CSS map files which will be used to trace code using the browser's `devtool`. The `source-map` option is best used for `development` mode, while the `false` option is best used for `production` mode.