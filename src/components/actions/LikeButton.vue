<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    liked: boolean
  }>(),
  {
    liked: false,
  },
)

const emit = defineEmits<{
  (e: 'toggle-like'): void
}>()

function onClick() {
  emit('toggle-like')
}
</script>

<template>
  <div class="d-flex align-center">
    <v-btn @click="onClick" icon variant="text">
      <v-icon>{{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
    </v-btn>
  </div>
</template>
