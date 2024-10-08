import { defineEventHandler } from 'h3';
import { readCodeFromRequest, minifyCode } from './helpers';

export default defineEventHandler(async (event) => {
  const code = await readCodeFromRequest(event);
  return { minifiedCode: await minifyCode(code, 'css') };
});
