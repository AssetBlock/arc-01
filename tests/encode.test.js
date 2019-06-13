const { encodePayload } = require('../src/encode.js');
const OVERSIZED_STRING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate dolor sit amet libero aliquet, quis euismod ligula ultrices. Vestibulum vel turpis accumsan, ornare ex vel, aliquet felis. Nam purus velit, pulvinar quis venenatis vitae, vehicula vel nisl. Nulla id odio ante. Nulla imperdiet sit amet metus ac bibendum. Phasellus bibendum placerat urna sit amet dapibus. Praesent ac ante orci. Quisque et leo porttitor, pretium est vitae, tempus nulla. Vestibulum consectetur maximus velit, sit amet dictum metus interdum a. Vivamus arcu risus, molestie nec eleifend placerat, sagittis id orci. Pellentesque finibus mi arcu, vitae iaculis leo faucibus eu. Etiam a lorem at lacus convallis tincidunt non sit amet ligula. Vivamus arcu orci, dictum vel dui eu, hendrerit convallis nunc. Etiam rutrum sem et enim posuere finibus. Donec tristique lacus eu arcu porttitor, et accumsan dui tempus. Maecenas vulputate ac neque in tempor Pellentesque interdum mauris vitae purus volutpat, in accumsan nulla bibendum. Duis scelerisque tellus at eros accumsan, eu vestibulum mauris malesuada. Mauris sed.';

it('prevents oversized notes field', () => {
  expect(() => {
    encodePayload('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
      meta: {
        too_large: OVERSIZED_STRING,
      },
    })
  }).toThrow();
});

it('allows notes field within size limit', () => {
  expect(
    encodePayload('CREATE', {
      tknSymbol: 'TEST',
      qty: 1000000,
      decPlaces: 18,
    })
  ).toEqual({
    txType: 'ARC01',
    opType: 'CREATE',
    tknSymbol: 'TEST',
    qty: 1000000,
    decPlaces: 18,
  });
});