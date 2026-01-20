/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

import jxf from '../index.js';

/**
 * jxf_for_each(match, transform, sort?)
 * @description
 * A transformer that iterates over each item in the array resolved by the match expression,
 * applying the given transform to each item.
 * @example
 * import { jxf_for_each, jxf_value_of } from '@lytical/jxf';
 * const data = { names: ['Alice', 'Bob', 'Charlie'] };
 * const transform = [
 *   'Names:',
 *   jxf_for_each('.names', [jxf_value_of('.')]),
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join(' ')); // "Names: Alice Bob Charlie"
 * @module \@lytical/jxf/transformers/for-each
 * @param {string} match a jspath expression that resolves to an array
 * @param {(jxf_transformer_t | string)[]} transform transformers and/or strings to apply to each item in the array
 * @param {(a: string, b: string) => number} [sort] (optional) a sort function to order the items before transformation
 * @returns {jxf_transformer_t} A jxf transformer function. 
 */
export function jxf_for_each(
  match: string,
  transform: (jxf_transformer_t | string)[],
  sort?: (a: string, b: string) => number,
): jxf_transformer_t {
  return (data, ctx): string[] => {
    const rt: string[] = [];
    let val = apply(match, data, ctx);
    const is_array =
      typeof val === 'object' && val !== null && Array.isArray(val);
    console.assert(
      is_array,
      `jxf_for_key: match '${match}' did not resolve to an array.`,
    );
    if (is_array) {
      if (sort) {
        val = [...val].sort(sort);
      }
      for (let idx = 0, max = val.length; idx < max; ++idx) {
        rt.push(
          ...jxf(val[idx], transform, {
            ...ctx,
            $even: idx % 2 === 0,
            $first: idx === 0,
            $index: idx,
            $last: idx === max - 1,
            $length: max,
            $odd: idx % 2 !== 0,
            $parent: data,
          }),
        );
      }
    }
    return rt;
  };
}
