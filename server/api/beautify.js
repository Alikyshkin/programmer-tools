import { defineEventHandler } from 'h3';
import { readCodeFromRequest, beautifyCode } from './helpers';

export default defineEventHandler(async (event) => {
  try {
    const code = await readCodeFromRequest(event);
    const language = detectLanguage(code);

    if (!language) {
      throw new Error('Unsupported language. Please provide HTML, CSS, or JS.');
    }

    const beautifiedCode = beautifyCode(code, language);
    return { beautifiedCode };
  } catch (error) {
    return { error: error.message };
  }
});

function detectLanguage(code) {
  if (code.trim().startsWith('<')) return 'html';
  if (code.includes('{') && code.includes('}')) return 'css';
  if (code.includes('function') || code.includes('var') || code.includes('let')) return 'js';
  return null;
}
