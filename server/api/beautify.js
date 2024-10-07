import { defineEventHandler, readBody } from 'h3';
import beautify from 'js-beautify';

export default defineEventHandler(async (event) => {
  const { code } = await readBody(event);
  return {
    beautifiedCode: beautify.html(code),
  };
});
