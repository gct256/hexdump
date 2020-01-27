const { outputExample, getTestData } = require('./common');

const { hexdumpUtils } = require('..');

const main = async () => {
  const data = getTestData(256);

  outputExample('DEFAULT', data);

  outputExample('static', data, {
    borders: {
      header: hexdumpUtils.DEFAULT_RULER,
      footer: hexdumpUtils.DEFAULT_RULER,
    },
  });

  outputExample('dynamic', data, {
    borders: {
      header: hexdumpUtils.DEFAULT_RULER,
      footer: hexdumpUtils.DEFAULT_RULER,
      beforeRow({ row, address }) {
        return row > 0 && address % 0x80 === 0
          ? hexdumpUtils.DEFAULT_RULER
          : [];
      },
    },
  });
};

main();
