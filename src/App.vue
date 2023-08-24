<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Main from '@/components/Main.vue'
</script>

<template>
  <div class="wrapper">
    <Sidebar />
    <Main />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  min-height: 100vh;
}
</style>