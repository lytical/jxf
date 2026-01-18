/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

export type jxf_ctx_t = Record<string, any>;

export type jxf_transformer_t = (data: any, ctx: jxf_ctx_t) => string[];

// the current version of (@types/jspath@0.4.2) is outdated and does not properly exports the default apply function.
declare module 'jspath' {
  export default function apply<_t_ = any>(
    path: string,
    data: any,
    replacement?: any,
  ): _t_[];
}
