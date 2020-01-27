const { outputExample, getTestData } = require('./common');

const main = async () => {
  outputExample('number[]', getTestData(42));

  outputExample('string', 'All your base area belong to\u3000us.');

  outputExample('8bit Array', Uint8Array.from(getTestData(42)));
  outputExample(
    '16bit Array (little endian)',
    Uint16Array.from(getTestData(42)),
  );
  outputExample('32bit Array (big endian)', Uint32Array.from(getTestData(42)), {
    endianness: 'big',
  });

  outputExample('Buffer', Buffer.from(getTestData(42)));
};

main();
