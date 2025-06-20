// src/features/navist-loop/components/ReviewNotification.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BellIcon } from "lucide-react";

interface ReviewNotificationProps {
  message: string;
  title?: string;
}

export default function ReviewNotification({ message, title = "復習リマインダー" }: ReviewNotificationProps) {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700">
      <BellIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold">{title}</AlertTitle>
      <AlertDescription className="text-blue-700 dark:text-blue-400">
        {message}
      </AlertDescription>
    </Alert>
  );
}
