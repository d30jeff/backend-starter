import { StringUtil } from '@utils/string.util';
import {
  Transform,
  TransformFnParams,
  TransformOptions,
} from 'class-transformer';

export function Trim(transformOptions?: TransformOptions) {
  return Transform((source: TransformFnParams) => {
    if (typeof source.value !== 'string') {
      return null;
    }

    return StringUtil.Trim(source.value);
  }, transformOptions);
}

export function ToTitleCase(transformOptions?: TransformOptions) {
  return Transform((source: TransformFnParams) => {
    if (typeof source.value !== 'string') {
      return null;
    }

    return StringUtil.CapitalCase(StringUtil.Trim(source.value));
  }, transformOptions);
}
