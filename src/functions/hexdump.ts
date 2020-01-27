import { Options } from '../modules/Options';
import { BufferLike, getBuffer } from '../modules/BufferLike';
import { Context } from '../modules/Context';
import { FormatterFilter } from '../modules/Formatter';
import { DecoratorFilter } from '../modules/Decorator';
import { AppenderFilter } from '../modules/Appender';
import { BorderFilter } from '../modules/Border';

const defaultOptions: Options = {
  countPerLine: 16,
  endianness: 'little',
  disableDefaultAppender: false,
};

/**
 * Return hex dump as string's array by lines.
 *
 * @param bufferLike target for dump.
 * @param options options.
 */
export const hexdump = (
  bufferLike: BufferLike,
  options: Partial<Options> = {},
): string[] => {
  const opt: Options = {
    ...defaultOptions,
    ...options,
  };
  const { countPerLine } = opt;
  const buffer = getBuffer(bufferLike, opt.endianness);
  const start = typeof opt.start === 'number' ? opt.start : 0;
  const end =
    typeof opt.end === 'number'
      ? Math.min(opt.end, buffer.length - 1)
      : buffer.length - 1;
  const formatter = new FormatterFilter(opt.formatters);
  const appender = new AppenderFilter(
    opt.disableDefaultAppender,
    opt.appenders,
  );
  const decorator = new DecoratorFilter(opt.decorators);
  const border = new BorderFilter(opt.borders);

  const startAddress = Math.floor(start / countPerLine) * countPerLine;

  const context: Context = {
    totalRows: Math.floor((end - startAddress + 1) / countPerLine),
    countPerLine,
    address: startAddress,
    outOfRange: false,
    row: 0,
    col: 0,
    value: 0,
    hex: { body: '', printable: false },
    char: { body: '', printable: false },
  };

  const result: string[] = [];

  result.push(...border.header(context));

  for (let i = startAddress; i < end; i += countPerLine) {
    const hexes: string[] = [];
    const chars: string[] = [];

    for (let j = 0; j < countPerLine; j += 1) {
      const address = i + j;

      context.address = i + j;
      context.col = j;
      context.outOfRange =
        address < start ||
        end < address ||
        address < 0 ||
        buffer.length <= address;
      context.value = context.outOfRange ? 0 : buffer.readUInt8(address);

      context.hex = formatter.hex(context);
      context.char = formatter.char(context);

      hexes.push(
        decorator.beforeHex(appender.beforeHex(context), context),
        decorator.hex(context.hex.body, context),
        decorator.afterHex(appender.afterHex(context), context),
      );
      chars.push(
        decorator.beforeChar(appender.beforeChar(context), context),
        decorator.char(context.char.body, context),
        decorator.afterChar(appender.afterChar(context), context),
      );
    }

    context.address = i;
    context.col = 0;
    result.push(
      ...border.beforeRow(context),
      [
        decorator.beforeRow(appender.beforeRow(context), context),
        decorator.row(
          [
            decorator.beforeAddress(appender.beforeAddress(context), context),
            decorator.address(formatter.address(context).body, context),
            decorator.afterAddress(appender.afterAddress(context), context),

            decorator.beforeHexes(appender.beforeHexes(context), context),
            decorator.hexes(hexes.join(''), context),
            decorator.afterHexes(appender.afterHexes(context), context),

            decorator.beforeChars(appender.beforeChars(context), context),
            decorator.chars(chars.join(''), context),
            decorator.afterChars(appender.afterChars(context), context),
          ].join(''),
          context,
        ),
        decorator.afterRow(appender.afterRow(context), context),
      ].join(''),
      ...border.afterRow(context),
    );
    context.row += 1;
  }

  result.push(...border.footer(context));

  return result;
};
