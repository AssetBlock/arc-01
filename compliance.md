
# Compliance

## Summary

Security tokens have an added layer of complexity that requires any transfer or holding of a token representing securities to follow compliance rules. For example, in order to invest in some securities in the US, investors residing in the US must be accredited, must not be on any anti-money-laundering watchlists, and must pass a KYC (Know Your Customer) check. 

The goal is to create a generic standard ruleset specification so that any issuer can publish and refer to a pre-defined set of rules. Ideally, these validation rules stored on-chain would enable them to be used ubiquitously by any issuer of security tokens.

### Key Terms

**Issuer**: The creator and owner of the compliance documentation standard. Controls the private keys of the `issuer-public-address` account in the examples below.

## Compliance Lifecycle

1. [Creating a Compliance Specification](#creating-a-compliance-specification)
1. [Updating a Compliance Specification](#updating-a-compliance-specification)


### 1. Creating a Compliance Specification

Publishing a compliance specification requires the creator to maintain a publicly-available reference document and a checksum verifiying its authenticity. Individual rules and error states must be defined off-chain to keep compliance specifications within the 1k notes field limit.

#### Specification
|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|specUrl|String|true|||
|specVersion|String|true|||
|specChecksum|String|true|||
|details|Object|true|||

#### Example Algorand transaction payload:
```js
{
  from: 'issuer-public-address',
  to: 'issuer-public-address',
  amt: 0,
  fee: 1,
  notes: {    
    specUrl: '',
    specVersion: 1,
    specChecksum: '120EA8A25E5D487BF68B5F7096440019',
    details: {},
  }
}
```


### 2. Updating a Compliance Specification

Updating a compliance specification requires the creator to update unique values for `specUrl`, `specVersion`, and `specChecksum`. This will enable a clear upgrade path and auditing to previously-reviewed transactions on the blockchain.

#### Specification
|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|specUrl|String|true|||
|specVersion|String|true|||
|specChecksum|String|true|Checksum type must be of type `SHA-3`. The length [`224`, `256`, `384`, `512`] must be followed by a `:` character must precede checksum value||
|details|Object|true|||

#### Example Algorand transaction payload:
```js
{
  from: 'issuer-public-address',
  to: 'issuer-public-address',
  amt: 0,
  fee: 1,
  notes: {    
    specUrl: '',
    specVersion: 2,
    specChecksum: '256:b5c9267b1710869e5d1c1b34de970d6594fe0010706e6b7366c42d7151728a50',
    details: {},
  }
}
```