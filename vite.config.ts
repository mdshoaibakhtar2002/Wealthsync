import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// or react from '@vitejs/plugin-react' if using React

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        // Ensure correct MIME type
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
})
