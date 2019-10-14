const serialization = require('./serialization');

function convert(srcFile, srcDeserialize, destFile, destSerialize) {
  const { readFile } = serialization(null, srcDeserialize);
  const { writeFile } = serialization(destSerialize, null);

  return readFile(srcFile).then((content) => writeFile(destFile, content));
}

module.exports = convert;
