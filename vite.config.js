

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import UnoCSS from '@unocss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import dts from 'vite-plugin-dts';
// https://vite.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: "0.0.0.0",
    port: 9528,
  },

  plugins: [vue(),
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',
  }),
  UnoCSS(),
  VueI18nPlugin({
    // 这里的路径是你存放语言包的地方
    runtimeOnly: false,
  }),
  dts({ insertTypesEntry: true, rollupTypes: true })
  ],
  build: {
    lib: {
      // 入口文件
      entry: resolve(__dirname, 'src/index.ts'),
      // 暴露的全局变量（用于 UMD/IIFE 构建）
      name: 'Calculator',
      // 输出文件名
      fileName: (format) => `vue3-calculator-ms.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不期望打包进库的依赖
      external: ['vue', 'howler', 'mathjs', 'katex','pinia'],
      output: {
        exports: 'named', // 强制使用具名导出
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          howler: 'Howler',
          mathjs: 'math',
          katex: 'katex',
          pinia: 'Pinia',
        },
        // 移除打包结果中的 hash 值（保持文件名整洁）
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'vue3-calculator-ms.css';
          return assetInfo.name;
        },
      }
    }
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
    },
  },
})
