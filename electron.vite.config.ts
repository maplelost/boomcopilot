import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@packages': resolve('packages')
      }
    },
    build: {
      sourcemap: isDev
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@packages': resolve('packages')
      }
    },
    build: {
      sourcemap: isDev
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@packages': resolve('packages')
      }
    },
    plugins: [vue()],
    server: {
      port: 33227
    }
  }
})
