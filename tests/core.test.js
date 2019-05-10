var { request } = require('../src/core.js');

it('creates a token', () => {
  expect(
    request('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
      managers: ['JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ'],
      specLocation:
        'WTDT3V7BTTS2O3MRMM2C77TQ2WAM7ILZGMTLFZ2YUDBNRDDDMBJFK6WWI4',
    })
  ).toEqual({
    txType: 'ARC01',
    opType: 'CREATE',
    tknSymbol: 'TEST',
    qty: 1000000,
    decPlaces: 18,
    managers: ['JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ'],
    specLocation: 'WTDT3V7BTTS2O3MRMM2C77TQ2WAM7ILZGMTLFZ2YUDBNRDDDMBJFK6WWI4',
  });
});