import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Library build: bundles the component into ESM + CJS, keeping React external
// so the consuming app supplies its own copy.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'CodeforcesStatsCard',
      fileName: (format) =>
        format === 'es' ? 'codeforces-stats-card.js' : 'codeforces-stats-card.cjs',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
  },
});
