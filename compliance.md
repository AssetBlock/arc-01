
# Compliance

## Summary

Unlike utility tokens, security tokens have an added layer of controls due to necessary adherence to the SEC and other regulatory bodies. This mandate requires any token to create lawful compliance requirements (e.g. KYC/AML pass, accredited investor, and 12 month lockup period following issuance) that must be adhered to during issuance and beyond.

This specification outlines a generic standard ruleset specification so that any issuer can publish and refer to a pre-defined set of rules for any compliance profile. Ideally, these validation rules stored on-chain would enable the rules to be referenced and used ubiquitously by any issuer of security tokens and/or compliance manager.

#### Compliance specifications

**IMPORTANT NOTE**: THIS IS NOT FINAL, The format proposed here, while a valid json-schema spec, is an example illustrating a few broad concepts like how we might handle rules and conditional requirements in a json format. We're currently collecting feedback and looking to change this format, potentially changing the outline entirely.

When issuing a new token, issuers must define their own compliance specifications using a valid `ARC-01`-formatted document:

* [Example `ARC-01 JSON Schema Standard`](./schema.json)

Example compliance specification:

* [assetblock-compliance-specification-1.json](./compliance-example.json)

### Key Terms

**Creator**: The originator and owner of the compliance documentation standard. Controls the private keys of the `creator-public-address` account in the examples below.

## Compliance Lifecycle

1. [Creating a Compliance Specification](#creating-a-compliance-specification)
1. [Updating a Compliance Specification](#updating-a-compliance-specification)


### 1. Creating a Compliance Specification

Publishing a compliance specification requires the creator to maintain a publicly-available reference document and a checksum verifiying its authenticity. Individual rules and error states must be defined off-chain.

#### Specification
|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|specUri|String|true|Must be a valid `JSON` file following the `ARC-01 document specification` json schema |Public url to compliance spec details, error handling, and description |
|specChecksum|String|true|`SHA-3` checksum. The length [`224`, `256`, `384`, `512`] followed by a `:` character must precede checksum value|||details|Object|true|||
|details|Object|false|||


#### Example Algorand transaction payload:
```js
{
  from: 'creator-public-address',
  to: 'creator-public-address',
  amt: 0,
  fee: 1,
  notes: {
    specUri: '',
    specChecksum: '256:b5c9267b1710869e5d1c1b34de970d6594fe0010706e6b7366c42d7151728a50',
    details: {},
  }
}
```


### 2. Updating a Compliance Specification

Updating a compliance specification requires the creator to update unique values for `specUrl`, `specVersion`, and `specChecksum`. This will enable a clear upgrade path and auditing to previously-reviewed transactions on the blockchain.

#### Specification
|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|specUri|String|true|Must be a valid `JSON` file following the `ARC-01 document specification` json schema |Public url to compliance spec details, error handling, and description |
|specChecksum|String|true|`SHA-3` checksum. The length [`224`, `256`, `384`, `512`] followed by a `:` character must precede checksum value||
|details|Object|false|||

#### Example Algorand transaction payload:
```js
{
  from: 'creator-public-address',
  to: 'creator-public-address',
  amt: 0,
  fee: 1,
  notes: {
    specUri: 'assetblock-compliance-specification-1.json',
    specChecksum: '256:b5c9267b1710869e5d1c1b34de970d6594fe0010706e6b7366c42d7151728a50',
    details: {},
  }
}
```