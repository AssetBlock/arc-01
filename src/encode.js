const { NOTE_BYTE_LIMIT } = require('./lib/constants.js');

function encodePayload(operation, data) {
  // Stringify note for encoding
  const jsonNote = JSON.stringify(data);

  // Validate the size of the payload, Algorand has a hard limit of 1k.
  const noteByteSize = Buffer.byteLength(jsonNote, 'utf8');
  if (noteByteSize > NOTE_BYTE_LIMIT) {
    throw new Error(
      `Note is ${noteByteSize} bytes, which is ${noteByteSize -
        NOTE_BYTE_LIMIT} bytes greater than the ${NOTE_BYTE_LIMIT} byte limit.`
    );
  }

  // Encoded note payload must be wrapped in Uint8Array
  const encodedValue = Buffer.from(jsonNote);
  return new Uint8Array(encodedValue);
}

module.exports = {
  encodePayload,
};
