

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver';
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import UnoCSS from '@unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig({
  base: './',
  server:{
    host:"0.0.0.0",
    port:9528,
  },

  plugins: [vue(), AutoImport({
    resolvers: [VantResolver()],
  }),
  Components({
    resolvers: [VantResolver(),NaiveUiResolver()],
  }),
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',
    }),
    UnoCSS(),
],

  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
  },
})
