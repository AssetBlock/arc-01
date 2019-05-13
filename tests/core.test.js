var { request } = require('../src/core.js');

it('creates a token', () => {
  expect(
    request('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
      managers: ['JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ'],
    })
  ).toEqual({
    txType: 'ARC01',
    opType: 'CREATE',
    tknSymbol: 'TEST',
    qty: 1000000,
    decPlaces: 18,
    managers: ['JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ'],
  });
});
