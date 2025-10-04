<script setup lang="ts">
defineProps<{
  key: number
  title: string
  subTitle: string
}>()
</script>
<template>
  <v-card
    variant="outlined"
    color="surface-variant"
    class="ma-8"
    :subtitle="subTitle"
    :title="title"
  >
    <template v-slot:actions>
      <v-btn text="Button"></v-btn>
    </template>
  </v-card>
</template>
