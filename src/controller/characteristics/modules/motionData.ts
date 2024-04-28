/**
 * File: \src\controller\characteristics\motionData.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:14:16
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 22:21:11
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import noop from "@/utils/noop";
import Characteristic from "../types/characteristic";
import config from "@/config";
import { useQuadcopterDetailsStore } from "@/stores/quadcopterDetails";

const motionData: Characteristic = {
    serviceUUID: config.remoteInfoServiceUUID,
    characteristicUUID: 0x1023,
    async successHandler(characteristic) {
        const quadcopterDetailsStore = useQuadcopterDetailsStore();
        const dataView = await characteristic.readValue();
        // 处理数据，并且更新到全局状态存储中
        quadcopterDetailsStore.basicMotionData.ax = dataView.getFloat32(0, true);
        quadcopterDetailsStore.basicMotionData.ay = dataView.getFloat32(4, true);
        quadcopterDetailsStore.basicMotionData.az = dataView.getFloat32(8, true);
        quadcopterDetailsStore.basicMotionData.gx = dataView.getFloat32(12, true);
        quadcopterDetailsStore.basicMotionData.gy = dataView.getFloat32(16, true);
        quadcopterDetailsStore.basicMotionData.gz = dataView.getFloat32(20, true);
        quadcopterDetailsStore.basicMotionData.pitch = dataView.getFloat32(24, true);
        quadcopterDetailsStore.basicMotionData.roll = dataView.getFloat32(28, true);
    },
    errorHandler: noop,
    queryInterval: 100
};

export default motionData;
