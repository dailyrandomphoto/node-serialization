const {tmpdir} = require('os');
const path = require('path');
const fs = require('fs-extra');
const prettyFormat = require('pretty-format');
const {expect} = require('chai');

const {
  serializeJson, deserializeJson, readJson, writeJson, readJsonSync, writeJsonSync
} = require('../lib');

const {objs} = require('./test-data');

const file = path.join(tmpdir(), '__node-serialization-test');
afterEach(() => {
  try {
    fs.unlinkSync(file);
  } catch (_) {
    // Do nothing if file does not exist.
  }
});

function jsonRestore(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe('Using JSON implementation', () => {
  it('throws the error with an invalid serialization', () => {
    // No chance this is a valid serialization, neither in JSON nor V8.
    const invalidBuffer = Buffer.from([0, 85, 170, 255]);

    writeJsonSync(file, invalidBuffer);

    expect(() => deserializeJson(invalidBuffer)).to.throw();
    expect(() => deserializeJson(readJsonSync(file))).to.throw();
  });

  objs.forEach((obj, i) => {
    describe(`Object ${i}`, () => {
      it('serializes/deserializes in memory', () => {
        const buf = serializeJson(obj);

        expect(buf).to.be.a('string');

        expect(prettyFormat(deserializeJson(buf)))
          .to.equal(prettyFormat(jsonRestore(obj)));
      });

      it('serializes/deserializes in disk', () => {
        writeJsonSync(file, obj);

        expect(prettyFormat(readJsonSync(file)))
          .to.equal(prettyFormat(jsonRestore(obj)));
      });

      it('async serializes/deserializes in disk', () => writeJson(file, obj)
        .then(() => readJson(file))
        .then(data => {
          expect(prettyFormat(data))
            .to.equal(prettyFormat(jsonRestore(obj)));
        }));
    });
  });
});
