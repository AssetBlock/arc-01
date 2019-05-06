const validate = require('../src/validate.js');

it('checks for required arguments', function() {
  expect(() => {
    validate();
  }).toThrow(`Please specify an operation and options map.`);
});
it('checks for a valid operation', function() {
  expect(() => {
    validate('foo', {});
  }).toThrow(`Operation 'foo' not found.`);
});
it('only allows specified operation option keys', function() {
  expect(() => {
    validate('createToken', { foo: 'bar', test: 'rawr' });
  }).toThrow(`The following user options are invalid: foo,test`);
});
// it('requires operation option keys', function() {
//   expect(() => {
//     validate('createToken', { meta: {} });
//   }).toThrow(`The following user options are invalid: foo,test`);
// });
