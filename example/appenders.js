const { outputExample, getTestData } = require('./common');

const main = async () => {
  const data = getTestData(84);

  outputExample('DEFAULT', data);

  outputExample('static', data, {
    appenders: {
      beforeAddress: '[',
      afterAddress: ']:',
    },
  });

  outputExample('function', data, {
    appenders: {
      beforeAddress: ({ row }) => (row % 2 === 0 ? '[' : '<'),
      afterAddress: ({ row }) => (row % 2 === 0 ? ']:' : '>:'),
    },
  });

  outputExample('disableDefaultAppender', data, {
    disableDefaultAppender: true,
  });
};

main();
