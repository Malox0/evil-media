<script setup lang="ts">
import LikeButton from '../../components/actions/LikeButton.vue'
import CommentButton from '../../components/actions/CommentButton.vue'
import UserCard from '../../components/followers/FollowerCard.vue'
import type { Post } from '../../types/post'
import { useRoute, useRouter } from 'vue-router'
import { nextTick } from 'vue'
interface Props {
  post: Post
  disableFollowBtn?: boolean
  extended?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})
</script>
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      variant="outlined"
      color="surface-variant"
      class="mt-6 mb-6 pa-4 rounded-xl transition-slow"
      :style="isHovering && !extended ? 'transform: scale(1.02);' : ''"
      :elevation="isHovering && !extended ? 12 : 2"
      :hover="!extended"
      :to="!extended ? `/posts/${post.id}` : undefined"
    >
      <UserCard
        v-if="disableFollowBtn"
        :follower="post.by"
        :disable-follow-btn="disableFollowBtn"
      />

      <v-card-title class="font-weight-bold">{{ post.title }}</v-card-title>
      <v-card-text>{{ post.subTitle }}</v-card-text>

      <v-carousel
        :continuous="false"
        :show-arrows="false"
        delimiter-icon="mdi-circle"
        color="white"
        height="400"
        class="ma-2 rounded-lg"
        hide-delimiter-background
      >
        <v-carousel-item v-if="post.imageUrls" v-for="(imgUrl, key) in post.imageUrls" :key="key">
          <v-img :src="imgUrl" :alt="`image-${key}`" aspect-ratio="16/9" contain />
        </v-carousel-item>
      </v-carousel>

      <div class="ml-2">
        <v-chip v-if="post.tags" v-for="tag in post.tags" :key="tag" size="small" class="ma-1">
          #{{ tag }}</v-chip
        >
      </div>
      <v-divider class="ma-2" />
      <template v-slot:actions>
        <LikeButton class="ml-2"></LikeButton>
        <span class="ml-n2">{{ post.likes }}</span>
        <CommentButton :disabled="extended" :to="`/posts/${post.id}#comments`"></CommentButton>
        <span class="ml-n2">{{ post.commentsCount }}</span>
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
