/**
 * File: \src\main.ts
 * Project: rc-frontend
 * Created Date: 2024-03-04 21:21:49
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 15:29:26
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { createApp, nextTick } from "vue";
import "./styles/globalStyles.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { startBluetoothScheduledQuery } from "./controller/startBluetoothScheduledQuery";
import { startMotionDataScheduledQuery } from "./controller/startCharacteristicsScheduledQuery";
import sleep from "./utils/sleep";

import { useLoggerStore } from "./stores/logger";
class Application {
    initVue() {
        const pinia = createPinia();
        createApp(App).use(pinia).mount("#app");
    }

    initEvents() {
        window.addEventListener("error", function (event) {
            const logger = useLoggerStore();
            logger.log(event.error.stack, "error");
        });
    }

    async initAll() {
        this.initVue();
        this.initEvents();
        await sleep(500);
        startBluetoothScheduledQuery();
        await sleep(500);
        startMotionDataScheduledQuery();

        await nextTick();
        useLoggerStore().log("初始化全部成功", "warning");
        useLoggerStore().log("目前仍在测试，功能不稳定", "error");
    }

    constructor() {
        this.initAll();
    }
}

(function () {
    new Application();
})();
