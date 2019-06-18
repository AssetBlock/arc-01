const { validateSchema } = require('./validateSchema.js');
const { encodePayload } = require('./encode.js');
const { TRANSACTION_TYPE, TOKEN_TYPES } = require('./lib/constants');

function createPayload(operationName, args, tknType) {
  const tokenType = (tknType) ? tknType : TOKEN_TYPES.BASIC;
  const payload = {
    txType: TRANSACTION_TYPE,
    opType: operationName,
    ...args,
  }
  try {
    validateSchema(operationName, payload, tokenType);
  } catch (err) {
    throw err;
  }
  return encodePayload(operationName, payload);
}

module.exports = {
  createPayload,
};
