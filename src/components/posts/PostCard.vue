<script setup lang="ts">
import LikeButton from '../../components/actions/LikeButton.vue'
import CommentButton from '../../components/actions/CommentButton.vue'
import UserCard from '../../components/followers/FollowerCard.vue'
import { ref } from 'vue'
import { type Post } from '../../types/post'
interface Props {
  post: Post
  disableFollowBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})
const tags = ref<string[]>(['Gabel', 'Grueneis skkkrr', 'Paracetamol'])
</script>
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      variant="outlined"
      color="surface-variant"
      class="mt-6 mb-6 pa-2 rounded-xl transition-slow"
      :style="isHovering ? 'transform: scale(1.02);' : ''"
      :elevation="isHovering ? 12 : 2"
    >
      <UserCard
        v-if="disableFollowBtn"
        :follower="post.by"
        :disable-follow-btn="disableFollowBtn"
      />

      <v-card-title class="font-weight-bold">{{ post.title }}</v-card-title>
      <v-card-text>{{ post.subTitle }}</v-card-text>

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
