import { App } from 'vue'
import Calculator from './App.vue'
import { initDependencies } from './utils/initUtil'
export default {
  install: (app: App) => {
    initDependencies(app)
    app.component('Calculator', Calculator);
  }
};

export { Calculator };