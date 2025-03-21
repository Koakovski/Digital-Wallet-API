import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.spec.ts'],
    setupFiles: [
      './test/matchers/to-be-base-exception.matcher.ts',
      './test/matchers/to-throw-base-exception.matcher.ts',
    ],
  },
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
