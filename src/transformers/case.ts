/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

import jxf from '../index.js';

/**
 * jxf_case(match, transform)
 * @description
 * A transformer that applies the given transform if the match expression evaluates to true.
 * @param {string} match a jspath expression that evaluates to a truthy or falsy value
 * @param {(jxf_transformer_t | string)[]} transform transformers and/or strings to apply if the match is true
 * @returns {jxf_transformer_t} A jxf transformer function.
 * @module \@lytical/jxf/transformers/case
 * @example
 * import { jxf_case } from '@lytical/jxf';
 * import jxf from '@lytical/jxf';
 * 
 * const data = { age: 25 };
 * const transform = [
 *   jxf_case('{.age < 30}', ['Is Young']),
 *   jxf_case('{.age >= 30}', ['Is Old']),
 * ];
 * 
 */
export function jxf_case(
  match: string,
  transform: (jxf_transformer_t | string)[],
): jxf_transformer_t {
  return (data, ctx): string[] => {
    const [val] = apply(match, ctx['$switch'], ctx);
    return val ? jxf(data, transform, { ...ctx, $eval: val }) : [];
  };
}
