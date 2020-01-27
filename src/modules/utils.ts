/** Utilities. */
export const utils = {
  /** Default ruler strings for borders options. */
  DEFAULT_RULER: [
    '--------:--------------------------------------------------|----------------|',
    'ADDRESS : +0 +1 +2 +3 +4 +5 +6 +7  +8 +9 +A +B +C +D +E +F |0123456789ABCDEF|',
    '--------:--------------------------------------------------|----------------|',
  ],

  /**
   * Convert string to hexadecimal format.
   *
   * @param value
   * @param minWidth Min width of formatted string.
   */
  getHex(value: number, minWidth: number, upperCase = false): string {
    return (value & (2 ** (4 * minWidth) - 1))
      .toString(16)
      .padStart(minWidth, '0')
      [upperCase ? 'toUpperCase' : 'toLowerCase']();
  },

  /**
   * Convert number to printable character.
   *
   * @param value
   */
  getChar(value: number): { body: string; printable: boolean } {
    if (value >= 0x20 && value <= 0x7e) {
      return {
        body: String.fromCharCode(value),
        printable: true,
      };
    }

    if (value >= 0xa1 && value <= 0xff) {
      return {
        body: String.fromCharCode(value),
        printable: true,
      };
    }

    return {
      body: '.',
      printable: false,
    };
  },
};
