import typescript2 from 'rollup-plugin-typescript2';
import autoExternal from 'rollup-plugin-auto-external';

const isProduction = process.env.NODE_ENV === 'production';

const base = {
  input: './src/index.ts',
  plugins: [
    autoExternal(),
    typescript2({
      tsconfigOverride: {
        compilerOptions: {
          declaration: isProduction,
          declarationDir: './types',
        },
        include: [
          './src/index.ts',
          './src/modules/Options.ts',
          './src/modules/Context.ts',
          './src/modules/OutputData.ts',
          './src/missing.d.ts',
        ],
        exclude: ['./node_modules/**/*.*'],
      },
      useTsconfigDeclarationDir: true,
    }),
  ],
};

const targets = [
  {
    ...base,
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
  },
  {
    ...base,
    output: {
      file: './lib/index.mjs',
      format: 'es',
    },
  },
];

// eslint-disable-next-line import/no-default-export
export default targets;
