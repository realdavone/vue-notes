<template>
  <article :data-complete="props.note.isComplete">
    <button class="checkmark" @click="toggleComplete">&check;</button>
    <section class="content">
      {{ props.note.text }}
    </section>
    <button class="delete" @click="deleteNote">
      <span class="material-symbols-outlined">delete</span>
    </button>
  </article>
</template>

<script setup>
import useTopicsStore from '@/store/topics'

const topicsStore = useTopicsStore()

const props = defineProps({ note: Object })

const toggleComplete = () => topicsStore.toggleCompleteNote(props.note.id)
const deleteNote = () => topicsStore.removeNote(props.note.id)

</script>

<style scoped>
article {
  padding: 0.5rem;
  border: 1px solid grey;
  display: flex;
  transition: 0.15s linear background-color;
}

article[data-complete=true] {
  background-color: #00800050;
}

article:not(:last-of-type) {
  margin-bottom: 0.5rem;
}

.content {
  width: 100%;
  padding-left: 0.5rem;
}

button {
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

button.checkmark {
  background-color: forestgreen;
}

button.delete {
  background-color: crimson;
}
</style>