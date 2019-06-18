const TRANSACTION_TYPE = 'ARC01';
const NOTE_BYTE_LIMIT = 1000;

const TOKEN_TYPES = {
  BASIC: 'BASIC',
  SECURITY: 'SECURITY',
};

const BASIC_OPERATION_NAMES = {
  ISSUE: 'ISSUE',
  TNSFR: 'TNSFR',
};

const SECURITY_OPERATION_NAMES = {
  ISSUE: 'ISSUE',
  RQTFR: 'RQTFR', // Request transfer
  APTFR: 'APTFR', // Approve transfer
  DNTFR: 'DNTFR', // Deny transfer
  UPCMP: 'UPCMP', // Update compliance
  ADDOC: 'ADDOC', // Add document
  UPDST: 'UPDST', // Update token distribution
};

module.exports = {
  TRANSACTION_TYPE,
  BASIC_OPERATION_NAMES,
  SECURITY_OPERATION_NAMES,
  NOTE_BYTE_LIMIT,
  TOKEN_TYPES,
};
