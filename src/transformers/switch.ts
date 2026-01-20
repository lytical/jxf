/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

import jxf from '../index.js';

/**
 * jxf_switch(match, transform)
 * @description
 * A transformer that evaluates the match expression and applies the first case transform that matches.
 * @example
 * import { jxf_switch, jxf_case } from '@lytical/jxf';
 * const data = { age: 25 };
 * const transform = [
 *   jxf_switch('.age', [
 *     jxf_case('.age < 18', ['You are a minor.']),
 *     jxf_case('.age >= 18', ['You are an adult.']),
 *   ]),
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join(' ')); // "You are an adult."
 * @module \@lytical/jxf/transformers/switch
 * @param {string} match a jspath expression that resolves to a value to be matched
 * @param {(jxf_transformer_t | string)[]} transform transformers and/or strings to apply if the match expression evaluates to a truthy value
 * @returns {jxf_transformer_t} A jxf transformer function.
 */
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
