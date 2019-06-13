var { createPayload } = require('../src/createPayload.js');

it('throws correctly', function() {
  expect(() => {
    createPayload('create', {})
  }).toThrow(`Error: invalid operation name for this token type.`);
});

it('creates a token', () => {
  expect(
    createPayload('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
    })
  ).toEqual({
    txType: 'ARC01',
    opType: 'CREATE',
    tknSymbol: 'TEST',
    qty: 1000000,
    decPlaces: 18,
  });
});
