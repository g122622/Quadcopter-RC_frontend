/**
 * File: \src\controller\connectToDevice.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 14:45:49
 * Author: Guoyi
 * -----
 * Last Modified: 2024-03-05 23:59:21
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 * 
 * ------------------------------------
 */

import { useLoggerStore } from "../stores/logger"
import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails"

const config = {
    RCServiceUUID: 0xffe0
}

export const connectToDevice = () => {
    const loggerStore = useLoggerStore()
    const quadcopterDetailsStore = useQuadcopterDetailsStore()

    return new Promise<void>((resolve, reject) => {
        let isBleSupported = !!navigator && ("bluetooth" in navigator)
        if (isBleSupported) {
            navigator.bluetooth.getAvailability().then(async () => {
                loggerStore.log('设备和浏览器支持蓝牙')
                // 显示蓝牙列表
                const device = await navigator.bluetooth.requestDevice({
                    filters: [{ services: [config.RCServiceUUID] }],
                });
                if (device && device.gatt) {
                    console.log("device", device);
                    loggerStore.log('设备句柄获取成功')

                    // 开始连接设备
                    const server = await device.gatt.connect();
                    quadcopterDetailsStore.gattServer = server
                    console.log("server", server);
                    loggerStore.log(`gatt服务器连接成功`)

                    // 添加断开连接事件
                    // device.addEventListener("gattserverdisconnected", onDisconnected);
                    // 监听characteristic
                    const service = await server.getPrimaryService(config.RCServiceUUID);
                    console.log("service", service);
                    loggerStore.log(`gatt服务 0x${config.RCServiceUUID.toString(16)} 连接成功`)

                    // 读取信息
                    // const characteristic = await service.getCharacteristic(
                    //     type.notifyCharacteristic
                    // );
                    // console.log("characteristic", characteristic);
                    // await characteristic.startNotifications();

                    // 监听信息变动
                    // characteristic.addEventListener("characteristicvaluechanged", (event) => {
                    //     const value = event.target.value;
                    //     console.log(
                    //         "characteristicvaluechanged",
                    //         value.buffer,
                    //         typeof value.buffer
                    //     );
                    //     onReadFrame(new Uint8Array(value.buffer));
                    // });

                    // 写入数据
                    // writeCharacteristic = await service.getCharacteristic(
                    //     type.writeCharacteristic
                    // );
                    // console.log(utils.hexStringToBuffer("123"))
                    // utils.sendHex(utils.hexStringToBuffer("123"))
                    resolve()
                } else {
                    loggerStore.log(`无法获取设备句柄`)
                    reject()
                }
            })
        } else {
            alert("设备或浏览器不支持蓝牙")
            reject()
        }
    })
}