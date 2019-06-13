const { createPayload } = require('./src/createPayload.js');
const { BASIC_OPERATION_NAMES } = require('./src/lib/constants.js');

function createBasicToken(data) {
  return createPayload(BASIC_OPERATION_NAMES.CREATE, data);
}

function transferBasicToken(data) {
  return createPayload(BASIC_OPERATION_NAMES.TRANSFER, data)
}

module.exports = {
  createBasicToken,
  transferBasicToken,
};
