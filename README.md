# ARC-01
A hybrid security token standard proposal for Algorand

## Summary
Unlike tokens on a smart contract-enabled platform, there is not yet support for native functions to automate processes and avoid issues smart contracts were designed to prevent (such as dual payments). 

Instead, we must use the transaction `notes` field as the primary tool for defining tokens. For security tokens, we must pass requests for transfers to a central token issuer who is responsible for approving the transfer based on the compliance rules associated with the token.

### Important Considerations

* The following standard must keep the notes field under the required 1k encoded size. We may need to make additional adjustments to labels and validation of values to guarantee the notes field will not exceed this limit. 


### Key Terms

For the purposes of the doc below we are using the following key terms:

**Token**: Digitial representations functioning as a traditional security asset.

**Issuer**: The creator and owner of the token who controls distributions of it based on a particular set of compliance rules. Controls the private keys of the `issuer-public-address` account in the examples below.

**Investor**: An investor who will receive, hold, and request transfers of tokens. Controls the private keys of their own `investor[n]-public-address` account in the examples below. 

**Compliance Manager**: A delegate of the issuer or the issuer themselves who has authority to verify that the accounts involved in a transaction adhere to the rules set forth in the token's [compliance specification](./compliance.md). 

Controls the private keys of the `compliance-manager-public-address` account in the examples below.


## Compliance

Security tokens have an added layer of complexity that requires any transfer or holding of a token representing securities to follow a set of compliance rules. 

Before a token can be created, an issuer must either publish or reference a published [compliance specification](./compliance.md).


## Token Lifecycle
The standard for each step of a token's lifecycle is detailed below:

1. [Issuer - Creating a Token](#creating-a-token)
1. [Issuer or Investor - Transfer Tokens](#requesting-a-transfer)
1. [Compliance Manager - Approve Transfer](#approving-a-transfer)
1. [Compliance Manager - Deny Transfer](#denying-a-transfer)
1. [Issuer - Update Token](#updating-a-token)
1. [Issue - Update Token Distribution](#updating-token-distribution)

### 1. Creating a Token

To mint a new token, an issuer creates a "genesis transaction" wherein the compliance details, token details, and available token quantities are outlined. This will serve as a set of rules for future transactions to use.

#### Specification
|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|tokenName|String|false| `length <=26`| The name of the token |
|tokenSymbol|String|true| `length >= 3 && <= 5`| The symbol of the token for exchange and unique identification purposes |
|tokenQuantity|Int|true| ` > 0`|Total tokens available at initial offering|
|decimalPlaces|Int|false| `length<= 18`| Number of decimal places to honor|
|compliance|Object|true| | Contains Transaction ID where compliance spec was published within notes field and an array of at least one compliance manager address. See [compliance specification](./compliance.md) for details |
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
      managers: ['compliance-manager-address'],
      specLocation: 'compliance-tx-id',
    },
    details: {}
  }
}
```

#### Additional Notes / Restrictions
* A single issuer MUST NOT create more than one token with the same symbol

### 2. Requesting a Transfer

In order to issue or transfer tokens the issuer or investor must indicate to the compliance manager that they are looking to transfer tokens. The compliance manager must approve or deny each request. This includes primary issuance and secondary market transactions.

#### Specification
|Key|Type|Required|Additional Validation|
|----|----|----|----|
|quantity|Integer|true| |
|toAddress|String|true||
|tokenSymbol|String|true| `length >= 3 && length <= 5 `|
|details|Object|false| | 

#### Example Algorand transaction payload:
```js
{
  from: 'investor1-public-address|issuer-public-address',
  to: 'compliance-manager-public-address',
  amt: 0,
  fee: 1,
  notes: {
    quantity: 50,
    toAddress: 'investor2-public-address',
    tokenSymbol: 'MYT',
    details: {},
  }
}
```

### 3. Approving a Transfer

#### Specification
|Key|Type|Required|Additional Validation|
|----|----|----|----|
|transferStatus|String|true| must match approved statuses `['APPROVED', 'DENIED']`|
|transferTotal|Integer|true| |
|fromAddress|String|true||
|txnRef|String||Transaction id of transfer request|
|tokenSymbol|String|true| `length >= 3 && length <= 5 `|
|details|Object|false| | 


#### Example Algorand transaction payload:
```js
{
  from: 'compliance-manager-public-address',
  to: 'investor2-public-address',
  amt: 0,
  fee: 1,
  notes: {
    transferStatus: 'APPROVED',
    transferTotal: 50,    
    txnRef: `transaction-id-of-transfer-request`
    fromAddress: 'investor1-public-address',
    tokenSymbol: 'MYT',
    details: {},
  }
}
```

### 4. Denying a Transfer

#### Specification
|Key|Type|Required|Additional Validation|
|----|----|----|----|
|transferStatus|String|true| must match approved statuses `['APPROVED', 'DENIED']`|
|transferTotal|Integer|true| |
|fromAddress|String|true||
|txnRef|String||Transaction id of transfer request|
|errorCode|String|true| must match error specification code defined in [compliance specification rules](./compliance.md) |
|tokenSymbol|String|true| `length >= 3 && length <= 5 `|
|details|Object|false| | 

#### Example Algorand transaction payload:
```js
{
  from: 'compliance-manager-public-address',
  to: 'investor2-public-address',
  amt: 0,
  fee: 1,
  notes: {    
    transferStatus: 'DENIED',
    txnRef: `transaction-id-of-transfer-request`
    transferTotal: 0,
    errorCode: 'RULE_01',
    fromAddress: 'investor1-public-address',
    tokenSymbol: 'MYT',
    details: {},
  }
}
```


### 5. Updating Token Compliance

#### Specification
|Key|Type|Required|Additional Validation|
|----|----|----|----|
|compliance|Object|true| | Contains Transaction ID where compliance spec was published within notes field and an array of at least one compliance manager address. See [compliance specification](./compliance.md) for details |

#### Example Algorand transaction payload:
```js
{
  from: 'issuer-public-address',
  to: 'compliance-manager-public-address',
  amt: 0,
  fee: 1,
  notes: {    
    compliance: {
      managers: ['compliance-manager-public-address'],
      specLocation: 'compliance-tx-id',
    },    
  }
}
```


### 5. Updating Token Distribution

#### Specification
|Key|Type|Required|Additional Validation|
|----|----|----|----|

#### Example Algorand transaction payload:
```js
{
  from: 'issuer-public-address',
  to: 'compliance-manager-public-address',
  amt: 0,
  fee: 1,
  notes: {
    // Split distribution options
    type: 'split',
    ratio: '1to3',

    // Issue More Equity distribution options
    type: 'issue-more-equity',
    qty: 5000,    

    // Burn After Buyback distribution options   
    type: 'burnAfterBuyback',
    txnId: 'transaction-id-of-approved-buyback',
    qty: 50    
  }
}
```
