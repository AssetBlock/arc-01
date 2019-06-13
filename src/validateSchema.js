const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const {
  createToken,
  transferToken,
} = require('./schemas/basic');
const {
  createSecurityToken,
} = require('./schemas/security');


const TOKEN_TYPES = {
  BASIC: 'BASIC',
  SECURITY: 'SECURITY',
};

const operationNameToSchemaMap = {
  BASIC: {
    CREATE: createToken,
    TRANSFER: transferToken,
  },
  SECURITY: {
    CREATE: createSecurityToken,
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
