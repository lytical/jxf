/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

export function jxf_length(match: string): jxf_transformer_t {
  return (data, ctx): string[] => {
    const val = apply(match, data, ctx);
    return [val.length.toString()];
  };
}
