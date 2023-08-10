<script setup lang="ts">
const props = defineProps({
  id: { type: String },
  buttonType: { type: String, default: 'button' },
  action: { type: Function },
  text: { type: String, required: true },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <button :id="props.id" type="button" @click="props.action" :disabled="props.disabled">
    {{ props.text }}
  </button>
</template>
