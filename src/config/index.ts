/**
 * File: \src\config\index.ts
 * Project: rc-frontend
 * Created Date: 2024-04-18 16:46:32
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-18 17:24:52
 * Modified By:
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

const config = {
    // 运动数据相关
    motionDataServiceUUID: 0x1022,
    basicMotionDataCharacteristicUUID: 0x1023,
    // 远程控制相关
    remoteControllServiceUUID: 0xffe0,
    PIDCharacteristicUUID: 0xffe1
};

export default config;
