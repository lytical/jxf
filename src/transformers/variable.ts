/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import apply from 'jspath';

import type { jxf_transformer_t } from '../types';

/**
 * jxf_variable(name, match)
 * @description
 * A transformer that defines a variable in the transformation context by evaluating the match expression.
 * @example
 * import { jxf_variable, jxf_value_of } from '@lytical/jxf/transformers/index.js';
 * const data = { first_name: 'John', last_name: 'Doe' };
 * const transform = [
 *   jxf_variable('fullName', '.first_name + " " + .last_name'),
 *  jxf_value_of('.fullName', (val) => `Full Name: ${val}`),
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join(' ')); // "Full Name: John Doe"
 * @module \@lytical/jxf/transformers/variable
 * @param name the name of the variable to define
 * @param match a jspath expression that resolves to a value
 * @returns {jxf_transformer_t} A jxf transformer function.
 */
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
