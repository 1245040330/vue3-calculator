
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:svg-icons-register';
import SvgIcon from './components/SvgIcon.vue';
import 'uno.css'
import { setupStore } from './store'
import "katex/dist/katex.min.css";
import i18n from './i18n/index'
const app =createApp(App)
setupStore(app)
app.component('SvgIcon', SvgIcon).use(i18n).mount('#app')
