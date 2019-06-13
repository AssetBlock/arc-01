const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const {
  createToken,
  transferToken,
} = require('./schemas/basic');

const TOKEN_TYPES = {
  BASIC: 'BASIC',
  SECURITY: 'SECURITY',
};

const operationNameToSchemaMap = {
  BASIC: {
    CREATE: createToken,
    TRANSFER: transferToken,
  },
};

function validate(operation, data) {
  if (!data || !operation) {
    throw new Error('Please specify a valid operation name with options.');
  }

  const tokenType = (data.tokenType) ? data.tokenType : TOKEN_TYPES.BASIC;

  if (!operationNameToSchemaMap[tokenType][operation]) {
    throw new Error('Error: invalid operation name for this token type.');
  }

  const validateSchema = ajv.compile(operationNameToSchemaMap[tokenType][operation]);
  const valid = validateSchema(data);

  if (!valid) {
    console.error(validateSchema.errors);
  }
  return valid;
}

module.exports = { validate };
