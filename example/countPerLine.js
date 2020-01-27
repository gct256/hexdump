const { outputExample, getTestData } = require('./common');

const main = async () => {
  const data = getTestData(42);

  outputExample('default (16)', data);
  outputExample('countPerLine = 8', data, { countPerLine: 8, end: 0x3f });
  outputExample('countPerLine = 17', data, { countPerLine: 17 });
};

main();
