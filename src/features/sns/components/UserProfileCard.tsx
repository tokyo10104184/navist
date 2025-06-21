// src/features/sns/components/UserProfileCard.tsx
import Image from 'next/image';
import { UserProfile } from '@/types/sns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Added Button
import { CalendarDays, UsersIcon, Clock, Edit3 } from 'lucide-react'; // Added Edit3, removed Briefcase and CardHeader

interface UserProfileCardProps {
  profile: UserProfile;
  onEditProfileClick?: () => void; // Callback to open edit modal
  isCurrentUser?: boolean; // To conditionally show edit button
}

export default function UserProfileCard({ profile, onEditProfileClick, isCurrentUser }: UserProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Cover Image */}
      {profile.coverImageUrl && (
        <div className="h-32 md:h-48 bg-muted relative">
          <Image
            src={profile.coverImageUrl}
            alt={`${profile.username}'s cover image`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      <CardContent className="pt-0 px-4 sm:px-6 pb-6"> {/* Added padding to CardContent */}
        {/* Avatar and Edit Button */}
        {/* Changed flex direction for small screens, and alignment for edit button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start -mt-12 md:-mt-16 relative">
          {/* Avatar */}
          <div className="rounded-full border-4 border-card bg-card p-1 inline-block z-10 self-start">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={`${profile.username}'s avatar`}
                width={96}
                height={96}
                className="rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <UsersIcon size={48} /> {/* Assuming UsersIcon is for placeholder */}
              </div>
            )}
          </div>
          {/* Edit Button - aligned to the right on sm screens, below avatar on xs */}
          {isCurrentUser && onEditProfileClick && (
            <Button variant="outline" size="sm" onClick={onEditProfileClick} className="mt-2 sm:mt-0 sm:ml-auto"> {/* Use ml-auto for right alignment in flex row */}
              <Edit3 size={14} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">プロフィール編集</span>
              <span className="sm:hidden">編集</span>
            </Button>
          )}
        </div>

        {/* User Info */}
        <div className="mt-3"> {/* Reduced margin slightly */}
          <h1 className="text-2xl font-bold text-foreground">{profile.username}</h1>
          {profile.userHandle && (
            <p className="text-sm text-muted-foreground">@{profile.userHandle}</p>
          )}
          {profile.bio && (
            <p className="mt-2 text-sm text-foreground">{profile.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>総学習時間: <span className="font-semibold text-foreground">{profile.totalStudyHours}時間</span></span>
          </div>
          {profile.joinedDate && (
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>参加日: {new Date(profile.joinedDate).toLocaleDateString()}</span>
            </div>
          )}
          {profile.followerCount !== undefined && (
             <div className="flex items-center">
                <UsersIcon className="h-4 w-4 mr-2" />
                <span>フォロワー: <span className="font-semibold text-foreground">{profile.followerCount}</span></span>
            </div>
          )}
          {profile.followingCount !== undefined && (
            <div className="flex items-center">
                <UsersIcon className="h-4 w-4 mr-2" /> {/* Could use a different icon for following */}
                <span>フォロー中: <span className="font-semibold text-foreground">{profile.followingCount}</span></span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
