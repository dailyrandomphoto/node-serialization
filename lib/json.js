const fs = require('fs-extra');

const serializeJson = (obj) => JSON.stringify(obj);

const deserializeJson = (str) => JSON.parse(str);

const writeJson = (file, contents) => {
  let file2 = file;
  if (typeof file === 'string') {
    file2 = `${file}.writing`;
  }
  return fs.writeJson(file2, contents)
    .then(() => {
      if (file2 !== file) {
        fs.rename(file2, file, (err) => {
          if (err) throw err;
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
  writeJsonSync,
};
