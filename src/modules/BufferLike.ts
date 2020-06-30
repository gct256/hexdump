import { Options } from './Options';

/** Buffer like object. */
export type BufferLike =
  | Buffer
  | number[]
  | string
  | ArrayBuffer
  | Uint8Array
  | Uint8ClampedArray
  | Int8Array
  | Uint16Array
  | Int16Array
  | Uint32Array
  | Int32Array;

/**
 * Return Buffer from buffer like value.
 *
 * @param value Array of numbers or TypedArray or Buffer.
 * @param endianness
 */
export const getBuffer = (
  value: BufferLike,
  endianness: Options['endianness'],
): Buffer => {
  if (value instanceof Buffer) return value;

  if (Array.isArray(value)) return Buffer.from(value);

  if (typeof value === 'string') {
    return Buffer.from(value, 'utf8');
  }

  if (
    value instanceof ArrayBuffer ||
    value instanceof Uint8Array ||
    value instanceof Uint8ClampedArray ||
    value instanceof Int8Array
  ) {
    return Buffer.from(value);
  }

  if (value instanceof Uint16Array) {
    const buffer = Buffer.alloc(value.length * 2);

    if (endianness === 'little') {
      value.forEach((x, i) => buffer.writeUInt16LE(x, i * 2));
    } else if (endianness === 'big') {
      value.forEach((x, i) => buffer.writeUInt16BE(x, i * 2));
    }

    return buffer;
  }

  if (value instanceof Int16Array) {
    const buffer = Buffer.alloc(value.length * 2);

    if (endianness === 'little') {
      value.forEach((x, i) => buffer.writeInt16LE(x, i * 2));
    } else if (endianness === 'big') {
      value.forEach((x, i) => buffer.writeInt16BE(x, i * 2));
    }

    return buffer;
  }

  if (value instanceof Uint32Array) {
    const buffer = Buffer.alloc(value.length * 4);

    if (endianness === 'little') {
      value.forEach((x, i) => buffer.writeUInt32LE(x, i * 4));
    } else if (endianness === 'big') {
      value.forEach((x, i) => buffer.writeUInt32BE(x, i * 4));
    }

    return buffer;
  }

  if (value instanceof Int32Array) {
    const buffer = Buffer.alloc(value.length * 4);

    if (endianness === 'little') {
      value.forEach((x, i) => buffer.writeInt32LE(x, i * 4));
    } else if (endianness === 'big') {
      value.forEach((x, i) => buffer.writeInt32BE(x, i * 4));
    }

    return buffer;
  }

  return Buffer.from([]);
};
