/* @preserve
  (c) 2025 lytical, inc. all rights are reserved.
  lytical(r) is a registered trademark of lytical, inc.
  please refer to your license agreement on the use of this file.
*/

import type { jxf_ctx_t, jxf_transformer_t } from './types';

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
