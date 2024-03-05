/**
 * File: \src\stores\logger.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 15:11:11
 * Author: Guoyi
 * -----
 * Last Modified: 2024-03-05 15:19:25
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 * 
 * ------------------------------------
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface logItem {
    level: 'debug' | 'info' | 'warning' | 'error' | 'fatal',
    message: string,
    timeStamp: number
}

export const useLoggerStore = defineStore('counter', () => {
    const logList = ref<logItem[]>([])

    const log = (message: string, level: logItem["level"] = 'info') => {
        logList.value.push({ message, level, timeStamp:Date.now() })
    }

    return { logList, log }
})
