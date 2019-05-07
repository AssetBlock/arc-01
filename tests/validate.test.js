const validate = require('../src/validate.js');

it('checks for required arguments', function() {
  expect(() => {
    validate();
  }).toThrow(`Please specify a valid operation name with options.`);
});

it('checks for valid operation names', function() {
  expect(() => {
    validate('create', {});
  }).toThrow(`Error: invalid operation name.`);
});

it('successfully validates create option', function() {
  expect(
    validate('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
      managers: ['JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ'],
      specLocation:
        'WTDT3V7BTTS2O3MRMM2C77TQ2WAM7ILZGMTLFZ2YUDBNRDDDMBJFK6WWI4',
    })
  ).toBe(true);
});
