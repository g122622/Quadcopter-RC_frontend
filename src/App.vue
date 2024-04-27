<script setup lang="ts">
import ConnectionManager from './components/ConnectionManager.vue'
import LogList from './components/LogList.vue'
import MotionDashboard from './components/MotionDashboard.vue'
import PIDDashboard from './components/PIDDashboard.vue'
import BMSChart from './components/BMSChart.vue'

</script>

<template>
    <MotionDashboard />
    <LogList />
    <PIDDashboard />
    <ConnectionManager />
    <BMSChart />
</template>

<style scoped></style>
