/**
 * File: \src\controller\startMotionScheduledQuery.ts
 * Project: rc-frontend
 * Created Date: 2024-03-12 19:59:28
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 16:29:28
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import sleep from "@/utils/sleep";
import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails";
import characteristics from "./characteristics";
import Characteristic from "./characteristics/types/characteristic";

/**
 *
 */
export async function startMotionDataScheduledQuery() {
    const quadcopterDetailsStore = useQuadcopterDetailsStore();

    characteristics.forEach(async (item: Characteristic) => {
        let characteristicCache: null | BluetoothRemoteGATTCharacteristic = null;
        while (1) {
            if (quadcopterDetailsStore.isConnected) {
                if (characteristicCache) {
                    // 有缓存，则读取数据
                    await item.successHandler(characteristicCache);
                } else {
                    // 若没有缓存的characteristic，则尝试获取characteristic，并更新缓存
                    const service = await quadcopterDetailsStore.gattServer?.getPrimaryService(item.serviceUUID);
                    const characteristic = await service?.getCharacteristic(item.characteristicUUID);
                    if (characteristic) {
                        characteristicCache = characteristic;
                    } else {
                        item.errorHandler();
                    }
                }
            }
            await sleep(item.queryInterval);
        }
    });
}
