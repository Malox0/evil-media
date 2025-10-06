<script setup lang="ts">
import LikeButton from '../../components/actions/LikeButton.vue'
import CommentButton from '../../components/actions/CommentButton.vue'
import UserCard from '../../components/followers/FollowerCard.vue'
import type { Post } from '../../types/post'

interface Props {
  post: Post
  disableFollowBtn?: boolean
  extended?: boolean
}

const props: Props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

const emit = defineEmits<{
  (e: 'like', postId: number): void
}>()

function toggleLike() {
  emit('like', props.post.id)
}
</script>
<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card
      v-bind="hoverProps"
      variant="outlined"
      class="mt-6 mb-6 pa-4 rounded-xl transition-slow"
      :style="isHovering && !extended ? 'transform: scale(1.02);' : ''"
      :elevation="isHovering && !extended ? 12 : 2"
    >
      <UserCard
        v-if="disableFollowBtn"
        :follower="post.by"
        :disable-follow-btn="disableFollowBtn"
      />

      <v-hover v-slot="{ isHovering: isHoveringOverRoute, props: hoverTitleProps }">
        <template v-if="!extended">
          <router-link
            v-bind="hoverTitleProps"
            :to="`/posts/${post.id}`"
            class="text-decoration-none"
          >
            <v-card-title
              class="font-weight-bold transition-colors"
              :class="isHoveringOverRoute ? 'text-primary' : 'text-high-emphasis'"
            >
              {{ post.title }}
            </v-card-title>
            <v-card-text
              class="transition-colors"
              :class="isHoveringOverRoute ? 'text-primary' : 'text-medium-emphasis'"
            >
              {{ post.subTitle }}
            </v-card-text>
          </router-link>
        </template>
        <template v-else>
          <v-card-title class="font-weight-bold text-high-emphasis">
            {{ post.title }}
          </v-card-title>
          <v-card-text class="text-medium-emphasis">
            {{ post.subTitle }}
          </v-card-text>
        </template>
      </v-hover>

      <v-carousel
        v-if="post.imageUrls"
        :continuous="false"
        :show-arrows="false"
        delimiter-icon="mdi-circle"
        color="white"
        height="400"
        class="ma-2 rounded-lg"
        hide-delimiter-background
      >
        <v-carousel-item v-for="(imgUrl, key) in post.imageUrls" :key="key">
          <v-img :src="imgUrl" :alt="`image-${key}`" aspect-ratio="16/9" contain />
        </v-carousel-item>
      </v-carousel>

      <div class="ml-2">
        <v-chip v-for="tag in post.tags || []" :key="tag" size="small" class="ma-1">
          #{{ tag }}
        </v-chip>
      </div>

      <v-divider class="ma-2" />

      <v-card-actions>
        <LikeButton
          class="ml-2"
          @toggle-like="toggleLike"
          :liked="props.post.likedByClient || false"
        />
        <span class="ml-n2">{{ post.likes }}</span>
        <CommentButton :disabled="extended" :to="`/posts/${post.id}#comments`" />
        <span class="ml-n2">{{ post.commentsCount }}</span>
        <v-btn icon variant="text">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<style scoped>
.transition-slow {
  transition: all 0.2s ease;
}
</style>
