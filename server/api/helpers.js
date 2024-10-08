import { readBody } from 'h3';
import beautify from 'js-beautify';
import CleanCSS from 'clean-css';
import { minify as htmlMinify } from 'html-minifier-terser';
import { minify as jsMinify } from 'terser';
import JavaScriptObfuscator from 'javascript-obfuscator';

export const readCodeFromRequest = async (event) => {
  const { code } = await readBody(event);
  return code;
};

export const beautifyCode = (code, type) => {
  switch (type) {
    case 'css': {
      return beautify.css(code);
    }
    case 'html': {
      return beautify.html(code);
    }
    case 'js': {
      return beautify.js(code);
    }
    default: {
      throw new Error('Unknown beautify type');
    }
  }
};

export const minifyCode = async (code, type) => {
  switch (type) {
    case 'css': {
      return new CleanCSS().minify(code).styles;
    }
    case 'html': {
      return htmlMinify(code, { collapseWhitespace: true, removeComments: true });
    }
    case 'js': {
      const result = await jsMinify(code);
      if (result.error) throw new Error(result.error);
      return result.code;
    }
    default: {
      throw new Error('Unknown minify type');
    }
  }
};

export const obfuscateJs = (code) => {
  return JavaScriptObfuscator.obfuscate(code).getObfuscatedCode();
};
