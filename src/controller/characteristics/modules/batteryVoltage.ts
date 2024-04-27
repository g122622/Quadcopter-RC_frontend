/**
 * File: \src\controller\characteristics\batteryVoltage.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:14:31
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 16:43:39
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

const batteryVoltage: Characteristic = {
    serviceUUID: config.remoteInfoServiceUUID,
    characteristicUUID: 0x1024,
    async successHandler(characteristic) {
        const quadcopterDetailsStore = useQuadcopterDetailsStore();
        const dataView = await characteristic.readValue();
        // 处理数据，并且更新到全局状态存储中
        quadcopterDetailsStore.BMS.batteryVoltage = dataView.getInt32(0, true);
    },
    errorHandler: noop,
    queryInterval: 500
};

export default batteryVoltage;
