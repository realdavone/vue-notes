<template>
  <button :data-variation="variation">
    <slot />
  </button>
</template>

<script setup>
const { variation } = defineProps({
  variation: {
    type: String,
    default: 'primary'
  }
})
</script>

<style scoped>
button {
  align-self: flex-end;
  color: white;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  white-space: nowrap;
}

button[data-variation="primary"] {
  background-color: var(--primary-color);
}

button[data-variation="destructive"] {
  background-color: crimson;
}
</style>