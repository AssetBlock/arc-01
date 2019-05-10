# ARC-01

## Utility Tokens

This specification serves as the core baseline for the additional token types outlined in the rest of this repository.


### Key Terms

**Token**: Digitial representations of participant ownership of a good or service.

**Issuer**: The creator and owner of the token. Responsible for defining the compliance profile of their token (if required), as well as an address that will control distributions and prevent double-payments. Controls the private keys of the `issuer-address` account in the examples below.

**Participant**: A user who will receive, hold, and request transfers of tokens. Controls the private keys of their own `participant[n]-address` account in the examples below.

**Third-Party**: A manager or other non-participant stakeholder who can update or provide documents updating the status of a particular issued token.