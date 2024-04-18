/**
 * File: \src\controller\submitPIDConfig.ts
 * Project: rc-frontend
 * Created Date: 2024-04-18 16:25:01
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-18 17:24:52
 * Modified By:
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails";
import { useLoggerStore } from "../stores/logger";
import config from "../config";

export async function submitPIDConfig() {
    const quadcopterDetails = useQuadcopterDetailsStore();
    const logger = useLoggerStore();

    if (quadcopterDetails.gattServer && quadcopterDetails.gattServer.connected && quadcopterDetails.isConnected) {
        // 尝试获取characteristic
        const service = await quadcopterDetails.gattServer?.getPrimaryService(config.remoteControllServiceUUID);
        const characteristic = await service?.getCharacteristic(config.PIDCharacteristicUUID);
        if (characteristic) {
            const dataView = new DataView(new ArrayBuffer(4 * 3)); // 4个PID配置，每个配置含3个float数据

            const seq = [3, 0, 1]; // gyro, pitch, roll
            for (let i = 0; i < seq.length; i++) {
                dataView.setFloat32(0 + 12 * i, quadcopterDetails.PIDConfig[seq[i]].P, true);
                dataView.setFloat32(4 + 12 * i, quadcopterDetails.PIDConfig[seq[i]].I, true);
                dataView.setFloat32(8 + 12 * i, quadcopterDetails.PIDConfig[seq[i]].D, true);
            }

            await characteristic.writeValue(dataView);
            return;
        } else {
            // 获取失败
            logger.log("蓝牙chr获取失败", "error");
        }
    } else {
        logger.log("蓝牙未连接或连接异常", "error");
    }
}
