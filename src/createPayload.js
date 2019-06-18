const { validateSchema } = require('./validateSchema.js');
const { encodePayload } = require('./encode.js');
const { TOKEN_TYPES } = require('./lib/constants');

function createPayload(operationName, args, tknType) {
  const tokenType = (tknType) ? tknType : TOKEN_TYPES.BASIC;

  try {
    validateSchema(
      operationName, args, tokenType);
  } catch (err) {
    throw err;
  }
  return encodePayload(operationName, args);
}

module.exports = {
  createPayload,
};
