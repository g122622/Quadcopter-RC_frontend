<script setup lang="ts">
import { useQuadcopterDetailsStore } from '../stores/quadcopterDetails';
import vHighlight from '@/directives/vHlight';

const quadcopterDetails = useQuadcopterDetailsStore()

</script>

<template>
    <div id="motion-dashboard-container" class="dashboard-item">
        <div style="width: 45%; float: left;">
            <div v-highlight="1">ax: {{ quadcopterDetails.basicMotionData.ax.toFixed(3) }}</div>
            <div v-highlight="1">ay: {{ quadcopterDetails.basicMotionData.ay.toFixed(3) }}</div>
            <div v-highlight="1">az: {{ quadcopterDetails.basicMotionData.az.toFixed(3) }}</div>
        </div>
        <div style="width: 45%; float: left;">
            <div v-highlight="90">gx: {{ quadcopterDetails.basicMotionData.gx.toFixed(3) }}</div>
            <div v-highlight="90">gy: {{ quadcopterDetails.basicMotionData.gy.toFixed(3) }}</div>
            <div v-highlight="90">gz: {{ quadcopterDetails.basicMotionData.gz.toFixed(3) }}</div>
        </div>
        <div style="width: 90%; float: left;">
            <div v-highlight="90">pitch: {{ quadcopterDetails.basicMotionData.pitch.toFixed(3) }}</div>
            <div v-highlight="90">roll: {{ quadcopterDetails.basicMotionData.roll.toFixed(3) }}</div>
            <!-- <div v-highlight="90">yaw: {{ quadcopterDetails.basicMotionData.yaw.toFixed(3) }}</div> -->
        </div>
    </div>
</template>

<style scoped>
#motion-dashboard-container {
    float: left;
    height: 30vh;
    width: 20vw;
    padding: 5px 10px 5px 10px;
}
</style>
