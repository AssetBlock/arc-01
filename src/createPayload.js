const { validateSchema } = require('./validateSchema.js');
const { encodePayload } = require('./encode.js');

function createPayload(operationName, args) {
  try {
    validateSchema(
      operationName, args);
  } catch (err) {
    throw err;
  }
  return encodePayload(operationName, args);
}

module.exports = {
  createPayload,
};
