<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLoggerStore } from '../stores/logger';

const logger = useLoggerStore()
const listContainer = ref()
const getColor = (level: string) => {
    switch (level) {
        case 'error':
            return 'rgb(229,108,59)'
        case 'warning':
            return 'rgb(225, 184, 72)'
        case 'info':
            return 'rgb(130, 211, 98)'
        case 'debug':
            return 'rgb(31, 36, 136)'
        default:
            return '';
    }
}
watch(logger.logList, () => {
    listContainer.value.scrollTop = listContainer.value.scrollHeight;
})
</script>

<template>
    <div id="log-list-container" class="dashboard-item" ref="listContainer">
        <div class="log-item" v-for="(item, index) in logger.logList" :key="item.timeStamp + item.message + item.level"
            :style="{ backgroundColor: getColor(item.level) }">
            [{{ index + 1 }}] {{ item.message }}
        </div>
    </div>
</template>

<style scoped>
#log-list-container {
    float: left;
    height: 40vh;
}

.log-item {
    width: 20vw;
    height: 3wh;
    color: white;
    border-radius: 7px;
    margin: 5px;
    padding: 2px;
    padding-left: 10px;
}
</style>
