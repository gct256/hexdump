import { Context } from './Context';

export type AppenderSection =
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

export type Appender = (context: Context) => string;
export type AppenderMap = {
  [key in AppenderSection]?: string | Appender;
};

const emptyAppender: Appender = () => '';

export class AppenderFilter {
  private appenders: { [key in AppenderSection]: Appender };

  public constructor(
    disableDefaultAppender?: boolean,
    appenderMap?: AppenderMap[] | AppenderMap,
  ) {
    this.appenders = {
      beforeRow: emptyAppender,
      beforeAddress: emptyAppender,
      beforeHexes: emptyAppender,
      beforeHex: emptyAppender,
      beforeChars: emptyAppender,
      beforeChar: emptyAppender,
      afterRow: emptyAppender,
      afterAddress: emptyAppender,
      afterHexes: emptyAppender,
      afterHex: emptyAppender,
      afterChars: emptyAppender,
      afterChar: emptyAppender,
    };

    if (!disableDefaultAppender) {
      this.setAppender('afterAddress', ':');
      this.setAppender('beforeHex', ({ col }) =>
        col > 0 && col % 8 === 0 ? '  ' : ' ',
      );
      this.setAppender('beforeChars', ' |');
      this.setAppender('afterChars', '|');
    }

    if (appenderMap !== undefined) {
      (Array.isArray(appenderMap) ? appenderMap : [appenderMap]).forEach(
        (map) => {
          this.setAppender('beforeRow', map.beforeRow);
          this.setAppender('beforeAddress', map.beforeAddress);
          this.setAppender('beforeHexes', map.beforeHexes);
          this.setAppender('beforeHex', map.beforeHex);
          this.setAppender('beforeChars', map.beforeChars);
          this.setAppender('beforeChar', map.beforeChar);
          this.setAppender('afterRow', map.afterRow);
          this.setAppender('afterAddress', map.afterAddress);
          this.setAppender('afterHexes', map.afterHexes);
          this.setAppender('afterHex', map.afterHex);
          this.setAppender('afterChars', map.afterChars);
          this.setAppender('afterChar', map.afterChar);
        },
      );
    }
  }

  public beforeRow(context: Context): string {
    return this.filter('beforeRow', context);
  }

  public beforeAddress(context: Context): string {
    return this.filter('beforeAddress', context);
  }

  public beforeHexes(context: Context): string {
    return this.filter('beforeHexes', context);
  }

  public beforeHex(context: Context): string {
    return this.filter('beforeHex', context);
  }

  public beforeChars(context: Context): string {
    return this.filter('beforeChars', context);
  }

  public beforeChar(context: Context): string {
    return this.filter('beforeChar', context);
  }

  public afterRow(context: Context): string {
    return this.filter('afterRow', context);
  }

  public afterAddress(context: Context): string {
    return this.filter('afterAddress', context);
  }

  public afterHexes(context: Context): string {
    return this.filter('afterHexes', context);
  }

  public afterHex(context: Context): string {
    return this.filter('afterHex', context);
  }

  public afterChars(context: Context): string {
    return this.filter('afterChars', context);
  }

  public afterChar(context: Context): string {
    return this.filter('afterChar', context);
  }

  private setAppender(
    section: AppenderSection,
    appender?: string | Appender,
  ): void {
    if (appender !== undefined) {
      if (typeof appender === 'string') {
        this.appenders[section] = () => appender;
      } else {
        this.appenders[section] = appender;
      }
    }
  }

  private filter(section: AppenderSection, context: Context): string {
    return this.appenders[section](context);
  }
}
