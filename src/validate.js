const fieldOptions = {
  createToken: {
    tknName: {},
    tknSymbol: { required: true },
    qty: { required: true },
    decPlaces: {},
    compliance: { required: true },
    meta: {},
  },
};

function invalidUserOptions(operation, userOptions) {
  const validKeys = Object.keys(fieldOptions[operation]);
  const invalidOptions = [];

  Object.keys(userOptions).forEach(userOption => {
    if (validKeys.indexOf(userOption) === -1) {
      invalidOptions.push(userOption);
    }
  });

  return invalidOptions;
}

// function missingRequiredFields(operation, options) {
//   const requiredFields = fieldOptions[operation];
//   const invalidOptions = [];

//   Object.keys(options).forEach(userOption => {
//     if (fieldOptions[operation][userOption].required) {
//       invalidOptions.push(userOption);
//     }
//   });

//   return invalidOptions;
// }

function validate(operation, options) {
  if (!options || !operation) {
    throw new Error(`Please specify an operation and options map.`);
  }
  if (!fieldOptions[operation]) {
    throw new Error(`Operation '${operation}' not found.`);
  }
  if (invalidUserOptions(operation, options).length > 0) {
    throw new Error(
      `The following user options are invalid: ${invalidUserOptions(
        operation,
        options
      )}.`
    );
  }
  if (missingRequiredFields(operation, options).length > 0) {
    throw new Error(`Please provide required fields`);
  }

  return fieldOptions[operation];
}

module.exports = validate;
