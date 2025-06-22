// src/app/api/sns/profile/[userId]/route.ts
import { NextResponse } from 'next/server';
import type { UserProfile } from '@/types/sns';

// Mock database
const mockUserProfiles: Record<string, UserProfile> = {
  'user123': {
    userId: 'user123',
    username: 'Jules The Learner',
    userHandle: 'jules_learns',
    avatarUrl: 'https://i.pravatar.cc/150?u=jules', // Placeholder avatar
    coverImageUrl: 'https://picsum.photos/seed/jules_cover/1500/500', // Placeholder cover
    bio: 'Lifelong learner exploring the world of AI and software engineering. Currently building Navist! 🚀',
    totalStudyHours: 125,
    followerCount: 150,
    followingCount: 75,
    joinedDate: new Date('2023-01-15T10:00:00.000Z').toISOString(),
  },
  'user456': {
    userId: 'user456',
    username: 'Alex The Coder',
    userHandle: 'alex_codes',
    avatarUrl: 'https://i.pravatar.cc/150?u=alex',
    bio: 'Frontend developer and UI/UX enthusiast. Always learning something new.',
    totalStudyHours: 340,
    followerCount: 280,
    followingCount: 120,
    joinedDate: new Date('2022-11-20T14:30:00.000Z').toISOString(),
  }
};

export async function GET(
  _request: Request, // Marked as unused
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (mockUserProfiles[userId]) {
    return NextResponse.json(mockUserProfiles[userId]);
  } else {
    // A special case for 'me' or 'current_user' to simulate logged-in user
    if (userId === 'me' || userId === 'current_user') {
        // In a real app, you'd get the logged-in user's ID from session/auth
        const currentMockUserId = 'user123'; // Simulate Jules as the current user
        return NextResponse.json(mockUserProfiles[currentMockUserId]);
    }
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const data = await request.json();

  // Simulate updating the current user's profile (e.g., 'user123')
  const currentMockUserId = 'user123';
  if (userId === currentMockUserId || (userId === 'me' && mockUserProfiles[currentMockUserId])) {
    // Only allow updating specific fields, e.g., bio
    if (data.bio !== undefined) {
      mockUserProfiles[currentMockUserId].bio = data.bio;
    }
    if (data.username !== undefined) {
      mockUserProfiles[currentMockUserId].username = data.username;
    }
    if (data.incrementStudyHours && typeof data.incrementStudyHours === 'number') {
      mockUserProfiles[currentMockUserId].totalStudyHours += data.incrementStudyHours;
    }
    // Add other updatable fields as necessary
    return NextResponse.json(mockUserProfiles[currentMockUserId]);
  } else {
    return NextResponse.json({ message: 'User not found or update not allowed' }, { status: 404 });
  }
}
