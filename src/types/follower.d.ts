export interface UserProfile {
  id: number
  username: string
  firstname: string
  lastname: string
  description: string
  createdAt: string
  ipAddress: string
  avatarUrl?: string
}

export interface UserStats {
  followerCount: number
  followingCount: number
  postCount: number
}

export interface UserRelation {
  followed: boolean
}

export interface Follower extends UserProfile, UserRelation, UserStats {}

export interface EditFollowerRequest {
  id: number
  username: string
  firstname: string
  lastname: string
  description: string
  ipAddress: string
  avatarUrl?: string
}
