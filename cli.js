#!/usr/bin/env node
var yargs = require('yargs');
var {
  createToken,
  requestIssuanceOrTransfer,
  updateTokenComplianceInfo,
  requestDistributionUpdate,
  addTokenDocument,
  approveTransfer,
  denyTransfer,
} = require('./src/core.js');

var argv = yargs
  .usage('usage: $0 <command>')
  .command('create', '[Issuer] Create a new token', function(yargs) {
    createToken(yargs);
  })
  .command(
    'updateCompliance',
    '[Issuer] Update address of compliance manager controlling token distributions',
    function(yargs) {
      updateTokenComplianceInfo(yargs);
    }
  )
  .command(
    'transfer',
    '[Issuer/Investor] Request new issuance or transfer of tokens',
    function(yargs) {
      requestIssuanceOrTransfer(yargs);
    }
  )
  .command(
    'updateDistribution',
    '[Issuer] Update token distributions from the issuers perspective',
    function(yargs) {
      requestDistributionUpdate(yargs);
    }
  )
  .command(
    'addTokenDocument',
    '[Issuer] Add a document relating to token issuance, value, or status',
    function(yargs) {
      addTokenDocument(yargs);
    }
  )
  .command(
    'approve',
    '[Compliance Manager] Approve issuance or transfer of tokens',
    function(yargs) {
      approveTransfer(yargs);
    }
  )
  .command(
    'deny',
    '[Compliance Manager] Deny issuance or transfer of tokens',
    function(yargs) {
      denyTransfer(yargs);
    }
  )

  .help('help')
  .wrap(null).argv;

checkCommands(yargs, argv, 1);

function checkCommands(yargs, argv, numRequired) {
  if (argv._.length < numRequired) {
    console.warn(
      'Please provide a command. Please see docs below for proper usage'
    );
    yargs.showHelp();
  } else {
    // check for unknown command
  }
}
