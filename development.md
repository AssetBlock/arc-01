# Development Notes

### Running

```
# install dependencies
npm install

# start tests in watch mode
npm run test -- --watch

# or try running a CLI command
arc1 create --tknSymbol=MYT --qty=10000 --decPlaces=18 --managers=WTDT3V7BTTS2O3MRMM2C77TQ2WAM7ILZGMTLFZ2YUDBNRDDDMBJFK6WWI4 --specLocation=CMGB5L4PEK4JYTDVV3DWTBUOBTKTJHAVEQPBQDDSUAQNBUM6FLVA
```

### Known Issues

- Finish writing out schemas for operations other than createToken
- Write tests to parse ajv responses when validating json schemas
- Write tests to measure size of payloads

### Looking for feedback

- Ways to cut down on encoded size after collecting and validating user input (encode.js)
- Add maximum buffer size to field values?
- Better [compliance standards](./compliance), perhaps building off of a spec that already exists, or at least using some more open standards
