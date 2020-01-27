const { outputExample, getTestData } = require('./common');

const main = async () => {
  const data = getTestData(42);

  outputExample('DEFAULT', data);
  outputExample('start = 0x12', data, { start: 0x12 });
  outputExample('end = 0x12', data, { end: 0x12 });
  outputExample('start = 0x12, end = 0x24', data, { start: 0x12, end: 0x24 });
};

main();
