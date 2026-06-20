import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  // Astro-generated type reference file; not ours to lint.
  {
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      'src/env.d.ts',
      'test-results/',
      'playwright-report/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
