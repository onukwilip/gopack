# GOPACK
* [Introduction][intro]
* [Installation][install]
* [Usage][use]
* > [Initialization][init]
* > [Starting the development server][start]

[intro]: #introduction
[install]: #installation
[use]: #usage
[init]: #initialization
[start]: #start

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

### Start
Inorder to start the development server, you can run `npx gopack start`, the equivalent of this is `npx webpack` + `npx webpack serve`. Your server will run on `http://localhost:8080` by default. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error.

### Serve
Inorder to start the production server, you can run `npx gopack serve`, the equivalent of this is `npx cross-env MODE=production webpack` + `npx cross-env MODE=production webpack serve`. Your server will run on `http://localhost:8080` by default. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error.

### Build
Inorder to bundle your project into static files, you can run `npx gopack build`, the equivalent of this is `npx cross-env MODE=production webpack`. Doing this will bundle your project without starting the production server. Make sure you have the `gopack.config.js` file in your project's root folder and export an object as default, unless this will throw an error.