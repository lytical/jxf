/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

import jxf from '../index.js';

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
