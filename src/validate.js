const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const {
  createToken,
  requestTransfer,
  approveTransfer,
  denyTransfer,
  updateCompliance,
  addTokenDocument,
  updateDistribution,
} = require('./schemas');

const operationNameToSchemaMap = {
  CREATE: createToken,
  REQUEST_TRANSFER: requestTransfer,
  APPROVE_TRANSFER: approveTransfer,
  DENY_TRANSFER: denyTransfer,
  UPDATE_COMPLIANCE: updateCompliance,
  ADD_DOCUMENT: addTokenDocument,
  UPDATE_DISTRIBUTION: updateDistribution,
};

function validate(operation, data) {
  if (!data || !operation) {
    throw new Error('Please specify a valid operation name with options.');
  }
  if (!operationNameToSchemaMap[operation]) {
    throw new Error('Error: invalid operation name.');
  }

  const validateSchema = ajv.compile(operationNameToSchemaMap[operation]);
  const valid = validateSchema(data);

  if (!valid) {
    console.error(validateSchema.errors);
  }
  return valid;
}

module.exports = validate;
