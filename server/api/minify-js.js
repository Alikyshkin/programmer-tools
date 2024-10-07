import { defineEventHandler, readBody } from 'h3';
import { minify } from 'terser';

export default defineEventHandler(async (event) => {
  try {
    const { code } = await readBody(event);
    const result = minify(code);

    if (result.error) {
      throw new Error(result.error);
    }

    return { minifiedCode: result.code };
  } catch (error) {
    return { error: error.message };
  }
});
