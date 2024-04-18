<script setup lang="ts">
import ConnectionManager from './components/ConnectionManager.vue'
import LogList from './components/LogList.vue'
import MotionDashboard from './components/MotionDashboard.vue'
import PIDDashboard from './components/PIDDashboard.vue'
</script>

<template>
    <ConnectionManager />
    <LogList />
    <MotionDashboard />
    <PIDDashboard />
</template>

<style scoped></style>
