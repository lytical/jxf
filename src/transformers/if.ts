/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

import jxf from '../index.js';

/**
 * jxf_if(match, transform)
 * @description
 * A transformer that conditionally applies the given transform to the data if the match expression evaluates to a truthy value.
 * @example
 * import { jxf_if, jxf_value_of } from '@lytical/jxf';
 * const data = { age: 25 };
 * const transform = [
 *   jxf_if('.age > 18', ['You are an adult.']),
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join(' ')); // "You are an adult."
 * @module \@lytical/jxf/transformers/if
 * @param {string} match a jspath expression that resolves to a boolean value
 * @param {(jxf_transformer_t | string)[]} transform transformers and/or strings to apply if the match expression evaluates to a truthy value
 * @returns {jxf_transformer_t} A jxf transformer function.
 */
export function jxf_if(
  match: string,
  transform: (jxf_transformer_t | string)[],
): jxf_transformer_t {
  return (data, ctx): string[] => {
    const [val] = apply(match, data, ctx);
    return val ? jxf(data, transform, { ...ctx, $eval: val }) : [];
  };
}
