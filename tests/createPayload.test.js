var { createPayload } = require('../src/createPayload.js');

it('throws correctly', function() {
  expect(() => {
    createPayload('create', {})
  }).toThrow(`Error: invalid operation name for this token type.`);
});

it('creates a token', () => {
  const expectedPayload = {
    txType: 'ARC01',
    opType: 'ISSUE',
    tknSymbol: 'TEST',
    qty: 1000000,
    decPlaces: 18,
  };
  const expectedEncodedValue = new Uint8Array(Buffer.from(JSON.stringify(expectedPayload)));
  expect(
    createPayload('ISSUE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
    })
  ).toEqual(expectedEncodedValue);
});
