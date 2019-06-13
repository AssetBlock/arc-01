const { validateSchema } = require('../src/validateSchema.js');

it('checks for required arguments', function() {
  expect(() => {
    validateSchema();
  }).toThrow(`Please specify a valid operation name with options.`);
});

it('checks for valid operation names', function() {
  expect(() => {
    validateSchema('create', {});
  }).toThrow(`Error: invalid operation name for this token type.`);
});

it('successfully returns invalid schema warnings', function() {
  expect(() => {
    validateSchema('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
      unexpectedField: 'test',
    })
  }).toThrow();
});

it('successfully passes valid create option', function() {
  expect(
    validateSchema('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
    })
  ).toBe(true);
});

it('allows token type override', function() {
  expect(
    validateSchema('CREATE', {
      tknName: 'My Test',
      tknSymbol: 'TEST',
      qty: 100,
      decPlaces: 8,
      specLocation: 'MS3ZMFJOXJY7Z6RZR6PRYVTXCCRJ25EUZZ3Q66PWVSHD7FL2AGLA',
      managers: ['JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ'],
    }, 'SECURITY')
  ).toBe(true);
});