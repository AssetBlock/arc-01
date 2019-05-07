#!/usr/bin/env node
const yargs = require('yargs');
const { request } = require('./src/core.js');
const { OPERATION_NAMES } = require('./src/lib/constants.js');
const { createToken } = require('./src/schemas');
const pick = require('lodash/pick');

var argv = yargs
  .usage('usage: $0 <command>')
  .command(
    'create',
    '[Issuer] Create a new token',
    function(yargs) {
      yargs.option('managers', {
        type: 'array',
        desc: 'One or more compliance manager addresses',
      });
    },
    argv => {
      const validProperties = Object.keys(createToken.properties);
      const filteredArgs = pick(argv, validProperties);
      console.log(request(OPERATION_NAMES.CREATE, filteredArgs));
    }
  )
  .command(
    'updateCompliance',
    '[Issuer] Update address of compliance manager controlling token distributions',
    function(yargs) {
      request(OPERATION_NAMES.UPDATE_COMPLIANCE, yargs);
    }
  )
  .command(
    'transfer',
    '[Issuer/Investor] Request new issuance or transfer of tokens',
    function(yargs) {
      request(OPERATION_NAMES.REQUEST_TRANSFER, yargs);
    }
  )
  .command(
    'updateDistribution',
    '[Issuer] Update token distributions from the issuers perspective',
    function(yargs) {
      request(OPERATION_NAMES.UPDATE_DISTRIBUTION, yargs);
    }
  )
  .command(
    'addTokenDocument',
    '[Issuer] Add a document relating to token issuance, value, or status',
    function(yargs) {
      request(OPERATION_NAMES.ADD_DOCUMENT, yargs);
    }
  )
  .command(
    'approve',
    '[Compliance Manager] Approve issuance or transfer of tokens',
    function(yargs) {
      request(OPERATION_NAMES.APPROVE_TRANSFER, yargs);
    }
  )
  .command(
    'deny',
    '[Compliance Manager] Deny issuance or transfer of tokens',
    function(yargs) {
      request(OPERATION_NAMES.DENY_TRANSFER, yargs);
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
