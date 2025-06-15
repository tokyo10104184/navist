// src/features/motivation/components/AvatarDisplay.tsx
'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useUserStore } from "@/store/userStore"; // Import store

export default function AvatarDisplay() {
  const { name, avatarImage } = useUserStore(); // Get data from store

  const getInitials = (n: string) => {
    const names = n.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <div className="flex flex-col items-center space-y-2">
        <Avatar className="h-24 w-24 border-2 border-primary shadow-md">
        <AvatarImage src={avatarImage} alt={(name || "User") + " avatar"} />
        <AvatarFallback className="text-3xl bg-muted">
            {avatarImage ? null : (name ? getInitials(name) : <User className="h-12 w-12" />)}
        </AvatarFallback>
        </Avatar>
        {name && <p className="text-lg font-medium">{name}</p>}
    </div>
  );
}
