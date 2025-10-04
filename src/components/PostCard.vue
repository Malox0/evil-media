<script setup lang="ts">
import LikeButton from '@/components/actions/LikeButton.vue'
import CommentButton from '@/components/actions/CommentButton.vue'
import UserCard from '@/components/user/UserCard.vue'
import { ref } from 'vue'
defineProps<{
  key: number
  title: string
  subTitle: string
}>()
const followed = ref(false)
const tags = ref<string[]>(['Gabel', 'Grueneis skkkrr', 'Paracetamol'])
</script>
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      variant="outlined"
      color="surface-variant"
      class="ma-8 pa-2 rounded-xl transition-slow"
      :style="isHovering ? 'transform: scale(1.02);' : ''"
      :elevation="isHovering ? 12 : 2"
    >
      <div class="d-flex flex-row justify-space-between align-center">
        <UserCard />

        <v-btn
          class="mr-2"
          :color="followed ? 'primary' : undefined"
          :variant="followed ? 'flat' : 'outlined'"
          @click="followed = !followed"
          rounded
        >
          {{ followed ? 'Following' : 'Follow' }}</v-btn
        >
      </div>
      <v-card-title class="font-weight-bold">{{ title }}</v-card-title>
      <v-card-text>{{ subTitle }}</v-card-text>

      <v-img
        src="https://picsum.photos/800/400"
        alt="Example Post Image"
        class="ma-2 rounded"
        height="300"
        cover
      />

      <v-chip v-for="tag in tags" :key="tag" size="small" class="ma-1"> #{{ tag }}</v-chip>

      <v-divider class="ma-2" />
      <template v-slot:actions>
        <LikeButton class="ml-2"></LikeButton>
        <CommentButton></CommentButton>
        <v-btn icon variant="text">
          <v-icon> mdi-share-variant</v-icon>
        </v-btn>
      </template>
    </v-card>
  </v-hover>
</template>

<style scoped>
.transition-slow {
  transition: all 0.2s ease;
}
</style>
