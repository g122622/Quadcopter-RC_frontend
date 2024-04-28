/**
 * File: \src\controller\submitPWMConfig.ts
 * Project: rc-frontend
 * Created Date: 2024-04-18 16:25:01
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-28 19:07:54
 * Modified By:
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails";
import { useLoggerStore } from "../stores/logger";
import config from "../config";

export async function submitPWMConfig() {
    const quadcopterDetails = useQuadcopterDetailsStore();
    const logger = useLoggerStore();

    if (quadcopterDetails.gattServer && quadcopterDetails.gattServer.connected) {
        // 尝试获取characteristic
        const service = await quadcopterDetails.gattServer?.getPrimaryService(config.remoteControllServiceUUID);
        const characteristic = await service?.getCharacteristic(0xffe3);
        if (characteristic) {
            const dataView = new DataView(new ArrayBuffer(2 * 4)); // 含2个float数据，每个float数据4个字节

            dataView.setFloat32(0, quadcopterDetails.PWMConfig.basic, true);
            dataView.setFloat32(4, quadcopterDetails.PWMConfig.mult, true);

            await characteristic.writeValue(dataView);
            logger.log("提交PWM配置成功");
            return;
        } else {
            // 获取失败
            logger.log("蓝牙chr获取失败", "error");
        }
    } else {
        logger.log("蓝牙未连接或连接异常", "error");
    }
}
