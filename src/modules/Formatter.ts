import { Context } from './Context';
import { utils } from './utils';

export type FormatterResult = {
  body: string;
  printable: boolean;
};
export type Formatter = (context: Context) => string | FormatterResult;
export type FormatterSection = 'address' | 'hex' | 'char';
export type FormatterMap = { [key in FormatterSection]?: Formatter };

const emptyFormatter: Formatter = () => ({
  body: '',
  printable: true,
});

const defaultFormatterMap: Required<FormatterMap> = {
  address: ({ address }: Context) => utils.getHex(address, 8, true),
  hex: ({ value, outOfRange }: Context) =>
    outOfRange ? '  ' : utils.getHex(value, 2),
  char: ({ value, outOfRange }: Context) =>
    outOfRange ? ' ' : utils.getChar(value),
};

const getFormatter = (
  section: FormatterSection,
  formatterMap: FormatterMap,
): Formatter => {
  const formatter = formatterMap[section];

  if (formatter !== undefined) return formatter;

  const defaultFormatter = defaultFormatterMap[section];

  if (defaultFormatter !== undefined) return defaultFormatter;

  return emptyFormatter;
};

export class FormatterFilter {
  private formatters: Required<FormatterMap>;

  public constructor(formatterMap?: FormatterMap) {
    this.formatters = {
      ...defaultFormatterMap,
      ...(formatterMap !== undefined ? formatterMap : {}),
    };
  }

  public address(context: Context): FormatterResult {
    return this.normalize(this.formatters.address(context));
  }

  public hex(context: Context): FormatterResult {
    return this.normalize(this.formatters.hex(context));
  }

  public char(context: Context): FormatterResult {
    return this.normalize(this.formatters.char(context));
  }

  private normalize(value: string | FormatterResult): FormatterResult {
    if (typeof value === 'string') {
      return { body: value, printable: true };
    }

    return value;
  }
}

export const format = (
  section: FormatterSection,
  context: Context,
  formatterMap: FormatterMap,
): FormatterResult => {
  const formatted = getFormatter(section, formatterMap)(context);

  if (typeof formatted === 'string') {
    return { body: formatted, printable: true };
  }

  return formatted;
};
