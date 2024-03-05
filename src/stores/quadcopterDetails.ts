/**
 * File: \src\stores\quadcopterDetails.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 13:57:19
 * Author: Guoyi
 * -----
 * Last Modified: 2024-03-05 23:53:04
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 * 
 * ------------------------------------
 */
import { defineStore } from 'pinia'

export const useQuadcopterDetailsStore = defineStore('QuadcopterDetails', {
    state: () => ({
        connectedTime: 0 as number,
        connectedTimeStr: '',
        isConnected: false,
        gattServer: null as BluetoothRemoteGATTServer | null,
    })
})
