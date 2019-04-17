
# Compliance

## Summary

Security tokens have an added layer of complexity that requires any transfer or holding of a token representing securities to follow compliance rules. For example, in order to invest in some securities in the US, investors residing in the US must be accredited, must not be on any anti-money-laundering watchlists, and must pass a KYC (Know Your Customer) check. 

The goal is to create a generic standard ruleset specification so that any issuer can use a pre-defined set of rules, potentially even opening the door to validation status being stored on-chain ubiquitously to any shared requirement.


#### Specification

|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|specUrl|String|true|||
|specAlgorithm|String|true|||
|specHash|String|true|||
|verificationAddress|Array|true|||
|errorSpecifications|Array|true|||
|complianceNotes|Object|true|||

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
      specLocation: '',
      specHash: 'asdfasdf-23452-w642kmnpokn-2345234',
      verificationAddress: [''],
      errorSpecifications: [
        { 
          code: 1,
          spec: 'COMPL_1_OOD',
          defaultMessage: 'Recipient compliance check out of date',
        },
        {
          code: 2,
          spec: 'COMPL_2_MISSING',
          defaultMessage: 'Recipient compliance missing',
        }      
      ] 
      complianceNotes: {},
    },
    details: {}
  }
}
```
