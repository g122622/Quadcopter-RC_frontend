/**
 * File: \src\stores\quadcopterDetails.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 13:57:19
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-18 15:47:21
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */
import { defineStore } from "pinia";

export const useQuadcopterDetailsStore = defineStore("QuadcopterDetails", {
    state: () => ({
        connectedTime: 0 as number,
        connectedTimeStr: "",
        isConnected: false,
        gattServer: null as BluetoothRemoteGATTServer | null,
        basicMotionData: {
            ax: 0 as number,
            ay: 0 as number,
            az: 0 as number,
            gx: 0 as number,
            gy: 0 as number,
            gz: 0 as number
        },
        PIDConfig: [
            { name: "Pit", P: 1, I: 0, D: 5, max: 10 },
            { name: "Rol", P: 1, I: 0, D: 5, max: 10 },
            { name: "Yaw", P: 1, I: 0, D: 5, max: 10 },
            { name: "Gyr", P: 1, I: 0, D: 5, max: 10 },
            { name: "Thr", P: 1, I: 0, D: 5, max: 10 }
        ]
    })
});
