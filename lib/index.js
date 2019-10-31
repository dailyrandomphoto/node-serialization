const {serialize, deserialize} = require('v8');
const serialization = require('./serialization');
const {
  serializeJson,
  deserializeJson,
  readJson,
  writeJson,
  readJsonSync,
  writeJsonSync
} = require('./json');
const {convert, convertSync} = require('./convert');

const {
  readFile,
  writeFile,
  readFileSync,
  writeFileSync
} = serialization(serialize, deserialize);

module.exports = {
  serialization,

  serialize,
  deserialize,
  readFile,
  writeFile,
  readFileSync,
  writeFileSync,

  serializeJson,
  deserializeJson,
  readJson,
  writeJson,
  readJsonSync,
  writeJsonSync,

  convert,
  convertSync
};
