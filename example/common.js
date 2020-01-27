const { hexdump } = require('..');

const outputExample = (title, buffer, options = {}) => {
  console.debug('');
  console.debug(`### ${title}`);
  console.debug('');
  console.debug(hexdump(buffer, options).join('\n'));
};

const getTestData = (count) => {
  const result = [];

  for (let i = 0; i < count; i += 1) {
    result.push(i * 7);
  }

  return result;
};

module.exports = { outputExample, getTestData };
