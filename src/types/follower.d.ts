export interface UserProfile {
  id: number
  username: string
  firstname: string
  lastname: string
  description: string
  createdAt: string
  ipAddress: string
}

export interface UserStats {
  followerCount: number
  followingCount: number
  postCount: number
}

export interface UserRelation {
  // bezieht sich IMMER auf den eingeloggten User
  followed: boolean
}

export interface Follower extends UserProfile, UserRelation, UserStats {}
