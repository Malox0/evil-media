import type { Follower } from './follower'

export interface Post {
  id: number
  title: string
  subTitle: string
  by: Follower
}
