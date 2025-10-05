<script setup lang="ts">
import CommentCard from '../../components/comments/CommentCard.vue'
import { type Comment } from '../../types/comment'
import { getComments, getCommentsByUsername } from '../../api/service/comment.service'
import { isLoading } from '../../routes'
import { onMounted, ref } from 'vue'

interface Props {
  disableFollowBtn: boolean
  username?: string
}
const props = withDefaults(defineProps<Props>(), {
  disableFollowBtn: false,
})

const comments = ref<Comment[]>()
const errorMessage = ref<string | null>()
onMounted(async () => {
  try {
    comments.value = props.username
      ? await getCommentsByUsername(props.username)
      : await getComments()
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
  />
</template>
