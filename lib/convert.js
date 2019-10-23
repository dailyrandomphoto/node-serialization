const serialization = require('./serialization');

function convert(srcFile, srcDeserialize, destFile, destSerialize) {
  const { readFile } = serialization(null, srcDeserialize);
  const { writeFile } = serialization(destSerialize, null);

  return readFile(srcFile).then((content) => writeFile(destFile, content));
}

function convertSync(srcFile, srcDeserialize, destFile, destSerialize) {
  const { readFileSync } = serialization(null, srcDeserialize);
  const { writeFileSync } = serialization(destSerialize, null);

  writeFileSync(destFile, readFileSync(srcFile));
}

module.exports = { convert, convertSync };
