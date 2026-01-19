/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';
import jxf from '../index.js';

/**
 * jxf_with(match, transform)
 * @description
 * A transformer that changes the context to the value resolved by the match expression and applies the given transform.
 * @example
 * import { jxf_with, jxf_value_of } from '@lytical/jxf/transformers/index.js';
 * const data = { user: { name: 'John Doe', age: 30 } };
 * const transform = [
 *   jxf_with('.user', [
 *     jxf_value_of('.name', (val) => `Name: ${val}`),
 *     jxf_value_of('.age', (val) => `Age: ${val}`),
 *   ]),
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join(' ')); // "Name: John Doe Age: 30"
 * @param match a jspath expression that resolves to a value
 * @param transform transformers and/or strings to apply with the new context
 * @returns {jxf_transformer_t} A jxf transformer function.
 */
export function jxf_with(
  match: string,
  transform: (jxf_transformer_t | string)[],
): jxf_transformer_t {
  return (data, ctx): string[] => {
    const val = apply(match, data, ctx);
    return val ? jxf(val, transform, { ...ctx, $parent: data }) : [];
  };
}
