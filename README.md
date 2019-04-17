# ARC-01
A hybrid security token standard proposal for Algorand

## Summary
Unlike tokens on a smart contract-enabled platform, there is not yet support for native functions to automate processes and avoid issues smart contracts were designed to prevent (such as dual payments). 

Instead, we must use the transaction `notes` field as the primary tool for defining tokens. For security tokens, we must pass requests for transfers to a central token issuer who is responsible for approving the transfer based on the compliance rules associated with the token.

### Key Terms

For the purposes of the doc below we are using the following key terms:

**Token**: Digitial representations functioning as a traditional security asset.

**Issuer**: The creator and owner of the token who controls distrubutions of it based on a particular set of compliance rules. Controls the private keys of the `issuer-public-address` account in the examples below.

**Investor**: An investor who will receive, hold, and request transfers of tokens. Controls the private keys of their own `investor[n]-public-address` account in the examples below. 

**Compliance Manager**: A delegate of the issuer or the issuer themselves who has authority to verify that the accounts involved in a transaction adhere to the rules set forth in the token's [compliance specification](./compliance.md). 

Controls the private keys of the `compliance-manager-public-address` account in the examples below.


## Compliance Ruleset

Security tokens have an added layer of complexity that requires any transfer or holding of a token representing securities to follow a set of compliance rules. 

Before a token can be created, an issuer must either publish or reference a published [compliance specification](./compliance.md).


## Token Lifecycle
The standard for each step of a token's lifecycle is detailed below:

1. [Issuer - Creating a Token](#creating-a-token)
1. [Issuer - Distribute Token](#primary-distribution-of-a-token)
1. [Investor - Request Transfer](#requesting-a-transfer)
1. [Issuer - Approve Transfer](#approving-a-transfer)
1. [Issuer - Deny Transfer](#denying-a-transfer)
1. [Issuer - Update Token](#updating-a-token)

### 1. Creating a Token

To mint a new token, an issuer creates a "genesis transaction" wherein the compliance details, token details, and available token quantities are outlined. This will serve as a set of rules for future transactions to use.

#### Specification

|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|tokenName|String|false| `length <=26`| The name of the token |
|tokenSymbol|String|true| `length >= 3 && <= 5`| The symbol of the token for exchange and unique identification purposes |
|tokenQuantity|Int|true| ` > 0`|Total tokens available at initial offering|
|decimalPlaces|Int|false| `length<= 18`| Number of decimal places to honor|
|compliance|String|true| | Transaction ID where compliance spec was published within notes field. See [compliance specification](./compliance.md) for details |
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
    compliance: 'compliance-tx-id',
    details: {}
  }
}
```

#### Additional Notes / Restrictions
* A single issuer MUST NOT create more than one token with the same symbol



### 2. Primary Distribution of a Token

|Key|Type|Required|Additional Validation|
|----|----|----|----|
|quantity|Int|true| 
|tokenSymbol|String|true| `length >= 3 && length <= 5 `|
|details|Object|false||

Example: 
```js
{
  from: 'issuer-public-address',
  to: 'investor1-public-address',
  amt: 0,
  fee: 1,
  notes: {
    quantity: 300,
    tokenSymbol: 'MYT',
    details: {},
  }
}
```

### 3. Requesting a Transfer

Investors must indicate to the compliance manager that they are looking to trade tokens to another investor. The compliance manager must approve or deny each request.

|Key|Type|Required|Additional Validation|
|----|----|----|----|
|quantity|Integer|true| |
|toAddress|String|true||
|tokenSymbol|String|true| `length >= 3 && length <= 5 `|
|details|Object|false| | 

Transaction Part 1 Example: 
```js
{
  from: 'investor1-public-address',
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

### 4. Approving a Transfer

|Key|Type|Required|Additional Validation|
|----|----|----|----|
|transferStatus|String|true| must match approved statuses `['APPROVED', 'DENIED']`|
|transferTotal|Integer|true| |
|fromAddress|String|true||
|tokenSymbol|String|true| `length >= 3 && length <= 5 `|
|details|Object|false| | 


Transaction Part 2 Example: 
```js
{
  from: 'compliance-manager-public-address',
  to: 'investor2-public-address',
  amt: 0,
  fee: 1,
  notes: {
    transferStatus: 'APPROVED',
    transferTotal: 50,    
    fromAddress: 'investor1-public-address',
    tokenSymbol: 'MYT',
    details: {},
  }
}
```

### 5. Denying a Transfer

|Key|Type|Required|Additional Validation|
|----|----|----|----|
|transferStatus|String|true| must match approved statuses `['APPROVED', 'DENIED']`|
|transferTotal|Integer|true| |
|fromAddress|String|true||
|error|Object<Error>|true| must match error specification tied to [compliance specification](./compliance.md) |
|tokenSymbol|String|true| `length >= 3 && length <= 5 `|
|details|Object|false| | 

Transaction Part 2 Example: 
```js
{
  from: 'compliance-manager-public-address',
  to: 'investor2-public-address',
  amt: 0,
  fee: 1,
  notes: {    
    transferStatus: 'DENIED',
    transferTotal: 0,
    error: {
      errorCode: 14,
      errorMessage: 'Error code 14: Recipient KYC compliance status missing.',
    }
    fromAddress: 'investor1-public-address',
    tokenSymbol: 'MYT',
    details: {},
  }
}
```
