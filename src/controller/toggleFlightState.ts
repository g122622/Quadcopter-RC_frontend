/**
 * File: \src\controller\toggleFlightState.ts
 * Project: rc-frontend
 * Created Date: 2024-04-28 00:49:21
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-28 12:18:09
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails";
import { useLoggerStore } from "../stores/logger";
import config from "../config";

export async function toggleFlightState(stateIn: number) {
    const quadcopterDetails = useQuadcopterDetailsStore();
    const logger = useLoggerStore();

    if (quadcopterDetails.gattServer && quadcopterDetails.gattServer.connected) {
        // 尝试获取characteristic
        const service = await quadcopterDetails.gattServer?.getPrimaryService(config.remoteControllServiceUUID);
        const characteristic = await service?.getCharacteristic(0xffe2);
        if (characteristic) {
            const dataView = new DataView(new ArrayBuffer(4)); // 1个int，4字节
            
            dataView.setInt32(0, stateIn, true);
            await characteristic.writeValue(dataView);
            
            logger.log("toogle状态成功→" + stateIn);
            return;
        } else {
            // 获取失败
            logger.log("蓝牙chr获取失败", "error");
        }
    } else {
        logger.log("蓝牙未连接或连接异常", "error");
    }
}
