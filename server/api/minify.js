import { defineEventHandler, readBody } from 'h3';
import CleanCSS from 'clean-css';

export default defineEventHandler(async (event) => {
  const { code } = await readBody(event);
  const minified = new CleanCSS().minify(code);
  return {
    minifiedCode: minified.styles,
  };
});
