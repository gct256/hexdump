const { outputExample, getTestData } = require('./common');

const main = async () => {
  const data = getTestData(42);

  outputExample('DEFAULT', data);

  outputExample('decimal', data, {
    formatters: {
      address: ({ address }) => address.toString(10).padStart(9, '0'),
      hex: ({ value, outOfRange }) =>
        outOfRange ? '   ' : value.toString(10).padStart(3),
    },
  });

  outputExample('octal', data, {
    formatters: {
      address: ({ address }) => address.toString(8).padStart(9, '0'),
      hex: ({ value, outOfRange }) =>
        outOfRange ? '   ' : value.toString(8).padStart(3, '0'),
    },
  });

  outputExample('emoji (0x1f400 + n)', data, {
    formatters: {
      char: ({ value, outOfRange }) =>
        outOfRange ? '' : `${String.fromCodePoint(0x1f400 + value)} `,
    },
  });
};

main();
