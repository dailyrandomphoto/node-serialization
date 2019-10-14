# node-serialization
A serialization library for node. Serialize/Deserialize a huge object to/from a file.

Using v8 Serialization API as default.
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
