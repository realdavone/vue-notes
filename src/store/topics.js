import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const useTopicsStore = defineStore('topics-store', () => {
  const topics = ref([])
  const activeTopicId = ref(null)
  const activeTopic = computed(() => topics.value.find(t => t.id === activeTopicId.value))

  const selectTopicAsActive = (id) => activeTopicId.value = id
  const addTopic = (topicTitle) => {
    const newTopic = { id: crypto.randomUUID(), title: topicTitle, notes: [] }

    topics.value.unshift(newTopic)

    return newTopic
  }
  const removeTopic = (id) => {
    if(!window.confirm('Skutočne chcete zmazať túto tému?')) return

    topics.value = topics.value.filter(t => t.id !== id)
  }

  const addNoteToTopic = (topicId, text) => {
    topics.value.find(t => t.id === topicId).notes.unshift({
      id: crypto.randomUUID(),
      created: new Date().getTime(),
      isComplete: false,
      text
    })
  }
  const toggleCompleteNote = (id) => {
    const note = topics.value.flatMap(topic => topic.notes).find(note => note.id === id)

    note.isComplete = !note.isComplete
  }
  const removeNote = (id) => {
    if(!window.confirm('Skutočne chcete zmazať túto poznámku?')) return

    const activeTopicFromRef = topics.value.find(topic => topic.id === activeTopicId.value)

    activeTopicFromRef.notes = activeTopicFromRef.notes.filter(note => note.id !== id)
  }

  topics.value = JSON.parse(localStorage.getItem('topics'))?.data ?? []

  watch(topics, newValue => {
    localStorage.setItem('topics', JSON.stringify({data: newValue}))
  }, {
    deep: true
  })

  return {
    topics,
    selectTopicAsActive,
    addTopic,
    removeTopic,
    activeTopic,
    activeTopicId,
    addNoteToTopic,
    toggleCompleteNote,
    removeNote
  }
})

export default useTopicsStore