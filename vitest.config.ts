import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const pagesMode = mode === 'pages-test';

  return {
    plugins: [react()],
    base: pagesMode ? '/my-portfolio-site/' : '/',
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      env: { VITE_ROUTER_MODE: pagesMode ? 'hash' : 'browser' },
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/main.tsx',
          'src/**/*.d.ts',
          'src/types/**',
          'src/test/**',
          'src/**/*.test.{ts,tsx}',
        ],
        reporter: ['text', 'html', 'lcov'],
        thresholds: { lines: 80, statements: 80, functions: 75, branches: 75 },
      },
    },
  };
});
