# node-serialization

[![NPM Version][npm-version-image]][npm-url]
[![LICENSE][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![code style: prettier][code-style-prettier-image]][code-style-prettier-url]

A serialization library for node. Serialize/Deserialize a huge object to/from a file.

Using [v8 Serialization API](https://nodejs.org/api/v8.html#v8_serialization_api) as default.
You can provide custom serialization functions, like JSON(stringify/parse), json-stream-stringify, etc.

## Usage

```js
const { readFile, writeFile } = require("node-serialization");
```

### Default serialize/deserialize method

Write a object to a file and read the file restore a object.

```js
var path = "cache.data";
var data = {
  foo: "bar",
};

writeFile(path, data).then(() => console.log("saved"));

readFile(path).then((data) => console.log(data));
```

### Custom serialize/deserialize method

Use a custom serialization method.

```js
const { serialization } = require("node-serialization");

const serialize = function (object) {
  return JSON.stringify(object);
};
const deserialize = function (string) {
  return JSON.parse(string);
};

const { readFile: readJsonFile, writeFile: writeJsonFile } = serialization(
  serialize,
  deserialize
);

var path = "cache.json";
var data = {
  foo: "bar",
};

writeJsonFile(path, data).then(() => console.log("saved"));

readJsonFile(path).then((data) => console.log(data));
```

### Convert Format

Deserialize a file then serialize into another file with different serialization.

```js
const {
  convert,
  serializeJson,
  deserialize: deserializeV8,
} = require("node-serialization");

convert(
  "cache.data",
  deserializeV8,
  "cache.data.json",
  serializeJson
).catch((err) => console.error(err));
```

## Methods

### Async

- readFile
- writeFile
- readJson
- writeJson
- convert

### Sync

- readFileSync
- writeFileSync
- readJsonSync
- writeJsonSync
- convertSync
- serialize
- deserialize
- serializeJson
- deserializeJson

If `file` parameter is a file path (type is string, not a buffer or a file descriptor), the `writeXxx` functions will write content to a temporary file while writing, and rename to the path of `file` parameter when success. So even if an exception(such as OOM) occurs, the file will not be a file with content loss.

## License

Copyright (c) 2020 dailyrandomphoto. Licensed under the [MIT license][license-url].

[npm-url]: https://www.npmjs.com/package/node-serialization
[travis-url]: https://travis-ci.org/dailyrandomphoto/node-serialization
[license-url]: LICENSE
[code-style-prettier-url]: https://github.com/prettier/prettier
[npm-downloads-image]: https://img.shields.io/npm/dm/node-serialization
[npm-version-image]: https://img.shields.io/npm/v/node-serialization
[license-image]: https://img.shields.io/npm/l/node-serialization
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/node-serialization
[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
