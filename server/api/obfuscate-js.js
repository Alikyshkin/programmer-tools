import { defineEventHandler, readBody } from 'h3';
import JavaScriptObfuscator from 'javascript-obfuscator';

export default defineEventHandler(async (event) => {
  const { code } = await readBody(event);
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(code).getObfuscatedCode();
  return { obfuscatedCode };
});
