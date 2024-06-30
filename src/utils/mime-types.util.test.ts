import { typeToExtension } from '@/utils/mime-types.util.js';

describe('Mime Types Util', () => {
  test('Should create .png when mime type is image/png', () => {
    const extension = typeToExtension('image/png');
    expect(extension).toBe('png');
  });

  test('Should create .jpeg when mime type is image/jpeg', () => {
    const extension = typeToExtension('image/jpeg');
    expect(extension).toBe('jpeg');
  });
});
