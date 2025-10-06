<script setup lang="ts">
import type { Comment } from '../../types/comment'
import LikeButton from '@/components/actions/LikeButton.vue'
interface Props {
  comment: Comment
  disableFollowBtn: boolean
  variant?: 'flat' | 'outlined' | 'plain' | 'tonal' | undefined
}
const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
  variant: 'plain',
})
</script>
<template>
  <v-card :variant="variant" class="pa-2 mt-4 mb-4 rounded-lg">
    <div class="d-flex flex-row">
      <v-card-text v-if="!disableFollowBtn">
        <span class="opacity-70">Commented on </span>
        <span class="text-primary fond-weight-bold">
          {{ comment.post.title }}
        </span>
      </v-card-text>
      <v-card-text v-else>
        <span class="opacity-70">Commented by </span>
        <span class="text-primary fond-weight-bold">
          {{ comment.by.username }}
        </span>
      </v-card-text>
      <v-card-text class="opacity-70 d-flex justify-end"> {{ comment.uploadDate }}</v-card-text>
    </div>
    <v-card-text class="text-subtitle-1">{{ comment.text }}</v-card-text>

    <div class="d-flex">
      <v-card-text v-card-text
        >{{ comment.likes }} <span class="opacity-70">likes</span>
      </v-card-text>
      <LikeButton />
    </div>
  </v-card>
</template>
