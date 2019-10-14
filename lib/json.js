const fs = require('fs-extra');

const serializeJson = (obj) => JSON.stringify(obj);

const deserializeJson = (str) => JSON.parse(str);

module.exports = {
  serializeJson,
  deserializeJson,
  readJson: fs.readJson,
  writeJson: fs.writeJson,
  readJsonSync: fs.readJsonSync,
  writeJsonSync: fs.writeJsonSync,
};
