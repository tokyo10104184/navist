// src/features/motivation/components/PositiveFeedback.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles } from "lucide-react"; // Icon for positive feedback

interface PositiveFeedbackProps {
  message: string;
}

export default function PositiveFeedback({ message }: PositiveFeedbackProps) {
  return (
    <Alert className="bg-green-50 border-green-300 dark:bg-green-900/30 dark:border-green-700 text-center">
      <div className="flex justify-center mb-2">
        <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
      </div>
      {/* <AlertTitle className="text-green-800 dark:text-green-300 font-semibold">Great Job!</AlertTitle> */}
      <AlertDescription className="text-green-700 dark:text-green-400 font-medium text-lg">
        {message}
      </AlertDescription>
    </Alert>
  );
}
