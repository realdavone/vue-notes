<template>
  <Teleport to="body">
    <div v-if="isOpen" class="backdrop" @click.self="toggleModal(false)">
      <div class="modal">
        <header>
          <slot name="header" />
        </header>
        <section>
          <slot name="body" />
        </section>
        <footer>
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['opened', 'closed'])

const isOpen = ref(false)

const toggleModal = (state = undefined) => {
  isOpen.value = state ?? !isOpen.value
  
  emit(isOpen.value ? 'opened' : 'closed')
}

defineExpose({ toggleModal })
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  height: 100vh;
  display: grid;
  place-items: center;
}

.modal {
  background-color: var(--secondary-background-color);
  padding: 1rem;
}
</style>