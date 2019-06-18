const { createPayload } = require('./src/createPayload.js');
const { BASIC_OPERATION_NAMES, SECURITY_OPERATION_NAMES, TOKEN_TYPES } = require('./src/lib/constants.js');

// Basic Tokens
function createBasicToken(data) {
  return createPayload(BASIC_OPERATION_NAMES.CREATE, data);
}

function transferBasicToken(data) {
  return createPayload(BASIC_OPERATION_NAMES.TNSFR, data)
}

// Security Tokens
function createSecurityToken(data) {
  return createPayload(SECURITY_OPERATION_NAMES.CREATE, data, TOKEN_TYPES.SECURITY);
}

function requestSecurityTokenTransfer(data) {
  return createPayload(SECURITY_OPERATION_NAMES.RQTFR, data, TOKEN_TYPES.SECURITY);
}

function approveSecurityTokenTransfer(data) {
  return createPayload(SECURITY_OPERATION_NAMES.APTFR, data, TOKEN_TYPES.SECURITY);
}

function denySecurityTokenTransfer(data) {
  return createPayload(SECURITY_OPERATION_NAMES.DNTFR, data, TOKEN_TYPES.SECURITY);
}

function updateSecurityTokenCompliance(data) {
  return createPayload(SECURITY_OPERATION_NAMES.UPCMP, data, TOKEN_TYPES.SECURITY);
}

function updateSecurityTokenDistribution(data) {
  return createPayload(SECURITY_OPERATION_NAMES.UPDST, data, TOKEN_TYPES.SECURITY);
}

function addSecurityTokenDocument(data) {
  return createPayload(SECURITY_OPERATION_NAMES.ADDOC, data, TOKEN_TYPES.SECURITY);
}


module.exports = {
  createBasicToken,
  transferBasicToken,
  createSecurityToken,
  requestSecurityTokenTransfer,
  approveSecurityTokenTransfer,
  denySecurityTokenTransfer,
  updateSecurityTokenCompliance,
  updateSecurityTokenDistribution,
  addSecurityTokenDocument,
};
