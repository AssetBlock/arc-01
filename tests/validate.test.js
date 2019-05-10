const validate = require('../src/validate.js');

it('checks for required arguments', function() {
  expect(() => {
    validate();
  }).toThrow(`Please specify a valid operation name with options.`);
});

it('checks for valid operation names', function() {
  expect(() => {
    validate('create', {});
  }).toThrow(`Error: invalid operation name for this token type.`);
});

it('successfully passes valid create option', function() {
  expect(
    validate('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
      managers: ['JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ'],
    })
  ).toBe(true);
});

it('successfully passes valid requestTransfer option', function() {
  expect(
    validate('REQUEST_TRANSFER', {
      tknSymbol: 'TEST',
      qty: 100,
      toAddr: 'JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ',
    })
  ).toBe(true);
});
