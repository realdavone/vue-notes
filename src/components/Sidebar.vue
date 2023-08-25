<template>
  <aside>
    <div class="logo">
      Poznámky
    </div>
    <section class="content">
      <header>
        <h2>Témy</h2>
        <button class="add-topic-button" @click="modalRef.toggleModal(true)">Pridať tému</button>
      </header>

      <div v-if="!!topicsStore.topics.length">
        <Topic v-for="topic in topicsStore.topics" :key="topic.id" :topic="topic" />
      </div>
      <div v-else>
        Nie sú tu žiadne témy
      </div>      
    </section>
  </aside>
  <Modal ref="modalRef" @opened="mounted">
    <template #body>
      <input ref="inputRef" type="text" v-model="newTopicTitle" placeholder="Názov témy" @keypress.enter="saveTopic" />
    </template>
    <template #footer>
      <div class="buttons">
        <button class="add-topic-button" style="background-color: crimson;" @click="modalRef.toggleModal(false)">Zrušiť</button>
        <button class="add-topic-button" @click="saveTopic">Vytvoriť</button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
import useTopicsStore from '@/store/topics'
import Topic from '@/components/Topic.vue'

const topicsStore = useTopicsStore()

const newTopicTitle = ref(null)
const inputRef = ref(null)

const saveTopic = () => {
  const newTopic = topicsStore.addTopic(newTopicTitle.value)
  newTopicTitle.value = null
  modalRef.value.toggleModal(false)
  topicsStore.selectTopicAsActive(newTopic.id)
}

const modalRef = ref(null)

const mounted = () => setTimeout(() => inputRef.value.focus(), 50)
</script>

<style scoped>
aside {
  width: 20%;
  border-right: 1px solid var(--secondary-background-color);
}
.logo {
  background-color: var(--primary-color);
  padding-inline: 1.5rem;
  padding-block: 1.5rem;
  font-size: 1.75rem;
  font-weight: 700;
}
.content {
  padding: 1.5rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.add-topic-button {
  align-self: flex-end;
  background-color: var(--primary-color);
  color: white;
  padding: 4px 8px;
  font-size: 0.9rem;
}

input {
  color: white;
  border: 1px solid lightgrey;
  padding: 0.5rem;
  width: 100%;
}

input:focus {
  border-color: white;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>