<script setup lang="ts">
import { computed } from 'vue'
import { useQuadcopterDetailsStore } from '../stores/quadcopterDetails';
import { useLoggerStore } from "../stores/logger";

const logger = useLoggerStore();
const quadcopterDetails = useQuadcopterDetailsStore()

// 自定义指令
const vHighlight = {
    updated: (el: HTMLInputElement, binding: any) => {
        /* 计算颜色 */
        // 裁剪字符串，获得真实值
        const realVal = Number(el.value)
        // 正比例函数计算颜色
        const hue = 115 * (1 - realVal / Number(binding.value))
        el.style.color = `hsl(${hue}, 100%, 70%)`
    },
}

const loadPIDConfig = () => {
    const val = localStorage.getItem("PIDConfig")
    if (val) {
        quadcopterDetails.PIDConfig = JSON.parse(val)
        logger.log("配置加载成功", "info")
    } else {
        logger.log("本地配置为空", "warning")
    }

}

const savePIDConfig = () => {
    localStorage.setItem("PIDConfig", JSON.stringify(quadcopterDetails.PIDConfig))
    logger.log("配置保存成功", "info")
}

</script>

<template>
    <div id="motion-dashboard-container">
        <div style="display: flex;flex-direction: row;">
            <div class="col-container">
                <div style="height:15px;"> </div>
                <div v-for="item in quadcopterDetails.PIDConfig">{{ item.name }}</div>
            </div>
            <div style="width: 100%;">
                <div class="roll-container">
                    <div class="roll-item">P</div>
                    <div class="roll-item">I</div>
                    <div class="roll-item">D</div>
                </div>
                <div class="roll-container" v-for="item in quadcopterDetails.PIDConfig">
                    <input v-for="sub in ['P', 'I', 'D']" class="input-item" type="number" min="0" :max="item.max"
                        step="0.1" v-model="item[sub]" v-highlight="item.max"></input>
                </div>
            </div>
        </div>
        <div style="width: 100%;">
            <button type="button" @click="loadPIDConfig()">
                📚️加载
            </button>
            <button type="button" @click="savePIDConfig()">
                💾保存
            </button>
            <button type="button" @click="submitPIDConfig()">
                📤提交
            </button>
        </div>
    </div>
</template>

<style scoped>
#motion-dashboard-container {
    position: absolute;
    left: 53.5vw;
    top: 2vh;
    height: 40vh;
    width: 20vw;
    padding: 5px 10px 5px 10px;
    overflow-y: scroll;
    overflow-x: hidden;

    border-radius: 12px;
    background-color: #1a1a1a;
    transition: border-color 0.25s;
    border: 1px solid #646cff;
    font-size: small;
}

.roll-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 1.57em;
    width: 100%;
}

.roll-item {
    width: 30px;
}

.input-item {
    width: 30px;
}

.col-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 3vw;
}

button {
    background-color: #242424;
    margin: 4px;
    padding: 4px;
}
</style>
