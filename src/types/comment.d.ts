import type { Follower } from './follower'

export interface Comment {
  id: number
  text: string
  user: string
  likes: number
  uploadDate: string
  post: Post
  by: Follower
}
