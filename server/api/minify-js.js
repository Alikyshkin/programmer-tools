import { defineEventHandler } from 'h3';
import { readCodeFromRequest, minifyCode } from './helpers';

export default defineEventHandler(async (event) => {
  try {
    const code = await readCodeFromRequest(event);
    return { minifiedCode: await minifyCode(code, 'js') };
  } catch (error) {
    return { error: error.message };
  }
});
