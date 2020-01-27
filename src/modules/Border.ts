import { Context } from './Context';

export type BorderSection = 'header' | 'beforeRow' | 'afterRow' | 'footer';

export type Border = (context: Context) => string[];

export type BorderMap = {
  [key in BorderSection]?: string | Border | (string | Border)[];
};

const getBorderArray = (
  value?: string | Border | (string | Border)[],
): Border[] => {
  if (value === undefined) return [];

  if (Array.isArray(value)) {
    return value.reduce(
      (prev: Border[], x): Border[] => [...prev, ...getBorderArray(x)],
      [],
    );
  }

  if (typeof value === 'string') {
    return [() => [value]];
  }

  return [value];
};

export class BorderFilter {
  private borders: { [key in BorderSection]: Border[] };

  public constructor(borderMap?: BorderMap[] | BorderMap) {
    this.borders = {
      header: [],
      beforeRow: [],
      afterRow: [],
      footer: [],
    };

    if (borderMap !== undefined) {
      (Array.isArray(borderMap) ? borderMap : [borderMap]).forEach((map) => {
        this.addBorder('header', map.header);
        this.addBorder('beforeRow', map.beforeRow);
        this.addBorder('afterRow', map.afterRow);
        this.addBorder('footer', map.footer);
      });
    }
  }

  public header(context: Context): string[] {
    return this.filter('header', context);
  }

  public beforeRow(context: Context): string[] {
    return this.filter('beforeRow', context);
  }

  public afterRow(context: Context): string[] {
    return this.filter('afterRow', context);
  }

  public footer(context: Context): string[] {
    return this.filter('footer', context);
  }

  private addBorder(
    section: BorderSection,
    borders?: string | Border | (string | Border)[],
  ): void {
    this.borders[section].push(...getBorderArray(borders));
  }

  private filter(section: BorderSection, context: Context): string[] {
    return this.borders[section].reduce(
      (prev: string[], border) => [...prev, ...border(context)],
      [],
    );
  }
}
