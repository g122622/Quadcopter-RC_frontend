<script setup lang="ts">
import { computed } from 'vue'
import { useQuadcopterDetailsStore } from '../stores/quadcopterDetails';
import { connectToDevice } from '../controller/connectToDevice';
import { disconnect } from '../controller/disconnect';
import { toggleFlightState } from '@/controller/toggleFlightState';
import { submitPIDConfig } from '@/controller/submitPIDConfig';
import { submitPWMConfig } from '@/controller/submitPWMConfig';


const quadcopterDetails = useQuadcopterDetailsStore()
const markerColor = computed(() => {
    return quadcopterDetails.isConnected ? 'rgb(146, 212, 47)' : 'rgb(229, 108, 59)'
})

/**
 * 检查当前是否已经全屏显示，如果没有则请求全屏显示，如果已经全屏显示则退出全屏显示。
 * 可以在需要全屏显示的按钮或事件中调用这个函数来实现网页全屏显示。
 */
const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

const handleStartFlight = async () => {
    await submitPIDConfig();
    await submitPWMConfig();
    await toggleFlightState(1);
}

</script>

<template>
    <div id="connection-mgr-container">
        <div style="float: right;">
            <button type="button" @click="connectToDevice()" v-if="!quadcopterDetails.isConnected">
                <div class="innerText">📡连接无人机</div>
            </button>
            <button type="button" @click="disconnect()" v-else>
                <div class="innerText">🔗已连接，{{ quadcopterDetails.connectedTimeStr }}</div>
            </button>
        </div>

        <button type="button" @click="toggleFullScreen()" style="display: block; margin-top: 5px; float: right;">
            <div>🖥️切换全屏</div>
        </button>
        <button type="button" @click="handleStartFlight()" style="display: block; margin-top: 5px; float: right;">
            <div>🚀开始飞行</div>
        </button>
        <button type="button" @click="toggleFlightState(0)" style="display: block; margin-top: 5px; float: right;">
            <div>⛔停止飞行</div>
        </button>
    </div>
</template>

<style scoped>
#connection-mgr-container {
    float: right;
    font-size: 0.95em;
    margin-top: 20px;
    margin-right: 20px;
    width: 19vw;
}

.innerText {
    display: list-item;
    margin-left: 10px;
}

.innerText::marker {
    content: '•  ';
    font-weight: 900;
    color: v-bind('markerColor');
}
</style>
