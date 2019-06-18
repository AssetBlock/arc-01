# ARC-01

An open source hybrid token standard for Algorand

## Summary

While Algorand develops its borderless economy for business, it’s essential to design and develop a  token standard to drive adoption and provide a solid token issuer and participant experience. `ARC-01` seeks to establish a “hybrid” token framework that takes advantage of the technology that Algorand will release along with their MainNet, coupled with additional modules that take advantage of standard equity or securities tokens (accompanied by manual compliance verification processes) from trusted third-parties.

### Basic Tokens

Basic tokens are tracked via a structured data payload sent via the `notes` field of a standard Algorand transaction. This transaction should be sent from an issuer of the token back to the same issuer address as the issuer will be repsonsible for preventing dual spending and keeping track of available quantities.

* [Basic Token Schema Docs](./docs/basic-tokens.md)

#### Create Basic Token Example

Create a basic token note field payload

```javascript
createBasicToken({
  tknName: 'AssetBlock Token',
  tknSymbol: 'ABT',
  qty: 10000,
  decPlaces: 12,
});

// Returns:
// {"txType":"ARC01","opType":"ISSUE","tknName":"AssetBlock​ ​Token",tknSymbol":"ABT","qty":10000,"decPlaces":12}
```

#### Transfer Basic Token Example

Transfer a basic token note field payload from one account to another

```javascript

transferBasicToken({
  tknSymbol: 'ABT',
  tfrTotal: 100,
  toAddr: 'GIN5NAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBETY4QMOYXMH6RWRZEIEA',
  fromAddr: 'GIN5NAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBETY4QMOYXMH6RWRZEIEA'
});

// Returns:
// {"txType":"ARC01","opType":"TRANSFER","tknSymbol":"ABT","tfrTotal":100,"toAddr":"GIN5NAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBETY4QMOYXMH6RWRZEIEA",fromAddr":"GIN5NAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBETY4QMOYXMH6RWRZEIEA"}
```

#### Simple Algorand SDK Example

```javascript
const txn = {
  from: recoveredAccount.addr,
  to: recoveredAccount.addr,
  fee: params.fee,
  amount: 0,
  firstRound: params.lastRound,
  lastRound: endRound,
  genesisID: params.genesisID,
  genesisHash: params.genesishashb64,
  note: createBasicToken({
    tknName: 'Example Token',
    tknSymbol: 'EXT',
    qty: 1000000,
    decPlaces: 12,
  }),
};
signTransaction(txn, recoveredAccount.sk);
```



### Security Tokens (work in progress)

The security token standard aims to create an **economy of choice** for issuers of security tokens to decide who will manage and control the compliance of their tokens by proposing a standard for compliance verification including investor validation checks, distributions, interventions, and error states all published to the Algorand blockchain.

* [Security Token Schema Documentation](./docs/security-tokens.md)


### Security Token Examples

#### Create new security token
Create a security token note field payload

```javascript
import { createSecurityToken } from '@assetblock/arc-01';

createSecurityToken({
  tknName: 'TEST',
  tknSymbol: 'ABT',
  qty: 1000000,
  managers: ['CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA'],
  decPlaces: 18,
  specLocation: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
})
```

#### Request transfer of security tokens
Create a security token transfer request for use in a transaction's notes payload

```javascript
import { requestSecurityTokenTransfer } from '@assetblock/arc-01';

requestSecurityTokenTransfer({
  tknSymbol: 'ABT',
  type: 'CHECK',
  qty: 1000,
  toAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
});
```

#### Approve transfer of security tokens
Approve a security token transfer request via a transaction's notes payload

```javascript
import { approveSecurityTokenTransfer } from '@assetblock/arc-01';

approveSecurityTokenTransfer({
  tknSymbol: 'ABT',
  tfrStatus: 'APPROVED',
  tfrTotal: 1000,
  fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
  txnRef: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
});
```

#### Deny transfer of security tokens
Deny a security token transfer request via a transaction's notes payload

```javascript
import { denySecurityTokenTransfer } from '@assetblock/arc-01';

denySecurityTokenTransfer({
  tknSymbol: 'ABT',
  tfrStatus: 'DENIED',
  tfrTotal: 0,
  fromAddr: 'CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA',
  txnRef: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
  errCode: 'NO_FUNDS'
});
```

#### Update security token compliance details
Update a security token's compliance profile via a transaction's notes payload

```javascript
import { updateSecurityTokenCompliance } from '@assetblock/arc-01';

updateSecurityTokenCompliance({
  tknSymbol: 'ABT',
  managers: ['CINCNAPB2RLDUCS3EVDLURZZD742TMWRQEZ4CBEWF2QMOYXMH6RWRZEIEA'],
  specTxn: 'HAPSLYCU5MICI7KJLQA5IYU2ZUIXRSJUUKGPXL6MIGJ2QNAKGL5Q',
});
```

#### Add security token document
Add a document link to a security token's profile via a transaction's notes payload

```javascript
import { addSecurityTokenDocument } from '@assetblock/arc-01';

addSecurityTokenDocument({
  tknSymbol: 'MYT',
  docs: [{
    link: 'https://token.com/1.json',
    hash: '256:b5c9267b1710869e5d1c1b34de970d6594fe0010706e6b7366c42d7151728a50',
  }],
});
```

#### Update token distributions
Update a security token's distribution details via a transaction's notes payload

```javascript
import { updateSecurityTokenDistribution } from '@assetblock/arc-01';

// Split
updateSecurityTokenDistribution({
  tknSymbol: 'MYT',
  type: 'SPLIT',
  ratio: '3:1',
});

// Issue more equity
updateSecurityTokenDistribution({
  tknSymbol: 'MYT',
  type: 'ISSUE_MORE_EQUITY',
  qty: 10000,
});

// Burn after buyback
updateSecurityTokenDistribution({
  tknSymbol: 'MYT',
  type: 'BURN_AFTER_BUYBACK',
  qty: 2500,
});

```


### Important Considerations

- This standard is not appropriate for currency tokens as it always assumes a centralized manager will be responsible for distributions and avoiding "double-spend" scenarios
- The standards in this repo rely on the transaction `notes` field to track and manage token distribution and compliance actions. Due to this requirement, all payloads must remain within the [maximum encoded 1k size](https://developer.algorand.org/docs/javascript-sdk#node-example-note-write)
- When possible, this spec currently prioritizes a **transaction-only** approach, in that any computed properties that can be derived from looking at a history of transfers will not be specified in this document. This keeps the burden of proof purely on the chain, rather than on the issuer or investors having to update transaction details or totals. This also opens up a potential path for the development of custom interpretation engines or smart contract support to be added incrementally over time.
  - Example: To approve a transfer of tokens from investor1 to investor2, the compliance manager is not required to update the chain with the total number of held tokens by each, but rather only show the number of tokens that were added or removed from their relative balances.

### Contributing

This proposal is in active development, and is likely to change frequently with feedback from the community. We hope that this repository and the associated schemas serve as an inspiration for others to improve this specification moving forward.

```javascript
// Run tests on code change
npm run test -- --watchAll
```
