/**
 * File: \src\main.ts
 * Project: rc-frontend
 * Created Date: 2024-03-04 21:21:49
 * Author: Guoyi
 * -----
 * Last Modified: 2024-03-12 22:02:28
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 * 
 * ------------------------------------
 */

import { createApp } from 'vue'
import './styles/globalStyles.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { startBluetoothScheduledQuery } from './controller/startBluetoothScheduledQuery'
import { startMotionDataScheduledQuery } from './controller/startMotionDataScheduledQuery'
import sleep from './utils/sleep'

class Application {
    initVue() {
        const pinia = createPinia()
        createApp(App)
            .use(pinia)
            .mount('#app')
    }

    async initAll() {
        this.initVue()
        await sleep(500)
        await startBluetoothScheduledQuery()
        await sleep(500)
        await startMotionDataScheduledQuery()
    }

    constructor() {
        this.initAll()
    }
}

(function () {
    new Application()
})();
