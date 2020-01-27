import { OutputData } from './OutputData';

/** Context data for Formatter and Decorator. */
export type Context = {
  /** Count of total rows. */
  totalRows: number;

  /** Value count in line. */
  countPerLine: number;

  /** Current buffer address. (buffer index) */
  address: number;

  /** If set true, current buffer address is out of range. */
  outOfRange: boolean;

  /** Current row number. */
  row: number;

  /** Current column number. */
  col: number;

  /** Value of current address. */
  value: number;

  /** Formatted hex value. */
  hex: OutputData;

  /** Formatted char value. */
  char: OutputData;
};
