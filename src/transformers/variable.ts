/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

export function jxf_variable(name: string, match: string): jxf_transformer_t {
  return (data, ctx): string[] => {
    const val = ctx[name];
    console.assert(
      val === undefined,
      `jxf_variable: variable '${name}' is already defined in the context. variables are immutable.`,
    );
    if (!val) {
      ctx[name] = apply(match, data, ctx);
    }
    return [];
  };
}
