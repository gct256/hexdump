import { Context } from './Context';

export type DecoratorSection =
  | 'row'
  | 'address'
  | 'hexes'
  | 'hex'
  | 'chars'
  | 'char'
  | 'beforeRow'
  | 'beforeAddress'
  | 'beforeHexes'
  | 'beforeHex'
  | 'beforeChars'
  | 'beforeChar'
  | 'afterRow'
  | 'afterAddress'
  | 'afterHexes'
  | 'afterHex'
  | 'afterChars'
  | 'afterChar';

export type Decorator = (str: string, context: Context) => string;

export type DecoratorMap = {
  [key in DecoratorSection]?: Decorator | Decorator[];
};

const getDecoratorArray = (value?: Decorator[] | Decorator): Decorator[] => {
  if (value === undefined) return [];

  return Array.isArray(value) ? [...value] : [value];
};

export class DecoratorFilter {
  private decorators: { [key in DecoratorSection]: Decorator[] };

  public constructor(decoratorMap?: DecoratorMap[] | DecoratorMap) {
    this.decorators = {
      row: [],
      address: [],
      hexes: [],
      hex: [],
      chars: [],
      char: [],
      beforeRow: [],
      beforeAddress: [],
      beforeHexes: [],
      beforeHex: [],
      beforeChars: [],
      beforeChar: [],
      afterRow: [],
      afterAddress: [],
      afterHexes: [],
      afterHex: [],
      afterChars: [],
      afterChar: [],
    };

    if (decoratorMap !== undefined) {
      (Array.isArray(decoratorMap) ? decoratorMap : [decoratorMap]).forEach(
        (map) => {
          this.addDecorator('row', map.row);
          this.addDecorator('address', map.address);
          this.addDecorator('hexes', map.hexes);
          this.addDecorator('hex', map.hex);
          this.addDecorator('chars', map.chars);
          this.addDecorator('char', map.char);
          this.addDecorator('beforeRow', map.beforeRow);
          this.addDecorator('beforeAddress', map.beforeAddress);
          this.addDecorator('beforeHexes', map.beforeHexes);
          this.addDecorator('beforeHex', map.beforeHex);
          this.addDecorator('beforeChars', map.beforeChars);
          this.addDecorator('beforeChar', map.beforeChar);
          this.addDecorator('afterRow', map.afterRow);
          this.addDecorator('afterAddress', map.afterAddress);
          this.addDecorator('afterHexes', map.afterHexes);
          this.addDecorator('afterHex', map.afterHex);
          this.addDecorator('afterChars', map.afterChars);
          this.addDecorator('afterChar', map.afterChar);
        },
      );
    }
  }

  public row(body: string, context: Context): string {
    return this.filter('row', body, context);
  }

  public address(body: string, context: Context): string {
    return this.filter('address', body, context);
  }

  public hexes(body: string, context: Context): string {
    return this.filter('hexes', body, context);
  }

  public hex(body: string, context: Context): string {
    return this.filter('hex', body, context);
  }

  public chars(body: string, context: Context): string {
    return this.filter('chars', body, context);
  }

  public char(body: string, context: Context): string {
    return this.filter('char', body, context);
  }

  public beforeRow(body: string, context: Context): string {
    return this.filter('beforeRow', body, context);
  }

  public beforeAddress(body: string, context: Context): string {
    return this.filter('beforeAddress', body, context);
  }

  public beforeHexes(body: string, context: Context): string {
    return this.filter('beforeHexes', body, context);
  }

  public beforeHex(body: string, context: Context): string {
    return this.filter('beforeHex', body, context);
  }

  public beforeChars(body: string, context: Context): string {
    return this.filter('beforeChars', body, context);
  }

  public beforeChar(body: string, context: Context): string {
    return this.filter('beforeChar', body, context);
  }

  public afterRow(body: string, context: Context): string {
    return this.filter('afterRow', body, context);
  }

  public afterAddress(body: string, context: Context): string {
    return this.filter('afterAddress', body, context);
  }

  public afterHexes(body: string, context: Context): string {
    return this.filter('afterHexes', body, context);
  }

  public afterHex(body: string, context: Context): string {
    return this.filter('afterHex', body, context);
  }

  public afterChars(body: string, context: Context): string {
    return this.filter('afterChars', body, context);
  }

  public afterChar(body: string, context: Context): string {
    return this.filter('afterChar', body, context);
  }

  private addDecorator(
    section: DecoratorSection,
    decorators?: Decorator[] | Decorator,
  ): void {
    this.decorators[section].push(...getDecoratorArray(decorators));
  }

  private filter(
    section: DecoratorSection,
    body: string,
    context: Context,
  ): string {
    return this.decorators[section].reduce(
      (prev: string, decorator) => decorator(prev, context),
      body,
    );
  }
}
