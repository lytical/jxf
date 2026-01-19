/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

/**
 * jxf_length(match)
 * @description
 * A transformer that computes the length of the array or string resolved by the match expression.
 * @example
 * import { jxf_length } from '@lytical/jxf/transformers/index.js';
 * @param match a jspath expression that resolves to an array or string
 * @returns {jxf_transformer_t} A jxf transformer function.
 */
export function jxf_length(match: string): jxf_transformer_t {
  return (data, ctx): string[] => {
    const val = apply(match, data, ctx);
    return [val.length.toString()];
  };
}
