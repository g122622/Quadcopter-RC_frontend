/**
 * File: \src\stores\quadcopterDetails.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 13:57:19
 * Author: Guoyi
 * -----
 * Last Modified: 2024-03-05 15:07:25
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 * 
 * ------------------------------------
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuadcopterDetailsStore = defineStore('counter', () => {
    const connectedTime = ref<Date>(new Date())
    const isConnected = ref<boolean>(false)

    return { connectedTime, isConnected }
})