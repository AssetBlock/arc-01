const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const {
  TOKEN_TYPES
} = require('./lib/constants');
const {
  createToken,
  transferToken,
} = require('./schemas/basic');
const {
  createSecurityToken,
  requestTransfer,
  approveTransfer,
  denyTransfer,
  updateCompliance,
  updateDistribution,
  addTokenDocument,
} = require('./schemas/security');

const operationNameToSchemaMap = {
  BASIC: {
    CREATE: createToken,
    TNSFR: transferToken,
  },
  SECURITY: {
    CREATE: createSecurityToken,
    RQTFR: requestTransfer,
    APTFR: approveTransfer,
    DNTFR: denyTransfer,
    UPCMP: updateCompliance,
    ADD_DOCUMENT: updateDistribution,
    UPDATE_DISTRIBUTION: addTokenDocument,
  }
};

function validateSchema(operation, data, tknType) {
  if (!data || !operation) {
    throw new Error('Please specify a valid operation name with options.');
  }

  const tokenType = (tknType) ? tknType : TOKEN_TYPES.BASIC;

  if (!operationNameToSchemaMap[tokenType][operation]) {
    throw new Error('Error: invalid operation name for this token type.');
  }

  const schemaValidation = ajv.compile(operationNameToSchemaMap[tokenType][operation]);
  const valid = schemaValidation(data);

  if (!valid) {
    throw new Error(`Error: invalid schema for this operation: ${JSON.stringify(schemaValidation.errors)}`);
  }
  return valid;
}

module.exports = { validateSchema };
