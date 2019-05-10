# ARC-01

## Utility Tokens

This specification serves as the core baseline for the additional token types outlined in the rest of this repository.


### Key Terms

**Token**: Digitial representations of participant ownership of a good or service.

**Issuer**: The creator and owner of the token. Responsible for defining a standard Algorand address that will control distributions and prevent double-payments. Controls the private keys of the `issuer-address` account in the examples below.

**Manager**: The controlling algorand address that will control distributions and prevent double-payments. In the case of utility tokens, this will most likely be the issuer. The examples below assume the issuer address is also the manager of the tokens.

**Participant**: A user who will receive, hold, and request transfers of tokens. Controls the private keys of their own `participant[n]-address` account in the examples below.

**Third-Party**: A manager or other non-participant stakeholder who can update or provide documents updating the status of a particular issued token.


## Basic Workflow

1. **[Create a Token](#create-a-token)** - Issuer sends a "genesis transaction" to herself outlining token totals.
2. **[Requesting Issuance or Transfer of Tokens](#requesting-issuance-or-transfer-of-tokens)** - Issuer OR participant sends a "transfer request" to the manager of the token.
3. **[Approve Transfer](#approving-a-transfer)** - If approved, issuer sends an "approval transaction" to the participant with the details of the transfer.
4. **[Deny Transfer](#denying-a-transfer)** - If denied, issuer sends a "denial transaction" to the participant with additional details of why the transfer failed.


### Create a Token

To mint a new token, an issuer creates a "genesis transaction" wherein the compliance details, token details, and available token quantities are outlined. This will serve as a set of rules for future transactions to use.

#### Specification

| Key       | Type   | Required | Validation                                         | Description                                                                                                                                                             |
| --------- | ------ | -------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| txType    | String | true     | `length <=5`                                       | Unique standard identifier.                                                                                                                                             |
| opType    | String | true     | `length <=5`                                       | Operation type outlined by standard.                                                                                                                                    |
| tknName   | String | false    | `length <=26`                                      | The name of the token                                                                                                                                                   |
| tknSymbol | String | true     | `length >= 3 && <= 5`                              | The symbol of the token for exchange and unique identification purposes                                                                                                 |
| qty       | Number | true     | `> 0`                                              | Total tokens available at initial offering                                                                                                                              |
| decPlaces | Number | false    | `length<= 18`                                      | Number of decimal places to honor                                                                                                                                       |
| managers  | Array  | true     | `at least one item. items must have length === 58` | Public address of the manager who will oversee token distributions and other compliance efforts. This is assumed to be the issuer for utility tokens. |

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
    tknName: 'My Example Token',
    tknSymbol: 'MYT',
    qty: 10000,
    decPlaces: 16,
    managers: ['issuer-address'],
    meta: {}
  }
}
```

#### Additional Notes / Restrictions

- A single issuer **MUST NOT** create more than one token with the same symbol

### Requesting Issuance or Transfer of Tokens

In order to issue or transfer tokens the issuer or participant must indicate to the token manager that they are looking to transfer tokens. The manager must approve or deny token transfers moving forward.


#### Specification

| Key       | Type    | Required | Additional Validation                                                                                    | Description                                              |
| --------- | ------- | -------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| txType    | String  | true     | `length <=5`                                                                                             | Unique standard identifier.                              |
| opType    | String  | true     | `length <=5`                                                                                             | Operation type outlined by standard.                     |
| qty       | Integer | true     |                                                                                                          | Quantity of tokens to issue or transfer                  |
| toAddr    | String  | true     |                                                                                                          | Intended recipient address                               |
| tknSymbol | String  | true     | `length >= 3 && length <= 5`                                                                             | Required symbol for token                                |
| meta      | Object  | false    |                                                                                                          | Freeform metadata field                                  |

#### Example Algorand transaction payload:

```js
{
  from: 'issuer-address',
  to: 'issuer-address',
  amt: 0,
  fee: 1,
  notes: {
    txType: 'ARC01',
    opType: 'TRSFR',
    qty: 50,
    toAddr: 'participant-address',
    tknSymbol: 'MYT',
    meta: {},
  }
}
```

### Approving a Transfer

#### Specification

| Key       | Type    | Required | Additional Validation                            | Description                                                                        |
| --------- | ------- | -------- | ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| txType    | String  | true     | `length <=5`                                     | Unique standard identifier.                                                        |
| opType    | String  | true     | `length <=5`                                     | Operation type outlined by standard.                                               |
| tfrStatus | String  | true     | must match status codes `['APPROVED', 'DENIED']` | Confirmation as to whether or not the compliance checks passed for both parties    |
| tfrTotal  | Integer | true     |                                                  | Total number of tokens transferred                                                 |
| fromAddr  | String  | true     |                                                  | Sending address                                                                    |
| txnRef    | String  | true     | Must be valid transaction id                     | The transaction id of the originating transfer request from the issuer or investor |
| tknSymbol | String  | true     | `length >= 3 && length <= 5`                     | Unique token symbol from issuer                                                    |
| meta      | Object  | false    |                                                  | Freeform metadata field                                                            |

#### Example Algorand transaction payload:

```js
{
  from: 'issuer-address',
  to: 'participant-address',
  amt: 0,
  fee: 1,
  notes: {
    txType: 'ARC01',
    opType: 'APROV',
    tfrStatus: 'APPROVED',
    tfrTotal: 50,
    txnRef: `transaction-id-of-transfer-request`
    fromAddr: 'investor1-address',
    tknSymbol: 'MYT',
    meta: {},
  }
}
```

### Denying a Transfer

#### Specification

| Key       | Type    | Required | Additional Validation                                                                            | Description                                                                        |
| --------- | ------- | -------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| txType    | String  | true     | `length <=5`                                                                                     | Unique standard identifier.                                                        |
| opType    | String  | true     | `length <=5`                                                                                     | Operation type outlined by standard.                                               |
| tfrStatus | String  | true     | must match status codes `['APPROVED', 'DENIED']`                                                 | Confirmation as to whether or not the compliance checks passed for both parties    |
| tfrTotal  | Integer | true     |                                                                                                  | Total number of tokens transferred                                                 |
| fromAddr  | String  | true     |                                                                                                  | Sending address                                                                    |
| txnRef    | String  | true     | Must be valid transaction id                                                                     | The transaction id of the originating transfer request from the issuer or investor |
| errCode   | String  | true     | Must match error specification code defined in [compliance specification rules](./compliance.md) | Compliance error that prevented transfer from resolving                            |
| tknSymbol | String  | true     | `length >= 3 && length <= 5`                                                                     | Unique token symbol from issuer                                                    |
| meta      | Object  | false    |                                                                                                  | Freeform metadata field                                                            |

#### Example Algorand transaction payload:

```js
{
  from: 'issuer-address',
  to: 'participant-address',
  amt: 0,
  fee: 1,
  notes: {
    txType: 'ARC01',
    opType: 'DENY',
    tfrStatus: 'DENIED',
    txnRef: `transaction-id-of-transfer-request`
    tfrTotal: 0,
    errCode: 'RULE_01',
    fromAddr: 'issuer-address',
    tknSymbol: 'MYT',
    meta: {},
  }
}
```
