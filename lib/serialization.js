// const { serialize, deserialize } = require('v8');
const fs = require('fs-extra');

function serialization(serialize, deserialize) {
  const readFile = (file) => fs.readFile(file).then((data) => deserialize(data));

  const readFileSync = (file) => deserialize(fs.readFileSync(file));

  const writeFile = (file, contents) => fs.writeFile(file, serialize(contents));

  const writeFileSync = (file, contents) => fs.writeFileSync(file, serialize(contents));

  return {
    serialize,
    deserialize,
    readFile,
    writeFile,
    readFileSync,
    writeFileSync,
  };
}


module.exports = serialization;
