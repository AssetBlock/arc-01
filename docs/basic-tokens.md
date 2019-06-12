# ARC-01

## Basic Tokens

This specification serves as the core baseline requirements of a token, handled by a centralized issuer that is responsible for tracking token totals and communicating distributions.

### Key Terms

**Token**: Digitial representation of value within a network.

**Issuer**: The creator and owner of the token. Responsible for defining a standard Algorand address that will control distributions and prevent double-payments. Controls the private keys of the `issuer-address` account in the examples below.

**Participant**: A user who will receive, hold, and request transfers of tokens. Controls the private keys of their own `participant[n]-address` account in the examples below.


## Basic Workflow

1. **[Create a Token](#create-a-token)** - Issuer sends a "genesis transaction" to herself outlining token totals.
2. **[Transfering Tokens](#)** -- Issuer sends a "transfer transaction" to herself outlining new token distribution and totals.

### Create a Token

To mint a new token, an issuer creates a "genesis transaction" wherein the token details and available token quantities are outlined.

#### Specification

| Key       | Type   | Required | Validation                                         | Description                                                                                                                                                             |
| --------- | ------ | -------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| txType    | String | true     | `length <=5`                                       | Unique standard identifier.                                                                                                                                             |
| opType    | String | true     | `length <=5`                                       | Operation type outlined by standard.                                                                                                                                    |
| tknName   | String | false    | `length <=26`                                      | The name of the token                                                                                                                                                   |
| tknSymbol | String | true     | `length >= 3 && <= 5`                              | The symbol of the token for exchange and unique identification purposes                                                                                                 |
| qty       | Number | true     | `> 0`                                              | Total tokens available at initial offering                                                                                                                              |
| decPlaces | Number | false    | `length<= 18`                                      | Number of decimal places to honor                                                                                                                                       |
| meta | Object | false | | A utility field for additional metadata for use by the issuer to provide more information |

#### Example Algorand transaction payload:

```js
{
  from: 'issuer-public-address',
  to: 'issuer-public-address',
  amt: 0,
  fee: 1,
  notes: {
    txType: 'ARC01',
    opType: 'CREATE',
    tknName: 'Example Token',
    tknSymbol: 'MYT',
    qty: 10000,
    decPlaces: 16,
    meta: {}
  }
}
```

#### Additional Notes / Restrictions

- A single issuer account **MUST NOT** create more than one token with the same symbol



### Distribute Tokens

To distribute tokens, an issuer posts a transaction to herself with the proper allocations made in the notes field of the transaction.

#### Specification

| Key       | Type   | Required | Validation                                         | Description                                                                                                                                                             |
| --------- | ------ | -------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| txType    | String | true     | `length <=5`                                       | Unique standard identifier.                                                                                                                                             |
| opType    | String | true     | `length <=5`                                       | Operation type outlined by standard.                                                                                                                                    |
| tknSymbol | String | true     | `length >= 3 && <= 5`                              | The symbol of the token for exchange and unique identification purposes                                                                                                 |
| qty       | Number | true     | `> 0`                                              | Total tokens available at initial offering                                                                                                                              |
| toAddr    | String  | true     |                                                                                                          | Intended recipient address                               |
| meta | Object | false | | A utility field for additional metadata for use by the issuer to provide more information |

#### Example Algorand transaction payload:

```js
{
  from: 'issuer-public-address',
  to: 'issuer-public-address',
  amt: 0,
  fee: 1,
  notes: {
    txType: 'ARC01',
    opType: 'TRNSFR',
    tknSymbol: 'MYT',
    qty: 1000,
    toAddr: 'participant-address',
    meta: {}
  }
}
```


