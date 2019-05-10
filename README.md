# ARC-01

An open source hybrid token standard for Algorand

## Summary

While Algorand develops its borderless economy for business, it’s essential to design and develop a  token standard to drive adoption and provide a solid token issuer and participant experience. `ARC-01` seeks to establish a “hybrid” token framework that takes advantage of the technology that Algorand will release along with their MainNet, coupled with additional modules that take advantage of standard equity or securities tokens (accompanied by manual compliance verification processes) from trusted third-parties.

### Important Considerations

- This standard is not appropriate for currency tokens as it assumes a centralized manager
- The standards in this repo rely on the transaction `notes` field to track and manage token distribution and compliance actions. Due to this reliance, all payloads must remain within the [maximum encoded 1k size](https://developer.algorand.org/docs/javascript-sdk#node-example-note-write)
- As this standard develops, we continue to look for better cost-saving measures
- When possible, this spec currently prioritizes a **transaction-only** approach, in that any computed properties that can be derived from looking at a history of transfers will not be specified in this document. This keeps the burden of proof purely on the chain, rather than on the issuer or investors having to update transaction details or totals. This also opens up a potential path for the development of custom interpretation engines or smart contract support to be added incrementally over time.
  - Example: To approve a transfer of tokens from investor1 to investor2, the compliance manager is not required to update the chain with the total number of held tokens by each, but rather only show the number of tokens that were added or removed from their relative balances.

## Message to Developers

This is NOT a production-ready repo (yet). We are building proof-of-concept tools in this repo while collecting feedback from the community. Any feedback about our CLI, unit testing, or other opportunities to improve the standard specs are much appreciated. More details in the
[development notes here](./docs/development-notes.md).

### Modules

* [Utility Tokens](./docs/utility-tokens.md)
* [Investment/Security Tokens](./docs/security-tokens.md)
