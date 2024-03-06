import { createApp } from 'vue'
import './styles/globalStyles.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import { useQuadcopterDetailsStore } from './stores/quadcopterDetails'
import sleep from './utils/sleep'
import { startBluetoothScheduledQuery } from './controller/startBluetoothScheduledQuery'

class Application {
    initVue() {
        const pinia = createPinia()
        createApp(App)
            .use(pinia)
            .mount('#app')
    }

    async initAll() {
        this.initVue()
        await startBluetoothScheduledQuery()
    }

    constructor() {
        this.initAll()
    }
}

(function () {
    new Application()
})();
