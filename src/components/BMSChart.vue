<script setup lang="ts">
import { useQuadcopterDetailsStore } from '../stores/quadcopterDetails';
// import { useLoggerStore } from "../stores/logger";
import vHighlight from '@/directives/vHlight';

// const logger = useLoggerStore();
const quadcopterDetails = useQuadcopterDetailsStore()

</script>

<template>
    <div id="BMS-Chart-container" class="dashboard-item">
        <div v-highlight="4300">{{ quadcopterDetails.BMS.batteryVoltage }}</div>
    </div>
</template>

<style scoped>
#BMS-Chart-container {
    float: left;
    height: 40vh;
    width: 23vw;
    padding: 5px 10px 5px 10px;
}

.input-item {
    width: 30px;
    background-color: #3f3f3f;
    border: none;
    border-radius: 3px;
    margin: 2px;
}

button {
    background-color: #242424;
    margin: 4px;
    padding: 4px;
}
</style>
