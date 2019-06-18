var {
  createSecurityToken,
  requestSecurityTokenTransfer,
  approveSecurityTokenTransfer,
  denySecurityTokenTransfer,
  updateSecurityTokenCompliance,
  updateSecurityTokenDistribution,
  addSecurityTokenDocument,
} = require('../index.js');

it('creates a security token', () => {
  const expectedPayload = {
    txType: 'ARC01',
    opType: 'CREATE',
    tknName: 'TEST',
    tknSymbol: 'ABT',
    qty: 1000000,
    managers: ['CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA'],
    decPlaces: 18,
    specLocation: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
  };
  const expectedEncodedValue = new Uint8Array(Buffer.from(JSON.stringify(expectedPayload)));
  expect(
    createSecurityToken({
      tknName: 'TEST',
      tknSymbol: 'ABT',
      qty: 1000000,
      managers: ['CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA'],
      decPlaces: 18,
      specLocation: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
    })
  ).toEqual(expectedEncodedValue);
});

it('requests a security token transfer', () => {
  const expectedPayload = {
    txType: 'ARC01',
    opType: 'TRANSFER',
    tknSymbol: 'ABT',
    tfrStatus: 'APPROVED',
    tfrTotal: 1000,
    fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
    txnRef: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
  };
  const expectedEncodedValue = new Uint8Array(Buffer.from(JSON.stringify(expectedPayload)));
  expect(
    approveSecurityTokenTransfer({
      tknSymbol: 'ABT',
      tfrStatus: 'APPROVED',
      tfrTotal: 1000,
      fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
      txnRef: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
    })
  ).toEqual(expectedEncodedValue);
});

it('approves a security token', () => {
  const expectedPayload = {
    txType: 'ARC01',
    opType: 'TRANSFER',
    tknSymbol: 'ABT',
    tfrStatus: 'APPROVED',
    tfrTotal: 1000,
    fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
    txnRef: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
  };
  const expectedEncodedValue = new Uint8Array(Buffer.from(JSON.stringify(expectedPayload)));
  expect(
    approveSecurityTokenTransfer({
      tknSymbol: 'ABT',
      tfrStatus: 'APPROVED',
      tfrTotal: 1000,
      fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
      txnRef: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
    })
  ).toEqual(expectedEncodedValue);
});
