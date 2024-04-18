/**
 * File: \src\controller\startMotionScheduledQuery.ts
 * Project: rc-frontend
 * Created Date: 2024-03-12 19:59:28
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-18 16:46:59
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { useLoggerStore } from "../stores/logger";
import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails";
import sleep from "../utils/sleep";

import config from "../config";

/**
 *
 */
export async function startMotionDataScheduledQuery() {
    const quadcopterDetailsStore = useQuadcopterDetailsStore();
    const logger = useLoggerStore();

    let characteristicCache: null | BluetoothRemoteGATTCharacteristic = null;
    for (;;) {
        if (quadcopterDetailsStore.isConnected) {
            if (characteristicCache) {
                // 有缓存，则读取数据
                const dataView = await characteristicCache.readValue();
                console.log(dataView);
                // 处理数据，并且更新到全局状态存储中
                quadcopterDetailsStore.basicMotionData.ax = dataView.getFloat32(0, true);
                quadcopterDetailsStore.basicMotionData.ay = dataView.getFloat32(4, true);
                quadcopterDetailsStore.basicMotionData.az = dataView.getFloat32(8, true);
                quadcopterDetailsStore.basicMotionData.gx = dataView.getFloat32(12, true);
                quadcopterDetailsStore.basicMotionData.gy = dataView.getFloat32(16, true);
                quadcopterDetailsStore.basicMotionData.gz = dataView.getFloat32(20, true);
            } else {
                // 若没有缓存的characteristic，则尝试获取characteristic，并更新缓存
                const service = await quadcopterDetailsStore.gattServer?.getPrimaryService(config.motionDataServiceUUID);
                const characteristic = await service?.getCharacteristic(config.basicMotionDataCharacteristicUUID);
                if (characteristic) {
                    characteristicCache = characteristic;
                    logger.log("运动数据chr连接成功");
                } else {
                    // 如果获取失败，那么多休息一会儿再重新获取，无需每隔100ms进行一次query
                    await sleep(1000);
                }
            }
        }
        await sleep(100);
    }
}
