var { createBasicToken, transferBasicToken } = require('../index.js');

it('creates a token', () => {
  expect(
    createBasicToken({
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


it('transfers a token', () => {
  expect(
    transferBasicToken({
      fromAddr: 'abc123',
      toAddr: 'def456',
      tknSymbol: 'TEST',
      tfrTotal: 1000,
    })
  ).toEqual({
    txType: 'ARC01',
    opType: 'TRANSFER',
    fromAddr: 'abc123',
    toAddr: 'def456',
    tknSymbol: 'TEST',
    tfrTotal: 1000,
  });
});
