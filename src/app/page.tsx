// src/app/page.tsx (Profile Page)
'use client';

import { useEffect, useState } from 'react';
import UserProfileCard from '@/features/sns/components/UserProfileCard';
import { UserProfile } from '@/types/sns';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'; // For form accessibility

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBio, setEditingBio] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 'me' will be resolved to 'user123' by the mock API
      const response = await fetch('/api/sns/profile/me');
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }
      const data: UserProfile = await response.json();
      setProfile(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error("Error fetching profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditProfileOpen = () => {
    if (profile?.bio) {
      setEditingBio(profile.bio);
    } else {
      setEditingBio('');
    }
    setIsEditDialogOpen(true);
  };

  const handleProfileUpdate = async () => {
    if (!profile) return;
    setIsUpdatingProfile(true);
    try {
      const response = await fetch(`/api/sns/profile/me`, { // Using 'me' to update current user
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: editingBio }),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const updatedProfile: UserProfile = await response.json();
      setProfile(updatedProfile); // Update local profile state
      setIsEditDialogOpen(false); // Close dialog
    } catch (err) {
      console.error("Error updating profile:", err);
      // Optionally show an error message to the user in the dialog
      alert("プロフィールの更新に失敗しました。");
    } finally {
      setIsUpdatingProfile(false);
    }
  };


  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" /> {/* Cover image skeleton */}
        <div className="flex items-end -mt-16 px-4">
            <Skeleton className="h-24 w-24 rounded-full border-4 border-background" />
        </div>
        <div className="p-4 space-y-2">
            <Skeleton className="h-8 w-1/2" /> {/* Username skeleton */}
            <Skeleton className="h-4 w-1/4" /> {/* User handle skeleton */}
            <Skeleton className="h-12 w-full mt-2" /> {/* Bio skeleton */}
        </div>
        <div className="p-4 grid grid-cols-2 gap-4 border-t">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">エラー: {error}</p>;
  }

  if (!profile) {
    return <p className="text-muted-foreground text-center">プロフィール情報を読み込めませんでした。</p>;
  }

  return (
    <div className="max-w-3xl mx-auto"> {/* Limit width for better profile readability */}
      <UserProfileCard
        profile={profile}
        onEditProfileClick={handleEditProfileOpen}
        isCurrentUser={true} // Assuming this page always shows the current user's profile
      />

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>プロフィールを編集</DialogTitle>
            <DialogDescription>
              自己紹介文を更新します。変更を保存するには「保存」をクリックしてください。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                自己紹介
              </Label>
              <Textarea
                id="bio"
                value={editingBio}
                onChange={(e) => setEditingBio(e.target.value)}
                className="col-span-3 h-24"
                placeholder="あなたのことを教えてください"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isUpdatingProfile}>
                キャンセル
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleProfileUpdate} disabled={isUpdatingProfile}>
              {isUpdatingProfile ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Future: Add tabs for posts, learning history, etc. */}
      {/*
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">あなたの投稿</h2>
        <p className="text-muted-foreground">ここにユーザーの投稿リストが表示されます。</p>
      </div>
      */}
    </div>
  );
}
