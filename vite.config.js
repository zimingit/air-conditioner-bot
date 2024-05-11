import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const localProxy = 'http://localhost:8080'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', 
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
    port: 3000,
    proxy: {
      '/api': {
        target: localProxy,
      }
    }
  }
})
