<script setup lang="ts">
import CommentCard from '../../components/comments/CommentCard.vue'
import type { Comment } from '../../types/comment'
import {
  getCommentsByPost,
  getCommentsByUsername,
  updateLikeOnComment,
} from '../../api/service/comment.service'
import { isLoading } from '../../routes'
import { onMounted, ref } from 'vue'

interface Props {
  disableFollowBtn: boolean
  username?: string
  postId?: number
  variant?: 'flat' | 'outlined' | 'plain' | 'tonal' | undefined
}
const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

async function reloadComment(commentId: number) {
  const index = comments.value.findIndex((p) => p.id === commentId)

  if (index !== -1) {
    const updated: Comment = await updateLikeOnComment(commentId, comments.value[index]?.post.id)
    comments.value[index] = { ...updated }
  }
}

const comments = ref<Comment[]>([])
const errorMessage = ref<string | null>()
onMounted(async () => {
  try {
    if (props.username) comments.value = await getCommentsByUsername(props.username)
    if (props.postId) comments.value = await getCommentsByPost(props.postId)
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Failed to load posts'
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <CommentCard
    v-for="comment in comments"
    :comment="comment"
    :disable-follow-btn="disableFollowBtn"
    :variant="variant"
    @liked="reloadComment"
    :liked="comment.likedByClient"
  />
</template>
