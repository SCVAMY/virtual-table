import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import md from './plugin/md'

import { resolve } from 'path' // 此处如果报错则安装 node/path依赖

export default defineConfig({
  plugins: [vue(), vueJsx(), md()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  }
})
