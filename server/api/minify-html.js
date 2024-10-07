import { defineEventHandler, readBody } from 'h3';
import { minify } from 'html-minifier-terser';

export default defineEventHandler(async (event) => {
  const { code } = await readBody(event);
  return {
    minifiedCode: minify(code, { collapseWhitespace: true, removeComments: true }),
  };
});
