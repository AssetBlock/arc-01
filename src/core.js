const validate = require('./validate.js');
const { encodePayload } = require('./encode.js');

function request(operationName, args) {
  try {
    validate(
      operationName, args);
  } catch (err) {
    return err;
  }
  return encodePayload(operationName, args);
}

module.exports = {
  request,
};
