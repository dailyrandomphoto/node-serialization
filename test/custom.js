const fs = require('fs-extra');
const { tmpdir } = require('os');
const path = require('path');
const prettyFormat = require('pretty-format');
const { expect } = require('chai');

const {
  serialization, serializeJson, deserializeJson,
} = require('../lib');

const {
  readFile, writeFile, readFileSync, writeFileSync,
} = serialization(serializeJson, deserializeJson);

const objs = [
  3,
  null,
  [0, true, '2', [3.14, {}, null]],
  { key1: 'foo', key2: 'bar', key3: { array: [null, {}] } },
  { minusInf: -Infinity, nan: NaN, plusInf: +Infinity },
  { date: new Date(1234567890), re: /foo/gi },
  { map: new Map([[NaN, 4], [undefined, 'm']]), set: new Set([undefined, NaN]) },
  { buf: Buffer.from([0, 255, 127]) },
];

const file = path.join(tmpdir(), '__node-serialization-test');
afterEach(() => {
  try {
    fs.unlinkSync(file);
  } catch (err) {
    // Do nothing if file does not exist.
  }
});

function jsonRestore(obj) {
  return JSON.parse(JSON.stringify(obj));
}

describe('Using Custom implementation', () => {
  it('throws the error with an invalid serialization', () => {
    // No chance this is a valid serialization, neither in JSON nor V8.
    const invalidBuffer = Buffer.from([0, 85, 170, 255]);

    writeFileSync(file, invalidBuffer);

    expect(() => deserializeJson(invalidBuffer)).to.throw();
    expect(() => deserializeJson(readFileSync(file))).to.throw();
  });

  objs.forEach((obj, i) => {
    describe(`Object ${i}`, () => {
      it('serializes/deserializes in memory', () => {
        const buf = serializeJson(obj);

        expect(buf).to.be.a('string');

        expect(prettyFormat(deserializeJson(buf))).to.equal(
          prettyFormat(jsonRestore(obj)),
        );
      });

      it('serializes/deserializes in disk', () => {
        writeFileSync(file, obj);

        expect(prettyFormat(readFileSync(file))).to.equal(
          prettyFormat(jsonRestore(obj)),
        );
      });

      it('async serializes/deserializes in disk', () => writeFile(file, obj)
        .then(() => readFile(file))
        .then((data) => {
          expect(prettyFormat(data)).to.equal(
            prettyFormat(jsonRestore(obj)),
          );
        }));
    });
  });
});
