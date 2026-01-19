/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

import jxf from '../index.js';

/**
 * jxf_for_key(match, transform, sort?)
 * @description
 * A transformer that iterates over each key in the object resolved by the match expression,
 * applying the given transform to each key.
 * @example
 * import { jxf_for_key } from '@lytical/jxf/transformers/index.js';
 * const data = { age: 25, name: 'Alice' };
 * const transform = [
 *   'Keys:',
 *   jxf_for_key('.*', [jxf_value_of('$key')]),
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join(' ')); // "Keys: age name"
 * @module \@lytical/jxf/transformers/for-keys
 * @param {string} match a jspath expression that resolves to an object
 * @param {(jxf_transformer_t | string)[]} transform transformers and/or strings to apply to each key in the object
 * @param {(a: string, b: string) => number} [sort] (optional) a sort function to order the keys before transformation
 * @returns {jxf_transformer_t} A jxf transformer function.
 */
export function jxf_for_key(
  match: string,
  transform: (jxf_transformer_t | string)[],
  sort?: (a: string, b: string) => number,
): jxf_transformer_t {
  return (data, ctx): string[] => {
    const rt: string[] = [];
    const [val] = apply(match, data, ctx);
    console.assert(
      typeof val === 'object' && val !== null,
      `jxf_for_key: match '${match}' did not resolve to an object.`,
    );
    if (val) {
      for (const key of sort ? Object.keys(val).sort(sort) : Object.keys(val)) {
        rt.push(
          ...jxf(val[key], transform, { ...ctx, $key: key, $parent: data }),
        );
      }
    }
    return rt;
  };
}
