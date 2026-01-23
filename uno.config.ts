import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetWind,
  } from 'unocss'
  
  export default defineConfig({
    presets: [
      presetWind({
        dark:"class"
      }),           // Tailwind 风格
      presetAttributify(),    // <div text="red-500" />
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
    ],
  
    shortcuts: [
      // 你可以像写 class 一样定义组件
      ['btn', 'px-4 py-2 rounded inline-block bg-blue-600 text-white hover:bg-blue-700'],
      ['btn-primary', 'btn bg-blue-600 hover:bg-blue-700'],
    ],
  
    theme: {
      colors: {
        brand: '#3b82f6',
        bg:{
            light:"#fff",
            dark:"#211e29"
        },
        text:{
            lidarkght:"#fff",
            light:"#211e29"
        },
      },
    },
  
    rules: [
      // 自定义规则（可选）
      [/^wh-(\d+)$/, ([, d]) => ({
        width: `${d}px`,
        height: `${d}px`,
      })],
    ],
  })