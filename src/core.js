const validate = require('./validate.js');

// function encodeNotesField(payload, key) {
//   const notePayload = {
//     ...payload,
//     txType: 'ARC-01',
//     opType: key,
//   };
//   return notePayload;
// }

function createToken(args) {
  try {
    return validate(args, 'createToken');
  } catch (err) {}
  // return encodeNotesField('createToken');
}

function updateTokenComplianceInfo() {}
function requestIssuanceOrTransfer() {}
function requestDistributionUpdate() {}
function addTokenDocument() {}

// FROM: Compliance
function approveTransfer() {}
function denyTransfer() {}

//
// Compliance LifeCycle
//

// FROM: Compliance Creator

function createComplianceSpecification() {}
function updateComplianceSpecification() {}

module.exports = {
  createToken,
  requestIssuanceOrTransfer,
  updateTokenComplianceInfo,
  requestDistributionUpdate,
  addTokenDocument,
  approveTransfer,
  denyTransfer,
};
