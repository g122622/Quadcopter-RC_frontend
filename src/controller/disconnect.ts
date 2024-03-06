/**
 * File: \src\controller\disconnect.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 23:58:13
 * Author: Guoyi
 * -----
 * Last Modified: 2024-03-06 14:05:08
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 * 
 * ------------------------------------
 */

import { useQuadcopterDetailsStore } from "../stores/quadcopterDetails"
import { useLoggerStore } from "../stores/logger"

export async function disconnect() {
    const quadcopterDetailsStore = useQuadcopterDetailsStore()
    const loggerStore = useLoggerStore()
    quadcopterDetailsStore.gattServer?.disconnect()
    loggerStore.log('用户操作断开连接', 'warning')
}