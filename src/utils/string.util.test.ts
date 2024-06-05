import { StringUtil } from '@/utils/string.util.js';

describe('String Util', () => {
  describe('Trim', () => {
    test('It Removes Single Preceding Whitespace', () => {
      const result = StringUtil.Trim(' Hello');
      expect(result).toBe('Hello');
    });

    test('It Removes Multiple Preceding Whitespace', () => {
      const result = StringUtil.Trim('  Hello');
      expect(result).toBe('Hello');
    });

    test('It Removes Single Trailing Whitespace', () => {
      const result = StringUtil.Trim('Hello ');
      expect(result).toBe('Hello');
    });

    test('It Removes Multiple Trailing Whitespace', () => {
      const result = StringUtil.Trim('Hello  ');
      expect(result).toBe('Hello');
    });

    test('It Removes Multiple Whitespace In The Middle Of A String', () => {
      const result = StringUtil.Trim('  Hello    World ');
      expect(result).toBe('Hello World');
    });
  });
});
