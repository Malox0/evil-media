import type { Follower } from './follower'

export interface Comment {
  id: number
  text: string
  likes: number
  uploadDate: string
  post: Post
  by: Follower
}

export interface CreateCommentRequest {
  text: string
  postId: number
  userId: string
}
