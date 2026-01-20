/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import type { jxf_ctx_t, jxf_transformer_t } from './types';

/**
 * jxf(data, transform, ctx?)
 * 
 * @description
 * Transforms a pod or array using an array of transformers, and or text to add to the transformation.
 * 
 * @example
 * 
 * import { jxf_value_of } from '@lytical/jxf';
 * 
 * const data = { name: 'john', age: 42 };
 * const transform = [
 *   'User Information:',
 *   jxf_value_of('.name'),
 *   ' is ',
 *   jxf_value_of('.age'),
 *   ' years old.'
 * ];
 * const result = jxf(data, transform);
 * console.log(result.join('')); // "User Information: john is 42 years old."
 * 
 * @module \@lytical/jxf/index
 * 
 * @param {object} data a pod or array to transform
 * @param {(jxf_transformer_t | string)[]} transform an array of transformers, and or text to add to the transformation
 * @param {jxf_ctx_t} ctx (optional) context object to pass to the transformers that may contain preset variables
 * @returns {string[]} an array of strings that represent the transformed data
 */
export default function jxf(
  data: object,
  transform: (jxf_transformer_t | string)[],
  ctx: jxf_ctx_t = {},
): string[] {
  const rt: string[] = [];
  if (ctx['$'] === undefined) {
    ctx['$'] = data;
  }
  for (const xf of transform) {
    if (typeof xf === 'string') {
      rt.push(xf);
    } else {
      rt.push(...xf(data, ctx));
    }
  }
  return rt;
}
