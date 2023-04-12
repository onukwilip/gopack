# <img src="./gopack_logo_new.png" alt="logo" title="logo" width="45px" style="width: 45px;" > GOPACK

- [Introduction][intro]
- [Installation][install]
- [Usage][use]
  - [Initialization][init]
  - [Starting the development server][start]
  - [Starting the production server][serve]
  - [Bundling your project][build]
  - [Using the `gopack.config.js` file][gopackconfig]
- [Other libraries and frameworks][other]
  - [Supporting React Js][react]
  - [Supporting Vue Js][vue]
  - [Supporting Typescript][typescript]
  - [Supporting jQuery][jquery]
  - [Supporting SASS/SCSS][sass]
  - [Supporting Ejs][ejs]
  - [Supporting Pug][pug]
  - [Supporting Handlebars][handlebars]

[intro]: #introduction
[install]: #installation
[use]: #usage
[init]: #initialization
[start]: #start
[serve]: #serve
[build]: #build
[gopackconfig]: #gopackconfig
[other]: #libraries
[react]: #react
[vue]: #vue
[typescript]: #typescript
[jquery]: #jquery
[sass]: #sass
[ejs]: #ejs
[pug]: #pug
[handlebars]: #handlebars
[//]: #122333444455555/this/shouldn't/be/repeated/in/the/readme

## Introduction

GOPack is a pre written javascript bundler, which was created using webpack. It configures your project to use the already existing webpack loaders and plugins to generate static files.

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

- [generateCSSFiles][generatecssfiles]
- [devtool][devtool]
- [useCoreJs][usecorejs]
- [entry][entry]
- [outputFilenameFormat][outputfilenameformat]
- [outputImageNameFormat][outputimagenameformat]
- [outputFilename][outputfilename]
- [outputFolder][outputfolder]
- [pages][pages]
- [assetsFolder][assetsfolder]
- [mapPlugins][mapplugins]
- [libraries][libraries]

[generatecssfiles]: #generatecssfiles
[devtool]: #devtool
[usecorejs]: #usecorejs
[entry]: #entry
[outputfilenameformat]: #outputfilenameformat
[outputimagenameformat]: #outputImageNameFormat
[outputfilename]: #outputfilename
[outputfolder]: #outputfolder
[pages]: #pages
[assetsfolder]: #assetsfolder
[mapplugins]: #mapplugins
[libraries]: #libraries

#### generateCSSFiles

This accepts a boolean `true` or `false`. It indicates if webpack should inject CSS styles into the style tags `<style></style>` of every HTML page or if it should generate CSS files and them to various HTML pages.

#### devtool

This accepts the same parameters the webpack devtool does. It must be the same parameter that would be inserted into the webpack `devtool` key, unless webpack will throw an error upon build.
The most common used options are either `false` which is a `boolean` or `source-map` which is a `string`. If the `source-map` is inserted, it generates javascript and CSS map files which will be used to trace code using the browser's `devtool`. The `source-map` option is best used for `development` mode, while the `false` option is best used for `production` mode.

#### useCoreJs

This accepts a boolean. It signifies if `babel.config.js` should generate code to support older browser versions when bundling using the `core-js` npm package. It is `false` by default.

**NB: This feature generates a lot of code for backwards compatibility, which will end up making your bundled javascript code large. use at your own risk**

#### entry

This accepts either a `string` or an `object`. It is indicates where webpack should start building our files from. The default value is `./src/index.js`. To specify multiple entrypoint, you create an object with key value pairs. the key being the `chunk` and the value being the _path to the file_. E.g.

```javascript
entry: {
  chunk: "path/to/file.js";
}
```

### outputFilenameFormat

This is the format in which webpack should name our bundled files - `chunks`. It is used if the `entry` parameter is an `object`. It accepts a string. It is written in this format `[name].bundle.js`. The `[name]` block is a variable which signifies the name each generated file `chunk`. The `bundle` extension is optional, but the `js` extension is compulsory. Therefore, if you specify the entry file as:

```javascript
entry: {
  index: "./src/index.js";
}
```

The output will be `index.bundle.js`

### outputImageNameFormat

This is the format in which webpack should name our bundled assets/images. It accepts a string. It is written in this format `[name][hash][ext][query]`. The `[name]` block is a variable which signifies the name each generated file/image. The `[hash]` block is the unique hash webpack generates for each file. The `[ext]` block is the file extension. The `[query]` block is optional. Therefore, if you specify the entry file as:

```javascript
entry: {
  index: "./src/index.js";
}
```

The output will be `index.bundle.js`

#### outputFilename

This is the name you want to give your bundled javascript file. This is used if the `entry` parameter is a `string` or not specified. This key accepts a `string`, which must end with the `.js` extension. E.g. `index.js`

#### outputFolder

This specifies the folder where all the webpack generated files should be located. It accepts a `string`. E.g. `public`

#### pages

This is used if you have any HTML file/files which you want to be bundled. It accepts an `array` of `objects`. E.g.

```javascript
public: [
  {
    template: path.resolve(__dirname, "src/index.html"),
    filename: "index.html",
  },
];
```

The template key signifies the path to the HTML document, the filename signifies the name it should give the generated HTML document during build.

Each object also accepts a parameter called `chunk`, which is an array of generated JavaScript/CSS file links to be inserted into the HTML document. The items passed as values to the `chunk` array must be same as the keys passed into the `entry` object. E.g

```javascript
entry: {
    index: './src/index.js',
    about: './src/about.js',
    contact: './src/contact.js',
},
public: [
    {
        template: path.resolve(__dirname, "src/about.html"),
        chunk:["index","about"],
        filename: "about.html",
    }
]
```

The `chunks` specifies which bundled javascript files should be included in the HTML page. I.e

- `gopack.config.js`

```javascript
entry: {
    index: './src/index.js',
    about: './src/about.js',
    contact: './src/contact.js',
},
public: [
    {
        template: path.resolve(__dirname, "src/index.html"),
        chunk:["index"],
        filename: "index.html",
    }
]
```

- `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Index</title>
    <!-- Automatic import -->
    <script defer src="index.js"></script>
  </head>
</html>
```

#### assetsFolder

This accepts a string which is the name or path to the folder the bundled images and assets will be stored. E.g. `images` or `path/to/images`.

#### mapPlugins

This accepts an `object`. The value of this is passed to the `webpack.ProvidePlugin()` class. This automatically load modules instead of having to **import** or **require** them everywhere in your project.

Here is an example of it's possible values:

```javascript
{
  identifier: "module";
  // OR
  identifier: path.resolve(path.join(__dirname, "path/to/module.js"));
}
```

The identifier is a user-defined value/key, while the module is either the name of a library in the `node_modules` folder or path to a javascript/typescript file. The **module** is automatically loaded and the **identifier** is filled with the exports of the loaded module (or property in order to support named exports).

Common usages of this option are:

- [jQuery][jquery]

[jquery]: #jquery

##### jQuery

To automatically load jQuery we can point both variables it exposes to the corresponding node module:

```js
{
  $: 'jquery',
  jQuery: 'jquery',
}
```

Then in any of our source code:

```js
// in a module
$("#item"); // <= works
jQuery("#item"); // <= also works
// $ is automatically set to the exports of module "jquery"
```

#### libraries

This accepts an `array` of `string`. It specifies which libraries webpack should support when bundling your project.

Here are it's possible values to be inserted into the list:

- react
- vue
- typescript
- pug
- hbs

Examples are:

- Let's say you want to support React Js, you specify

```js
  {
    ...,
    libraries: ["react"]
  }
```

- If you want to support multiple libraries e.g. React Js, Typescript you specify:

```js
  {
    ...,
    libraries: ["react", "typescript"]
  }
```

**N.B: The values are case-sensitive so make sure you use exactly what's specified in the list of possible values**

## Libraries

GOPack also supports the use of other libraries which are:

### React

GOPack has built-in support for react. It uses the `@babel/preset-react` library to transpile JSX to javascript. If you need to use React Js in your project you just have to install both the `react` and `react-dom` libraries. Then create a root node in your HTML file where `react` will inject the transpiled JSX code. To learn more about React Js, visit [https://legacy.reactjs.org/docs/getting-started.html](https://legacy.reactjs.org/docs/getting-started.html).

### Vue

GOPack has built-in support for vue. It uses `vue-loader`, `VueLoaderPlugin`, `vue-style-loader`, `vue-template-compiler` to handle `.vue` files. If you need to use Vue Js in your project you just have to install both the `vue` library. Then create one or multiple root nodes in your HTML file where `vue` will inject the transpiled Vue Js code. To learn more about Vue Js, visit [https://vuejs.org/guide/introduction.html](https://vuejs.org/guide/introduction.html).

**N.B: To make use of Vue Js, make sure you have at least 1 `.vue` file in your project folder, unless webpack will throw an error**

### Typescript

GOPack has built-in support for typescript. It uses the `ts-loader` loader to handle both `.ts` and `.tsx` files. If you need to use Typescript in your project you just need to install the `typescript` library and create a `tsconfig.json` file in your project's root folder. To learn more about Typescript, visit [https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html).

### JQuery

GOPack has built-in support for jQuery. If you need to use jQuery in your project you just need to install the `jQuery` library in your project. To learn more about jQuery, visit [https://api.jquery.com/](https://api.jquery.com/).

### SASS

GOPack has built-in support for SASS. It uses the `sass-loader` loader to handle both `.sass` and `.scss` files. If you need to use SASS in your project you just need to install the `sass` library in your project. To learn more about SASS, visit [https://sass-lang.com/documentation/](https://sass-lang.com/documentation/).

### Ejs

GOPack has built-in support for ejs. It uses the `HTMLWebpackPlugin` library to handle `.ejs` files. There is one problem with using `.ejs` files, the `html-loader` doesn't parse images/files imported in `.ejs` files. Therefore, to use import images you have to do it this way.

```html
// WRONG
<img src="./images/picture.jpg" />
// CORRECT <img src="<%= require("./images/picture.jpg") %>" />
```

You can also add dynamic variables using the `<%= htmlWebpackPlugin.options.variable_name %>` syntax. Then specify `variable_name` in the object passed into the `pages` array in `gopack.config.js`. E.g.

In the index.ejs file

```html
<head>
  <title><%= htmlWebpackPlugin.options.variable_name %></title>
</head>
```

Then in the `gopack.config.js`

```js
{
    ...,
    pages: [
        {
            template: path.resolve(__dirname, "src/index.ejs"),
            filename: "index.html",
            variable_name: "Index page"
        }
    ]
}
```

To learn more about ejs, visit [https://ejs.co/#docs](https://ejs.co/#docs).

### Pug

GOPack has built-in support for pug. It uses the `pug-loader` library to handle `.pug` files. There is one problem with using `.pug` files, just like `.ejs` files the `html-loader` doesn't parse images/files imported in `.pug` files. Therefore, to use import images you have to do it this way.

```js
// WRONG
img((src = "./images/picture.jpg"));
// CORRECT
img((src = require("./images/picture.jpg")));
```

You can also add dynamic variables by just assigning htmlWebpackPlugin.options.variable_name to an element. Then specify `variable_name` in the object passed into the `pages` array in `gopack.config.js`. E.g.

In the index.pug file

```js
head;
title = htmlWebpackPlugin.options.variable_name;
```

Then in the `gopack.config.js`

```js
{
    ...,
    pages: [
        {
            template: path.resolve(__dirname, "src/index.pug"),
            filename: "index.html",
            variable_name: "Index page"
        }
    ]
}
```

To learn more about pug, visit [https://pugjs.org/api/getting-started.html](https://pugjs.org/api/getting-started.html).

### Handlebars

GOPack has built-in support for handlebars. It uses the `handlebars-loader` library to handle `.hbs` files. There is one problem with using `.hbs` files, just like the other non-html files, the `html-loader` doesn't parse images/files imported in `.hbs` files. But, you don't need to do any extra configuration because GOPack has added the object below in the `rules` array for `.hbs` files.

```js
    {
      test: /\.hbs$/,
      use: [
        {
          loader: "handlebars-loader",
          // CODE RESPONSIBILE FOR PARSING LINKS TO IMAGES
          query: {
            inlineRequires: `/${gopackConfig?.assetsFolder || "images"}/`,
          },
        },
      ],
    }
```

You can also add dynamic variables using the `{{ htmlWebpackPlugin.options.variable_name }}` syntax. Then specify `variable_name` in the object passed into the `pages` array in `gopack.config.js`. E.g.

In the index.hbs file

```html
<head>
  <title>{{ htmlWebpackPlugin.options.variable_name }}</title>
</head>
```

Then in the `gopack.config.js`

```js
{
    ...,
    pages: [
        {
            template: path.resolve(__dirname, "src/index.hbs"),
            filename: "index.html",
            variable_name: "Index page"
        }
    ]
}
```

To learn more about handlebars, visit [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/).

# General

If you need to add any configuration to webpack which is not present in the `gopack.config.js`, add it to the `module.exports` object in the `webpack.config.js` or better still to the variable belonging to that configuration. E.g.

```js
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
```

**The `output` constant belongs to the `output` key in the webpack configuration**

```js
module.exports = {
  ...,
  output: output,
  ...
};

```

<a href="https://www.producthunt.com/posts/gopack?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gopack" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=385947&theme=dark" alt="GOPack - Javascript&#0032;bundler&#0032;and&#0032;transpiler&#0032;using&#0032;webpack&#0032;and&#0032;babel | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
