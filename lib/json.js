const fs = require('fs-extra');

const serializeJson = (object) => JSON.stringify(object);

const deserializeJson = (string) => JSON.parse(string);

const writeJson = (file, contents) => {
  let file2 = file;
  if (typeof file === 'string') {
    file2 = `${file}.writing`;
  }

  return fs.writeJson(file2, contents).then(() => {
    if (file2 !== file) {
      return fs.move(file2, file, { overwrite: true }).catch((error) => {
        throw error;
      });
    }
  });
};

const writeJsonSync = (file, contents) => {
  let file2 = file;
  if (typeof file === 'string') {
    file2 = `${file}.writing`;
  }

  fs.writeJsonSync(file2, contents);
  if (file2 !== file) {
    fs.renameSync(file2, file);
  }
};

module.exports = {
  serializeJson,
  deserializeJson,
  readJson: fs.readJson,
  writeJson,
  readJsonSync: fs.readJsonSync,
  writeJsonSync
};
