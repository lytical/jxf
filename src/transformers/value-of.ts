/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

/**
 * jxf_value_of(match, format)
 * @description
 * A transformer that extracts the value resolved by the match expression and formats it as a string.
 * @example
 * import { jxf_value_of } from '@lytical/jxf';
 * const data = { name: 'John Doe' };
 * const transform = [
 *   jxf_value_of('.name', (val) => `Name: ${val}`),
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join(' ')); // "Name: John Doe"
 * @module \@lytical/jxf/transformers/value-of
 * @param match a jspath expression that resolves to a value
 * @param format a function that formats the value as a string
 * @returns {jxf_transformer_t} A jxf transformer function.
 */
export function jxf_value_of(
  match: string,
  format: (val: any) => string = (val) => val?.toString(),
): jxf_transformer_t {
  return (data, ctx): string[] => {
    const [val] = apply(match, data, ctx);
    return [format(val)];
  };
}
