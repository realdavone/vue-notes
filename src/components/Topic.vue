<template>
  <div class="topic" @click="selectTopic(props.topic.id)" :data-active="topicsStore.activeTopicId === topic.id">
    <span>{{ props.topic.title }}</span>
    <span>{{ props.topic.notes.length }}</span>
  </div>
</template>

<script setup>
import useTopicsStore from '@/store/topics'
const topicsStore = useTopicsStore()

const props = defineProps({ topic: Object })

const selectTopic = (id) => topicsStore.selectTopicAsActive(id)
</script>

<style scoped>
.topic {
  padding: 0.5rem;
  border: 2px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.15s linear all;
  cursor: pointer;
  font-weight: 700;
}

.topic:not(:last-of-type) {
  margin-bottom: 0.5rem;
}

.topic[data-active=true] {
  background-color: lightgray;
  color: black;
}
</style>