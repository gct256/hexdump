// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk');

const { outputExample, getTestData } = require('./common');

const { chalkToDecorator } = require('..');

const main = async () => {
  const data = getTestData(84);

  outputExample('DEFAULT', data);

  outputExample('colored', data, {
    decorators: {
      address: chalkToDecorator(chalk.green),
      afterAddress: chalkToDecorator(chalk.dim),
      hex: (s, { value }) => {
        if (value < 0x20) return chalk.blue.dim(s);

        if (value < 0x80) return chalk.blue.bold(s);

        return chalk.blue(s);
      },
      char: (s, { value }) => {
        if (value < 0x20) return chalk.yellow.dim(s);

        if (value < 0x80) return chalk.yellow.bold(s);

        return chalk.yellow(s);
      },
      beforeChars: chalkToDecorator(chalk.dim),
      afterChars: chalkToDecorator(chalk.dim),
    },
  });

  outputExample('striped', data, {
    decorators: {
      row: (s, { row }) => (row & 1 ? chalk.dim(s) : s),
    },
  });

  outputExample('checker board', data, {
    decorators: {
      hex: (s, { row, col }) => ((row + col) & 1 ? chalk.dim(s) : s),
    },
  });

  const values = [0x11, 0x22, 0x33, 0x44];
  const addresses = [0x12, 0x34, 0x56, 0x78];

  outputExample('highlight', data, {
    decorators: {
      hex: (s, { value, address, outOfRange }) =>
        !outOfRange && (values.includes(value) || addresses.includes(address))
          ? chalk.inverse(s)
          : s,
      char: (s, { value, address, outOfRange }) =>
        !outOfRange && (values.includes(value) || addresses.includes(address))
          ? chalk.inverse(s)
          : s,
    },
  });
};

main();
