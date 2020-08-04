const objs = [
  3,
  null,
  [0, true, '2', [3.14, {}, null]],
  { key1: 'foo', key2: 'bar', key3: { array: [null, {}] } },
  { minusInf: -Infinity, nan: NaN, plusInf: Number(Infinity) },
  { date: new Date(1234567890), re: /foo/gi },
  {
    map: new Map([
      [NaN, 4],
      [undefined, 'm']
    ]),
    set: new Set([undefined, NaN])
  },
  { buf: Buffer.from([0, 255, 127]) }
];

module.exports = { objs };
