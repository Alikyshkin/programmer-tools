import { defineEventHandler } from 'h3';
import { readCodeFromRequest, obfuscateJs } from './helpers';

export default defineEventHandler(async (event) => {
  try {
    const code = await readCodeFromRequest(event);
    const language = detectLanguage(code);

    if (language !== 'js') {
      throw new Error('Obfuscation is only supported for JavaScript.');
    }

    const obfuscatedCode = obfuscateJs(code);
    return { obfuscatedCode };
  } catch (error) {
    return { error: error.message };
  }
});

function detectLanguage(code) {
  if (code.includes('function') || code.includes('var') || code.includes('let')) return 'js';
  return null;
}
