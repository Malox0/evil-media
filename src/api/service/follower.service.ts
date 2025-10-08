import { useAuth } from '@/auth/useAuth'
import type { CreateUserProfileRequest, EditFollowerRequest, Follower } from '../../types/follower'

let mockFollowers: Follower[] | null = null

function initFollowers() {
  if (!mockFollowers) {
    mockFollowers = [
      {
        id: 1,
        username: 'maxi',
        firstname: 'Maximilian',
        lastname: 'Busch',
        followed: true,
        createdAt: new Date('2025-10-01T10:15:00Z'),
        ipAddress: '192.168.0.1',
        followerCount: 20,
        description: 'This is a test',
        followingCount: 11,
        postCount: 4,
        avatarUrl: `https://ui-avatars.com/api/?name=Maximilian+Busch`,
      },
      {
        id: 2,
        username: 'johnny',
        firstname: 'Johnny',
        lastname: 'Silverhand',
        followed: false,
        createdAt: new Date('2025-10-01T10:15:00Z'),
        ipAddress: '192.168.0.2',
        followerCount: 20,
        description: 'This is a test',
        followingCount: 11,
        postCount: 4,
        avatarUrl: `https://ui-avatars.com/api/?name=Johnny+Silverhand`,
      },
      {
        id: 3,
        username: 'lara',
        firstname: 'Lara',
        lastname: 'Croft',
        followed: true,
        createdAt: new Date('2025-10-01T10:15:00Z'),
        ipAddress: '192.168.0.3',
        followerCount: 20,
        description: 'This is a test',
        followingCount: 11,
        postCount: 4,
        avatarUrl: `https://ui-avatars.com/api/?name=Lara+Croft`,
      },
    ]
  }

  return mockFollowers
}
export async function getFollowers(): Promise<Follower[]> {
  const followers: Follower[] = initFollowers()

  return Promise.resolve(followers)
}

export async function getFollowerByUsername(username: string): Promise<Follower> {
  const followers = await getFollowers()
  const follower = followers.find((t) => t.username === username)
  if (!follower) {
    throw new Error(`Follower with username ${username} not found`)
  }
  return Promise.resolve(follower)
}

export async function getFollowing(username: string): Promise<Follower[]> {
  const mockFollowers = await getFollowers()
  const following = mockFollowers.filter((f) => f.username !== username)

  if (following.length === 0) {
    throw new Error(`${username} is not following anyone`)
  }

  return following
}

export async function editFollower(request: EditFollowerRequest) {
  const oldFollower = await getFollowerByUsername(request.username)
  const newFollower: Follower = {
    ...request,
    createdAt: oldFollower.createdAt,
    ipAddress: oldFollower.ipAddress,
    followed: oldFollower.followed,
    followerCount: oldFollower.followerCount,
    followingCount: oldFollower.followingCount,
    postCount: oldFollower.postCount,
  }

  const index = mockFollowers?.findIndex((t) => t.username == newFollower.username)

  mockFollowers![index!] = newFollower

  return Promise.resolve(newFollower)
}

export async function createFollower(request: CreateUserProfileRequest) {
  const newUser: Follower = {
    ...request,
    createdAt: new Date(),
    followed: true,
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
    id: mockFollowers!.length + 1,
  }

  mockFollowers?.push(newUser)

  const { login } = useAuth()
  login()
  return Promise.resolve(newUser)
}
