// src/types/sns.ts

export interface UserProfile {
  userId: string;
  username: string;
  userHandle?: string; // e.g., @username
  avatarUrl?: string;
  coverImageUrl?: string;
  bio?: string;
  totalStudyHours: number; // in hours
  followerCount?: number;
  followingCount?: number;
  joinedDate?: string; // ISO date string
  // Potentially add last active, learning streaks, etc. later
}

export interface StudyLogAttachment {
  subject: string;
  durationMinutes: number;
  activity?: string; // e.g., "Chapter 5 Review", "Practice Problems"
}

export interface FeedPost {
  postId: string;
  author: Pick<UserProfile, 'userId' | 'username' | 'avatarUrl' | 'userHandle'>; // Simplified author info for feed display
  content: string; // The main text of the post/tweet
  attachmentType?: 'study_log' | 'image';
  studyLog?: StudyLogAttachment;
  imageUrl?: string;
  timestamp: string; // ISO date string
  likeCount?: number;
  commentCount?: number;
  // For replies, could add parentPostId?: string;
}

// Example for a list of feed posts
export type FeedPostList = FeedPost[];

// Example for User's own detailed profile (could extend UserProfile or be a new type)
export interface MyProfile extends UserProfile {
  email?: string; // Only visible to the user themselves
  // other private settings
}
