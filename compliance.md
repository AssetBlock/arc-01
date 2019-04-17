
# Compliance

## Summary

Security tokens have an added layer of complexity that requires any transfer or holding of a token representing securities to follow compliance rules. For example, in order to invest in some securities in the US, investors residing in the US must be accredited, must not be on any anti-money-laundering watchlists, and must pass a KYC (Know Your Customer) check. 

The goal is to create a generic standard ruleset specification so that any issuer can use a pre-defined set of rules, potentially even opening the door to validation status being stored on-chain ubiquitously to any shared requirement.


#### Specification

|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|tokenName|String|false| `length <=26`| The name of the token |
|tokenSymbol|String|true| `length >= 3 && <= 5`| The symbol of the token for exchange and unique identification purposes |
|tokenQuantity|Int|true| ` > 0`|Total tokens available at initial offering|
|decimalPlaces|Int|false| `length<= 18`| Number of decimal places to honor|
|compliance|Compliance Object<details>|false| | A separate payload specification detailing compliance requirements |
|details|Object|false|| A utility field for additional metadata for use by the issuer or to provide more information|


#### Example Algorand transaction payload:
```js
{
  from: 'issuer-public-address',
  to: 'issuer-public-address',
  amt: 0,
  fee: 1,
  notes: {    
    tokenName: 'MyToken',
    tokenSymbol: 'MYT',
    tokenQuantity: 10000,
    decimalPlaces: 16,
    compliance: {
      specUrl: 'https://assetblock.com/specs/realEstateSecurity',
      specAlgorithm: 'SHA-256',
      specHash: 'asdfasdf-23452-w642kmnpokn-2345234',
      verificationAddress: [''],
      complianceNotes: {},
    },
    details: {}
  }
}
```