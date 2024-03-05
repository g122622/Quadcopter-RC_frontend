/**
 * File: \src\utils\sleep.ts
 * Project: rc-frontend
 * Created Date: 2024-03-05 20:26:45
 * Author: Guoyi
 * -----
 * Last Modified: 2024-03-05 20:28:27
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 * 
 * ------------------------------------
 */

const sleep = function (ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}

export default sleep
