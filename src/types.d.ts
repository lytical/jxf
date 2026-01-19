/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

/**
 * jxf_ctx_t
 * Stores context variables for jxf transformers.
 * @description
 * Context object type used in jxf transformers.
 * @typedef {Record<string, any>} jxf_ctx_t
 * @property {Record<string, any>} [key: string] - dynamic properties to hold context variables
 * @module \@lytical/jxf/types
 */
export type jxf_ctx_t = Record<string, any>;

/**
 * jxf_transformer_t
 * A function type for jxf transformers.
 * @description
 * Function type that defines the signature for jxf transformers.
 * @example
 * import type { jxf_ctx_t, jxf_transformer_t } from '@lytical/jxf/types';
 * 
 * const myTransformer: jxf_transformer_t = (data: any, ctx: jxf_ctx_t): string[] => {
 *   // Transformer logic here
 *   return [`Transformed data: ${JSON.stringify(data)}`];
 * };
 * 
 * export default myTransformer;
 * 
 * @typedef {(data: any, ctx: jxf_ctx_t) => string[]} jxf_transformer_t
 * @module \@lytical/jxf/types
 * @param {any} data - The input data to be transformed.
 * @param {jxf_ctx_t} ctx - The context object containing variables for transformation.
 * @returns {string[]} An array of strings resulting from the transformation.
 */
export type jxf_transformer_t = (data: any, ctx: jxf_ctx_t) => string[];

// the current version of (@types/jspath@0.4.2) is outdated and does not properly exports the default apply() function.
// once an updated version is available, this module declaration can be removed.
// for now, you must npm install @types/jspath as a dev dependency to avoid TypeScript errors.
// see: https://www.npmjs.com/package/@types/jspath
declare module 'jspath' {
  export default function apply<_t_ = any>(
    path: string,
    data: any,
    replacement?: any,
  ): _t_[];
}
