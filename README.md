# node-serialization

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![LICENSE][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![dependencies Status][dependencies-image]][dependencies-url]
[![devDependencies Status][devDependencies-image]][devDependencies-url]

A serialization library for node. Serialize/Deserialize a huge object to/from a file.

Using [v8 Serialization API](https://nodejs.org/api/v8.html#v8_serialization_api) as default.
You can provide custom serialization functions, like JSON(stringify/parse), json-stream-stringify, etc.


## Usage

```js
const { readFile, writeFile } = require('node-serialization');
```

### Default serialize/deserialize method
Write a object to a file and read the file restore a object.
```js
var path = 'cache.data';
var data = {
  'foo': 'bar'
};

writeFile(path, data)
  .then(() => console.log('saved'));

readFile(path)
  .then((data) => console.log(data));
```

### Custom serialize/deserialize method
Use a custom serialization method.
```js
const { serialization } = require('node-serialization');

const serialize = function (obj) {
  return JSON.stringify(obj);
};
const deserialize = function (str) {
  return JSON.parse(str);
};

const {
  readFile: readJsonFile,
  writeFile: writeJsonFile
} = serialization(serialize, deserialize);

var path = 'cache.json';
var data = {
  'foo': 'bar'
};

writeJsonFile(path, data)
  .then(() => console.log('saved'));

readJsonFile(path)
  .then((data) => console.log(data));
```

### Convert Format
Deserialize a file then serialize into another file with different serialization.
```js
const {
  convert,
  serializeJson,
  deserialize: deserializeV8
} = require('node-serialization');

convert('cache.data', deserializeV8, 'cache.data.json', serializeJson)
  .catch((err) => console.error(err));
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
Copyright (c) 2019 dailyrandomphoto. Licensed under the [MIT license][license-url].

[npm-url]: https://www.npmjs.com/package/node-serialization
[travis-url]: https://travis-ci.org/dailyrandomphoto/node-serialization
[coveralls-url]: https://coveralls.io/github/dailyrandomphoto/node-serialization?branch=master
[license-url]: LICENSE
[dependencies-url]: https://david-dm.org/dailyrandomphoto/node-serialization
[devDependencies-url]: https://david-dm.org/dailyrandomphoto/node-serialization?type=dev

[npm-downloads-image]: https://img.shields.io/npm/dm/node-serialization.svg
[npm-version-image]: https://img.shields.io/npm/v/node-serialization.svg
[license-image]: https://img.shields.io/npm/l/node-serialization.svg
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/node-serialization/master
[coveralls-image]: https://coveralls.io/repos/github/dailyrandomphoto/node-serialization/badge.svg?branch=master
[dependencies-image]: https://david-dm.org/dailyrandomphoto/node-serialization/status.svg
[devDependencies-image]: https://david-dm.org/dailyrandomphoto/node-serialization/dev-status.svg
