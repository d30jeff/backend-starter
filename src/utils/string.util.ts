import { camelCase, capitalCase, pascalCase, snakeCase } from 'change-case-all';

export class StringUtil {
  static Trim(params: string) {
    return params.replace(/\s{2,}/g, ' ').trim();
  }
  static SnakeCase(params: string): string {
    return snakeCase(params);
  }

  static PascalCase(params: string): string {
    return pascalCase(params);
  }

  /**
   * AKA Title Case
   * e.g. "Hello World"
   */
  static CapitalCase(params: string): string {
    return capitalCase(params);
  }

  static CamelCase(params: string): string {
    return camelCase(params);
  }
}
