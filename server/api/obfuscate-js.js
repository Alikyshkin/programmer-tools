import { defineEventHandler } from 'h3';
import { readCodeFromRequest, obfuscateJs } from './helpers';

export default defineEventHandler(async (event) => {
  const code = await readCodeFromRequest(event);
  return { obfuscatedCode: obfuscateJs(code) };
});
