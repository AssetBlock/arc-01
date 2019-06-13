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
// {"txType":"ARC01","opType":"CREATE","tknName":"AssetBlock​ ​Token",tknSymbol":"ABT","qty":10000,"decPlaces":12}
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

* [Security Token Schema Docs](./docs/security-tokens.md)

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
