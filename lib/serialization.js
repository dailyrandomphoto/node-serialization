const fs = require('fs-extra');

function serialization(serialize, deserialize) {
  const readFile = (file) =>
    fs.readFile(file).then((data) => deserialize(data));

  const readFileSync = (file) => deserialize(fs.readFileSync(file));

  const writeFile = (file, contents) => {
    let file2 = file;
    if (typeof file === 'string') {
      file2 = `${file}.writing`;
    }

    return fs.writeFile(file2, serialize(contents)).then(() => {
      if (file2 !== file) {
        return fs.move(file2, file, { overwrite: true }).catch((error) => {
          throw error;
        });
      }
    });
  };

  const writeFileSync = (file, contents) => {
    let file2 = file;
    if (typeof file === 'string') {
      file2 = `${file}.writing`;
    }

    fs.writeFileSync(file2, serialize(contents));
    if (file2 !== file) {
      fs.renameSync(file2, file);
    }
  };

  return {
    serialize,
    deserialize,
    readFile,
    writeFile,
    readFileSync,
    writeFileSync
  };
}

module.exports = serialization;
