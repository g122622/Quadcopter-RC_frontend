<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuadcopterDetailsStore } from '../stores/quadcopterDetails';
import { connectToDevice } from '../controller/connectToDevice';

const quadcopterDetails = useQuadcopterDetailsStore()
const count = ref(0)
const markerColor = computed(() => {
    return quadcopterDetails.isConnected ? 'rgb(146, 212, 47)' : 'rgb(229, 108, 59)'
})

</script>

<template>
    <div id="connection-mgr-container">
        <button type="button" @click="connectToDevice()" v-if="!quadcopterDetails.isConnected">
            <div class="innerText">连接设备</div>
        </button>
        <button type="button" @click="count++" v-else>
            <div class="innerText">已连接，{{ quadcopterDetails.connectedTimeStr }}</div>
        </button>
    </div>
</template>

<style scoped>
#connection-mgr-container {
    position: absolute;
    right: 5vw;
    top: 1vw;
}

.innerText {
    display: list-item;
    margin-left: 5px;
}

.innerText::marker {
    content: '•  ';
    font-weight: 900;
    color: v-bind('markerColor');
}
</style>
