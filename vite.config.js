import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  css: {
    preprocessorOptions: {
       stylus: {
        additionalData: `@import "${path.resolve(__dirname, 'src/styles/colors.styl')}"`
       }
    }
  },
  server: {
    port: 3000
  }
})
