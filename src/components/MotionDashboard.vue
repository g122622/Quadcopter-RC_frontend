<script setup lang="ts">
import { useQuadcopterDetailsStore } from '../stores/quadcopterDetails';

const quadcopterDetails = useQuadcopterDetailsStore()
// setInterval(() => {
//     quadcopterDetails.basicMotionData.ax = Math.random().toFixed(5);
// }, 100)

// 自定义指令
const vHighlight = {
    updated: (el: HTMLDivElement, binding: any) => {
        /* 计算颜色 */
        // 裁剪字符串，获得真实值
        const realVal = Number(el.innerText.split(":")[1])
        // 正比例函数计算颜色
        const hue = 115 * (1 - realVal / Number(binding.value))
        el.style.color = `hsl(${hue}, 100%, 70%)`
    },
}

</script>

<template>
    <div id="motion-dashboard-container">
        <div style="width: 45%; float: left;">
            <div v-highlight="1">ax: {{ quadcopterDetails.basicMotionData.ax.toFixed(3) }}</div>
            <div v-highlight="1">ay: {{ quadcopterDetails.basicMotionData.ay.toFixed(3) }}</div>
            <div v-highlight="1">az: {{ quadcopterDetails.basicMotionData.az.toFixed(3) }}</div>
        </div>
        <div style="width: 45%; float: left;">
            <div v-highlight="1">gx: {{ quadcopterDetails.basicMotionData.gx.toFixed(3) }}</div>
            <div v-highlight="1">gy: {{ quadcopterDetails.basicMotionData.gy.toFixed(3) }}</div>
            <div v-highlight="1">gz: {{ quadcopterDetails.basicMotionData.gz.toFixed(3) }}</div>
        </div>
        <div>
            pitch: roll:
        </div>
    </div>
</template>

<style scoped>
#motion-dashboard-container {
    position: absolute;
    left: 5vw;
    top: 2vh;
    height: 30vh;
    width: 20vw;
    padding: 5px 10px 5px 10px;
    overflow-y: scroll;
    overflow-x: hidden;

    border-radius: 12px;
    background-color: #1a1a1a;
    transition: border-color 0.25s;

    font-size: small;
    border: 1px solid #646cff;
}
</style>
