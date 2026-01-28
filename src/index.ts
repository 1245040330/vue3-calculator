import {App} from 'vue'
import './style.css'
import Calculator from './App.vue'
import 'virtual:svg-icons-register';
import SvgIcon from './components/SvgIcon.vue';
import { setupStore } from './store'
import i18n from './i18n/index'
import { getActivePinia } from 'pinia' // 必须引入这两个

export default {
  install: (app: App) => {
    (window as any).__LIB_APP__ = app; // 记录库接收到的 app
    if(!getActivePinia()){
        setupStore(app)
        console.log('Pinia: 宿主未发现实例，已自动初始化。')
    }
    app.component('SvgIcon', SvgIcon)
    app.use(i18n)
    app.component('Calculator', Calculator);
  }
};