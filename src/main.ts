import { createApp } from 'vue'
import './styles/globalStyles.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import { useQuadcopterDetailsStore } from './stores/quadcopterDetails'
import sleep from './utils/sleep'

class Application {
    initVue() {
        const pinia = createPinia()
        createApp(App)
            .use(pinia)
            .mount('#app')
    }

    async initBluetoothScheduledQuery() {
        await sleep(1000)
        const quadcopterDetailsStore = useQuadcopterDetailsStore()
        setInterval(() => {
            if (quadcopterDetailsStore.gattServer && quadcopterDetailsStore.gattServer.connected) {
                quadcopterDetailsStore.isConnected = true
                if (!quadcopterDetailsStore.connectedTime) {
                    quadcopterDetailsStore.connectedTime = Date.now()
                }
                const diff = Math.floor((Date.now() - quadcopterDetailsStore.connectedTime) / 1000)
                const hour = Math.floor(diff / 3600)
                const minute = Math.floor((diff - 3600 * hour) / 60)
                const second = diff % 60
                quadcopterDetailsStore.connectedTimeStr = `${hour}:${minute}:${second}`
            } else {
                quadcopterDetailsStore.isConnected = false
                quadcopterDetailsStore.gattServer = null
                quadcopterDetailsStore.connectedTime = 0
            }
        }, 500)
    }

    async initAll() {
        this.initVue()
        await this.initBluetoothScheduledQuery()
    }

    constructor() {
        this.initAll()
    }
}

(function () {
    new Application()
})();
