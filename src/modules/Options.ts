import { FormatterMap } from './Formatter';
import { DecoratorMap } from './Decorator';
import { AppenderMap } from './Appender';
import { BorderMap } from './Border';

export type Options = {
  countPerLine: number;

  /** If set, start dumping from this address. */
  start?: number;

  /** If set, end dump at this address. */
  end?: number;

  /** Use big/little endian byte order with int16/int32 array. */
  endianness: 'big' | 'little';

  /** Formatters for sections. */
  formatters?: FormatterMap;

  /** Appenders for sections. */
  appenders?: AppenderMap;

  disableDefaultAppender?: boolean;

  /** Decorators for sections. */
  decorators?: DecoratorMap[] | DecoratorMap;

  borders?: BorderMap[] | BorderMap;
};
