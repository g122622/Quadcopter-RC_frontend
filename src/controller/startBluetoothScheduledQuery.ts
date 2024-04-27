/**
 * File: \src\controller\startBluetoothScheduledQuery.ts
 * Project: rc-frontend
 * Created Date: 2024-03-06 13:57:16
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 00:43:50
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails";

/**
 *
 */
export async function startBluetoothScheduledQuery() {
    const quadcopterDetailsStore = useQuadcopterDetailsStore();
    setInterval(() => {
        if (quadcopterDetailsStore.gattServer && quadcopterDetailsStore.gattServer.connected) {
            // 更新连接状态
            quadcopterDetailsStore.isConnected = true;
            // 更新连接时间
            if (!quadcopterDetailsStore.connectedTime) {
                quadcopterDetailsStore.connectedTime = Date.now();
            }
            const diff = Math.floor((Date.now() - quadcopterDetailsStore.connectedTime) / 1000);
            const hour = Math.floor(diff / 3600);
            let minute = String(Math.floor((diff - 3600 * hour) / 60));
            let second = String(diff % 60);
            if (minute.length === 1) minute = "0" + minute;
            if (second.length === 1) second = "0" + second;
            quadcopterDetailsStore.connectedTimeStr = `${hour}:${minute}:${second}`;
        } else {
            quadcopterDetailsStore.isConnected = false;
            // gatt服务器解除引用
            quadcopterDetailsStore.gattServer = null;
            quadcopterDetailsStore.connectedTime = 0;
        }
    }, 500);
}
