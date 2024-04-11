<script setup lang="ts">
import { computed } from 'vue'
import { useQuadcopterDetailsStore } from '../stores/quadcopterDetails';

const quadcopterDetails = useQuadcopterDetailsStore()
const markerColor = computed(() => {
    return quadcopterDetails.isConnected ? 'rgb(146, 212, 47)' : 'rgb(229, 108, 59)'
})

</script>

<template>
    <div id="motion-dashboard-container">
        <div>{{ quadcopterDetails.basicMotionData.ax }}</div>
        <div>{{ quadcopterDetails.basicMotionData.ay }}</div>
        <div>{{ quadcopterDetails.basicMotionData.az }}</div>
    </div>
</template>

<style scoped>
#motion-dashboard-container {
    position: absolute;
    left: 5vw;
    top: 2vh;
}
</style>
