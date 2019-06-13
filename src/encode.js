const { TRANSACTION_TYPE, NOTE_BYTE_LIMIT } = require('./lib/constants.js');

function encodePayload(operation, data) {
  const notePayload = {
    txType: TRANSACTION_TYPE,
    opType: operation,
    ...data,
  };

  // Validate the size of the payload, Algorand has a hard limit of 1k.
  const noteByteSize = Buffer.byteLength(JSON.stringify(notePayload), 'utf8');
  if (noteByteSize > NOTE_BYTE_LIMIT) {
    throw new Error(
      `Note is ${noteByteSize} bytes, which is ${noteByteSize -
        NOTE_BYTE_LIMIT} bytes greater than the ${NOTE_BYTE_LIMIT} byte limit.`
    );
  }

  return notePayload;
}

module.exports = {
  encodePayload,
};
