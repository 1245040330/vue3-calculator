import { setupStore } from '@/store'
import i18n from '@/i18n/index'
import SvgIcon from '@/components/SvgIcon.vue';
import { getActivePinia } from 'pinia' 

export function initDependencies(app) {
    // 确保 Pinia 存在
    if (!getActivePinia()) {
        setupStore(app);
    }
    app.use(i18n);
    app.component('SvgIcon', SvgIcon);
};