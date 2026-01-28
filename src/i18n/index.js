import { createI18n } from 'vue-i18n'
import zh from '../locales/zh-cn.json'
import en from '../locales/en.json'
console.log(zh);

const i18n = createI18n({
  legacy: false,          // 1. 必须为 false
  globalInjection: true,  // 2. 必须为 true，才能全局使用 $t
  allowComposition: true, // 3. 建议加上，允许组合式 API
  locale: 'zh-cn', // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages: {
    'zh-cn': zh,
    'en': en
  }
})

export default i18n