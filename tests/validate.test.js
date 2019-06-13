const { validate } = require('../src/validate.js');

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
    })
  ).toBe(true);
});


// it('successfully passes valid requestTransfer option', function() {
//   expect(
//     validate('REQUEST_TRANSFER', {
//       tknSymbol: 'TEST',
//       qty: 100,
//       toAddr: 'JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ',
//     })
//   ).toBe(true);
// });


// it('successfully passes valid approveTransfer option', function() {
//   expect(
//     validate('APPROVE_TRANSFER', {
//       tfrStatus: 'APPROVED',
//       tfrTotal: 100,
//       txnRef: 'JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHW',
//       fromAddr: 'JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ',
//       tknSymbol: 'MYT',
//     })
//   ).toBe(true);
// });


// it('successfully passes valid denyTransfer option', function() {
//   expect(
//     validate('DENY_TRANSFER', {
//       tfrStatus: 'DENIED',
//       tfrTotal: 0,
//       txnRef: 'JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHW',
//       fromAddr: 'JSWLBGJSRIZUIAGKWSVOVEBT4PAFBYSOUZ3L32QSMCTWHWRQH2JQ',
//       tknSymbol: 'MYT',
//       errCode: 'ERR_01',

//     })
//   ).toBe(true);
// });
