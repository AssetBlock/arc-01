const { validate } = require('./validate.js');
const { encodePayload } = require('./encode.js');

function createPayload(operationName, args) {
  try {
    validate(
      operationName, args);
  } catch (err) {
    return err;
  }
  return encodePayload(operationName, args);
}

module.exports = {
  createPayload,
};