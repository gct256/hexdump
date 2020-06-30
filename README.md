# hexdump

- A finely customizable hex dump utility.

## Install

```sh
$ npm install @gct256/hexdump
# or
$ yarn add @gct256/hexdump
```

## Usage

code:

```javascript
import { hexdump } from '@gct256/hexdump';

const buffer = Buffer.alloc(32);

console.debug(hexdump(buffer).join('\n'));
```

output:

```
00000000: 00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00 |................|
00000010: 00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00 |................|
```

## Interface

```typescript
hexdump(buffer: BufferLike, {
  countPerLine: number = 16;
  start?: number;
  end?: number;
  endianness: 'big' | 'little' = 'little',
  formatters?: { [FormatterSection]: Formatter },
  appenders?: { [AppenderSection]: Appender },
  disableDefaultAppenders: boolean = false,
  decorators?: { [DecoratorSection]: Decorator[] }[] | { [DecoratorSection]: Decorator[] },
  borders?: { [BorderSection]: Border[] },
}) => string[]
```

- _buffer_
  - target for dump.
  - allow types:
    - `number[]`
    - `string` (convert to Buffer with utf8 encoding)
    - `ArrayBuffer`
    - `Uint8Array`, `ClampledUint8Array`, `Int8Array`
    - `Uint16Array`, `Int16Array` (use endianness option)
    - `Uint32Array`, `Int32Array` (use endianness option)
    - `Buffer`
- _countPerLine_
  - output value count per line.
- _start_
  - If set, start dumping from this address.
  - If not set, start dumping from first. (default)
- _end_
  - If set, end dump at this address.
  - If not set, dump to end of target. (default)
- _endianness_
  - Use big/little endian byte order with int16/int32 array.
- _formatters_
  - Value formatters.
- _appenders_
  - Append value output handlers.
  - If not set, use default appenders. (when disableDefaultAppenders is not true)
- _disableDefaultAppenders_
  - Disable default appenders.
- _decorators_
  - Output decorators.
- _borders_
  - Border renderers.

## Customize

_TODO_...

### Formatter

### Appender

### Decorator

### Border
