<script setup lang="ts">
const props = defineProps({
  id: { type: String },
  buttonType: { type: String, default: 'button' },
  action: { type: Function },
  text: { type: String, required: true }
})
</script>

<template>
  <button :id="props.id" type="button" @click="props.action">{{ props.text }}</button>
</template>
