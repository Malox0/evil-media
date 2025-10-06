import type { Follower } from './follower'

export interface Post {
  id: number
  title: string
  subTitle: string
  createdAt: Date
  by: Follower
  likes: number
  commentsCount: number
  tags?: string[]
  imageUrls?: string[]
  likedByClient?: boolean
}
