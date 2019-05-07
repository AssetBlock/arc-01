const { TRANSACTION_TYPE } = require('./lib/constants.js');

function encodePayload(operation, data) {
  const notePayload = {
    txType: TRANSACTION_TYPE,
    opType: operation,
    ...data,
  };
  // TODO: Add encoding step here to reduce size of field
  // TODO: Add test to make sure that the size is under 1kb
  return notePayload;
}

module.exports = {
  encodePayload,
};
