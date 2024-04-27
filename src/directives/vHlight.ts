/**
 * File: \src\directives\vHlight.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 16:39:23
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 16:40:22
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

// 自定义指令
const vHighlight = {
    updated: (el: HTMLDivElement, binding: any) => {
        /* 计算颜色 */
        // 裁剪字符串，获得真实值
        let realVal = Math.abs(Number(el.innerText.split(":")[1]));
        if (realVal > binding.value) {
            realVal = binding.value;
        }
        // 正比例函数计算颜色
        const hue = 115 * (1 - realVal / Number(binding.value));
        el.style.color = `hsl(${hue}, 100%, 70%)`;
    }
};

export default vHighlight
