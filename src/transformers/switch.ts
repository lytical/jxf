/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';
import jxf from '../index.js';

export function jxf_switch(
  match: string,
  transform: (jxf_transformer_t | string)[],
): jxf_transformer_t {
  return (data, ctx): string[] => {
    const [val] = apply(match, data, ctx);
    for (const t of transform) {
      const rs = jxf(data, [t], { ...ctx, $switch: val });
      if (rs.length !== 0) {
        return rs;
      }
    }
    return [];
  };
}
