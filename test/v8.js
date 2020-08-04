const { tmpdir } = require('os');
const path = require('path');
const fs = require('fs-extra');
const prettyFormat = require('pretty-format');
const { expect } = require('chai');

const {
  serialize,
  deserialize,
  readFile,
  writeFile,
  readFileSync,
  writeFileSync
} = require('../lib');

const { objs } = require('./test-data');

const file = path.join(tmpdir(), '__node-serialization-test');
afterEach(() => {
  try {
    fs.unlinkSync(file);
  } catch (_) {
    // Do nothing if file does not exist.
  }
});

describe('Using V8 implementation', () => {
  it('throws the error with an invalid serialization', () => {
    // No chance this is a valid serialization, neither in JSON nor V8.
    const invalidBuffer = Buffer.from([0, 85, 170, 255]);

    writeFileSync(file, invalidBuffer);

    expect(() => deserialize(invalidBuffer)).to.throw();
    expect(() => deserialize(readFileSync(file))).to.throw();
  });

  objs.forEach((object, i) => {
    describe(`Object ${i}`, () => {
      it('serializes/deserializes in memory', () => {
        const buf = serialize(object);

        expect(buf).to.be.an.instanceof(Buffer);

        expect(prettyFormat(deserialize(buf))).to.equal(prettyFormat(object));
      });

      it('serializes/deserializes in disk', () => {
        writeFileSync(file, object);

        expect(prettyFormat(readFileSync(file))).to.equal(prettyFormat(object));
      });

      it('async serializes/deserializes in disk', () =>
        writeFile(file, object)
          .then(() => readFile(file))
          .then((data) => {
            expect(prettyFormat(data)).to.equal(prettyFormat(object));
          }));
    });
  });
});
