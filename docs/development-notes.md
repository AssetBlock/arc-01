# Development Notes

### Known Issues

- Split out security token functions from basic tokens in code
- Finish writing out schemas for remaining operations
  - Hash validation
  - Conditions for token distribution
- Hook up CLI functions to all operations
- Add better input sanitization
- Write tests to parse ajv responses when validating json schemas
- Better error output
- Write unit tests to measure size of payloads
- Upgrade compliance example to v7 json-schema spec (with conditional support)
- Investigate output format schema that optimizes for space

### Looking for feedback

- Ways to cut down on encoded size after collecting and validating user input (encode.js)
- Add maximum buffer size to field values?
- Better [compliance standards](./compliance.md), perhaps building off of a spec that already exists, or at least using some better open standards for indidivudal properties

### Running

```
# install dependencies
npm install

# start tests in watch mode
npm run test -- --watch

# or try running a CLI command
arc1 create --tknSymbol=MYT --qty=10000 --decPlaces=18 --managers=WTDT3V7BTTS2O3MRMM2C77TQ2WAM7ILZGMTLFZ2YUDBNRDDDMBJFK6WWI4 --specLocation=CMGB5L4PEK4JYTDVV3DWTBUOBTKTJHAVEQPBQDDSUAQNBUM6FLVA
```
