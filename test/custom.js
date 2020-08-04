const { tmpdir } = require('os');
const path = require('path');
const fs = require('fs-extra');
const prettyFormat = require('pretty-format');
const { expect } = require('chai');

const { serialization, serializeJson, deserializeJson } = require('../lib');

const { readFile, writeFile, readFileSync, writeFileSync } = serialization(
  serializeJson,
  deserializeJson
);

const { objs } = require('./test-data');

const file = path.join(tmpdir(), '__node-serialization-test');
afterEach(() => {
  try {
    fs.unlinkSync(file);
  } catch (_) {
    // Do nothing if file does not exist.
  }
});

function jsonRestore(object) {
  return JSON.parse(JSON.stringify(object));
}

describe('Using Custom implementation', () => {
  it('throws the error with an invalid serialization', () => {
    // No chance this is a valid serialization, neither in JSON nor V8.
    const invalidBuffer = Buffer.from([0, 85, 170, 255]);

    writeFileSync(file, invalidBuffer);

    expect(() => deserializeJson(invalidBuffer)).to.throw();
    expect(() => deserializeJson(readFileSync(file))).to.throw();
  });

  objs.forEach((object, i) => {
    describe(`Object ${i}`, () => {
      it('serializes/deserializes in memory', () => {
        const buf = serializeJson(object);

        expect(buf).to.be.a('string');

        expect(prettyFormat(deserializeJson(buf))).to.equal(
          prettyFormat(jsonRestore(object))
        );
      });

      it('serializes/deserializes in disk', () => {
        writeFileSync(file, object);

        expect(prettyFormat(readFileSync(file))).to.equal(
          prettyFormat(jsonRestore(object))
        );
      });

      it('async serializes/deserializes in disk', () =>
        writeFile(file, object)
          .then(() => readFile(file))
          .then((data) => {
            expect(prettyFormat(data)).to.equal(
              prettyFormat(jsonRestore(object))
            );
          }));
    });
  });
});
