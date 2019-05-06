# ARC-01
A open source hybrid security token standard proposal for Algorand

## Summary
While Algorand develops its borderless economy for business, it’s essential to design and develop a compliant security token standard to drive adoption and provide a solid security token issuer and investor experience. `ARC-01` seeks to establish a “hybrid” security token framework taking advantage of the technology that Algorand will release along with their MainNet, coupled with the advantages of any manual compliance verification process from trusted third-parties.

This standard is driven by a continued observation in existing blockchain ecosystems; That any blockchain, regardless of its  implementation of “smart contract” technology, cannot support a purely **touchless** security token standard to the satisfaction of any governing regulatory body while _also_ protecting the issuer’s choice of who to share their sensitive personal information with. In existing ecosystems implementing smart contracts, issuers develop their own proprietary whitelists while collecting sensitive investor information. This creates multiple centralized points of failure that gives investors less control over their privacy, and dissuades them from diversifying into alternative investments or even breaking into blockchain investing in the first place.

In a system implementing a mature `ARC-01` standard (following community review and feedback), this would be mitigated. This standard aims to create an **economy of choice** for issuers of security tokens to decide who will manage and control the compliance of their tokens by proposing a standard for compliance verification including investor validation checks, distributions, interventions, and error states all published to the Algorand blockchain.

This standard also aims to create an ecosystem wherein investors can trust any one single compliance provider and tie that compliance profile to their account(s). Any compliance body adhering to the `ARC-01` standard would be able to confirm an investor’s compliance profile, which creates an abundance of choice for investors to choose any compliant legal entity adhering to the standard. Issuers would no longer require any additional sensitive personal information from investors, allowing investors a powerful control over their own financial profile and personal data while only ever having to keep it updated in one place.


### Important Considerations

* The following standard relies on the transation `notes` field to track and manage token distrubutions and compliance actions. Due to this reliance, all payloads must remain within the [maximum encoded 1k size](https://developer.algorand.org/docs/javascript-sdk#node-example-note-write). This standard makes it a priority whenever possible to keep payload sizes manageable.
* Whenever possible, information sent in the notes field will adhere to a **transaction-only** approach, in that any computed properties that can be derived from looking at a history of transfers will not be specified in this document. This keeps the burden of proof purely on the chain, rather than on the issuer or investors having to update transaction details or totals. This also opens up a potential path for the development of custom interpretation engines or smart contract support to be added incrementally over time.
** Example: To approve a transfer of tokens from investor1 to investor2, the compliance manager is not required to update the chain with the total number of held tokens by each, but rather only show the number of tokens that were added or removed from their relative balances.


### Key Terms

For the purposes of the doc below we are using the following key terms:

**Token**: Digitial representations of ownership functioning as a traditional security asset.

**Issuer**: The creator and owner of the token controlling the securities the token represents. Responsible for defining the compliance profile of their token, as well as an address of an approved `compliance manager`. Controls the private keys of the `issuer-address` account in the examples below.

**Investor**: An investor who will receive, hold, and request transfers of tokens. Controls the private keys of their own `investor[n]-address` account in the examples below.

**Third-Party**: A manager or other non-investor stakeholder who can update or provide documents updating the status of a particular issued security token.

**Compliance Manager**: A delegate of the issuer, or the issuer themselves, who has authority to verify that the accounts involved in a transaction adhere to the rules set forth in the token's [compliance specification](./compliance.md). Controls the private keys of the `compliance-manager-address` account in the examples below.


## Compliance

Before a token may be created, an issuer must either publish or reference a published [compliance specification](./compliance.md) transaction on the blockchain that their token will adhere to. The `compliance-manager-address` requirement in the [Create a Token](#create-a-token) transaction below will be responsible for token distributions and balance changes moving forward.


## Token Lifecycle
The standard for each step of a token's lifecycle is detailed below:

|Step|Initiating Role|
|----|----|
|[Create a Token](#create-a-token)|Issuer|
|[Requesting Issuance or Transfer of Tokens](#requesting-issuance-or-transfer-of-tokens)|Issuer or Investor|
|[Approve Transfer](#approving-a-transfer)|Compliance Manager|
|[Deny Transfer](#denying-a-transfer) | Compliance Manager|
|[Update Token Compliance Details](#updating-token-compliance-details) | Issuer |
|[Adding Token Documents](#adding-token-documents)|Investor or Third Party|
|[Request Update to Token Distribution](#request-update-to-token-distribution) | Issuer |

### Create a Token

To mint a new token, an issuer creates a "genesis transaction" wherein the compliance details, token details, and available token quantities are outlined. This will serve as a set of rules for future transactions to use.

#### Specification
|Key|Type|Required|Validation|Description|
|----|----|----|----|----|
|tknName|String|false| `length <=26`| The name of the token |
|tknSymbol|String|true| `length >= 3 && <= 5`| The symbol of the token for exchange and unique identification purposes |
|qty|Number|true| ` > 0`|Total tokens available at initial offering|
|decPlaces|Number|false| `length<= 18`| Number of decimal places to honor|
|compliance|Object|true| | Contains Transaction ID where compliance spec was published within notes field and an array of at least one compliance manager address. See [compliance specification](./compliance.md) for details |
|meta|Object|false|| A utility field for additional metadata for use by the issuer or to provide more information|


#### Example Algorand transaction payload:
```js
{
  from: 'issuer-public-address',
  to: 'issuer-public-address',
  amt: 0,
  fee: 1,
  notes: {
    tknName: 'MyToken',
    tknSymbol: 'MYT',
    qty: 10000,
    decPlaces: 16,
    compliance: {
      managers: ['compliance-manager-address'],
      specLocation: 'compliance-tx-id',
    },
    meta: {}
  }
}
```

#### Additional Notes / Restrictions
* A single issuer **MUST NOT** create more than one token with the same symbol

### Requesting Issuance or Transfer of Tokens

In order to issue or transfer tokens the issuer or investor must indicate to a specified compliance manager that they are looking to transfer tokens. The compliance manager must approve or deny token transfers moving forward.

##### Transfer Request Types

**BASIC**: A standard transfer used for primary issuance and secondary market transfers. The requesting party expects a transfer to be honored pending the proper checks.

**CHECK**: A facsimile of a real transfer. Compliance manager would post a transaction that indicates whether or not a transfer would be  approved or denied with transfer quantity 0 in either case.

**FORCE**: A forced transfer, required by law, compliance, legal settlement, etc. Issuer sends request to compliance manager with reason, perhaps even hashing the court order, which is securely stored off-chain.  This mirrors a standard transfer within the standard.

#### Specification
|Key|Type|Required|Additional Validation|Description|
|----|----|----|----|----|
|qty|Integer|true||Quantity of tokens to issue or transfer|
|type|String|true|Must be equal to one of the possible fixed-length request type constant codes: `BASIC`, `FORCE`, `CHECK`| The type of request being made of the compliance manager |
|toAddr|String|true||Intended recipient address|
|tknSymbol|String|true| `length >= 3 && length <= 5 `|Required symbol for token|
|meta|Object|false||Freeform metadata field|


#### Example Algorand transaction payload:
```js
{
  from: 'investor1-address|issuer-address',
  to: 'compliance-manager-address',
  amt: 0,
  fee: 1,
  notes: {
    qty: 50,
    type: 'CHECK',
    toAddr: 'investor2-address',
    tknSymbol: 'MYT',
    meta: {},
  }
}
```

#### Additional Notes / Restrictions
* The `FORCE` transfer function could also be used in the case of lost keys. The issuer and compliance manager could force transfer from a locked account to a new account.

### Approving a Transfer

#### Specification
|Key|Type|Required|Additional Validation|Description|
|----|----|----|----|----|
|tfrStatus|String|true| must match status codes `['APPROVED', 'DENIED']`| Confirmation as to whether or not the compliance checks passed for both parties|
|tfrTotal|Integer|true| | Total number of tokens transferred |
|fromAddr|String|true||Sending address|
|txnRef|String|true|Must be valid transaction id|The transaction id of the originating transfer request from the issuer or investor|
|tknSymbol|String|true| `length >= 3 && length <= 5 `| Unique token symbol from issuer |
|meta|Object|false| |Freeform metadata field|


#### Example Algorand transaction payload:
```js
{
  from: 'compliance-manager-address',
  to: 'investor2-address',
  amt: 0,
  fee: 1,
  notes: {
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
|Key|Type|Required|Additional Validation|Description|
|----|----|----|----|----|
|tfrStatus|String|true| must match status codes `['APPROVED', 'DENIED']`| Confirmation as to whether or not the compliance checks passed for both parties|
|tfrTotal|Integer|true| | Total number of tokens transferred |
|fromAddr|String|true||Sending address|
|txnRef|String|true|Must be valid transaction id|The transaction id of the originating transfer request from the issuer or investor|
|errCode|String|true| Must match error specification code defined in [compliance specification rules](./compliance.md) | Compliance error that prevented transfer from resolving|
|tknSymbol|String|true| `length >= 3 && length <= 5 `| Unique token symbol from issuer |
|meta|Object|false| |Freeform metadata field|


#### Example Algorand transaction payload:
```js
{
  from: 'compliance-manager-address',
  to: 'investor2-address',
  amt: 0,
  fee: 1,
  notes: {
    tfrStatus: 'DENIED',
    txnRef: `transaction-id-of-transfer-request`
    tfrTotal: 0,
    errCode: 'RULE_01',
    fromAddr: 'investor1-address',
    tknSymbol: 'MYT',
    meta: {},
  }
}
```


### Updating Token Compliance Details

#### Specification
|Key|Type|Required|Additional Validation|Description|
|----|----|----|----|----|
|tknSymbol|String|true| `length >= 3 && <= 5`| The symbol of the token for exchange and unique identification purposes |
|compliance|Object|true| | Contains Transaction ID where compliance spec was published within notes field and an array of at least one compliance manager address. See [compliance specification](./compliance.md) for details |

#### Example Algorand transaction payload:
```js
{
  from: 'issuer-address',
  to: 'issuer-address',
  amt: 0,
  fee: 1,
  notes: {
    tknSymbol: 'MYT',
    compliance: {
      managers: ['compliance-manager-address'],
      specTxn: 'compliance-tx-id',
    },
  }
}
```





### Adding Token Documents

#### Specification
|Key|Type|Required|Additional Validation|Description|
|----|----|----|----|----|
|tknSymbol|String|true| | Symbol of the token to apply documents to |
|docs|Array|true|Array must contain at least object containing `link` and `hash` for verification. The `hash` property should contain a `SHA-3` checksum. The length [`224`, `256`, `384`, `512`] followed by a `:` character must precede checksum value|The issuer or any third party submits a publicly-accessible document location for storing data about the token. |

#### Example Algorand transaction payload:
```js
{
  from: 'issuer-address',
  to: 'issuer-address',
  amt: 0,
  fee: 1,
  notes: {
    tknSymbol: 'MYT',
    docs: [{
      link: 'https://token.com/1.json',
      hash: '256:b5c9267b1710869e5d1c1b34de970d6594fe0010706e6b7366c42d7151728a50',
    }],
  },
}
```


### Request Update to Token Distribution

#### Specification
|Key|Type|Required|Additional Validation|Description|
|----|----|----|----|----|
|type|string|true|Must be valid distribution type: `SPLIT`, `ISSUE_MORE_EQUITY`, or `BURN_AFTER_BUYBACK`| The type of re-distribution the issuer is requesting|
|ratio|string|`if type === 'ISSUE_MORE_EQUITY'`|Two numbers joined by a `:` character in a string|The ratio in which the split should occur|
|qty|number|`if type === 'ISSUE_MORE_EQUITY' or type === 'BURN_AFTER_BUYBACK'`||Number of tokens to add or burn|
|txnId|string|`if type === 'BURN_AFTER_BUYBACK'`|Valid transaction ID| The id of the transaction that approved a buyback of an issuer from an investor|

#### Example Algorand transaction payload:
```js
{
  from: 'issuer-address',
  to: 'compliance-manager-address',
  amt: 0,
  fee: 1,
  notes: {
    // Split distribution options
    type: 'SPLIT',
    ratio: '3:1',

    // Issue More Equity distribution options
    type: 'ISSUE_MORE_EQUITY',
    qty: 5000,

    // Burn After Buyback distribution options
    type: 'BURN_AFTER_BUYBACK',
    txnId: 'transaction-id-of-approved-buyback',
    qty: 50
  }
}
```

#### Additional Notes / Restrictions
* In the instance of a `SPLIT`, pending approval from the compliance manager, the compliance manager will post an "APPROVE" transaction for each investor treating this as the reference transaction.