import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      tsconfigPaths(),
    ],
    server: {
      proxy: {
          '/api': env.VITE_API_BASE_URL,
      },
    },
  };
});
