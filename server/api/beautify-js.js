import { defineEventHandler } from 'h3';
import { readCodeFromRequest, beautifyCode } from './helpers';

export default defineEventHandler(async (event) => {
  const code = await readCodeFromRequest(event);
  return { beautifiedCode: beautifyCode(code, 'js') };
});
