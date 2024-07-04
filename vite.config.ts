import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: '127.0.0.1'
  },
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: {
            outDir: 'dist-electron', // Assurez-vous que le répertoire de sortie est correct
            rollupOptions: {
              output: {
                entryFileNames: 'main.js', // Nom du fichier de sortie
              },
            },
          },
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          build: {
            outDir: 'dist-electron', // Assurez-vous que le répertoire de sortie est correct
            rollupOptions: {
              output: {
                entryFileNames: 'preload.js', // Nom du fichier de sortie
              },
            },
          },
        },
      },
      renderer: {},
    }),
  ]
})
