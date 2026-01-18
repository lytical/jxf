/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

import jxf from '../index.js';

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
