var { createBasicToken, transferBasicToken } = require('../index.js');

it('creates a basic token', () => {
  const expectedPayload = {
    txType: 'ARC01',
    opType: 'CREATE',
    tknSymbol: 'TEST',
    qty: 1000000,
    decPlaces: 18,
  };
  const expectedEncodedValue = new Uint8Array(Buffer.from(JSON.stringify(expectedPayload)));
  expect(
    createBasicToken({
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
    })
  ).toEqual(expectedEncodedValue);
});

it('transfers a basic token', () => {
  const expectedPayload = {
    txType: 'ARC01',
    opType: 'TNSFR',
    fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
    toAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
    tknSymbol: 'TEST',
    tfrTotal: 1000,
  };
  const expectedEncodedValue = new Uint8Array(Buffer.from(JSON.stringify(expectedPayload)));
  expect(
    transferBasicToken({
      fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
      toAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
      tknSymbol: 'TEST',
      tfrTotal: 1000,
    })
  ).toEqual(expectedEncodedValue);
});
