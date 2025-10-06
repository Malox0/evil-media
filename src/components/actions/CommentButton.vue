import { scrollToHash } from '@/routes';
<script setup lang="ts">
defineProps<{
  to?: string
  disabled?: boolean
}>()
</script>

<template>
  <div class="d-flex align-center">
    <v-btn :disabled="disabled" icon variant="text" :to="to">
      <v-icon> mdi-chat-outline </v-icon>
    </v-btn>
  </div>
</template>
