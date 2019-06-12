# ARC-01


## Request/Approve/Deny Workflow

2. **[Requesting Issuance or Transfer of Tokens](#requesting-issuance-or-transfer-of-tokens)** - Issuer OR participant sends a "transfer request" to the manager of the token.
3. **[Approve Transfer](#approving-a-transfer)** - If approved, issuer sends an "approval transaction" to the participant with the details of the transfer.
4. **[Deny Transfer](#denying-a-transfer)** - If denied, issuer sends a "denial transaction" to the participant with additional details of why the transfer failed.


## Requesting Tokens

This specification enhances the [basic-token](./basic-tokens.md) outline, allowing participants to request transfers and having an issuing authority approve or deny these requests.

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