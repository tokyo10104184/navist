import React from 'react';

interface ReviewNotificationProps {
  topic?: string; // Optional: make it dynamic
  message?: string; // Optional: allow custom message
}

const ReviewNotification: React.FC<ReviewNotificationProps> = ({
  topic = "Algebra Chapter 2", // Default topic
  message,
}) => {
  const notificationMessage = message || `🔔 Time to review ${topic}! Strengthen your knowledge.`;

  return (
    <div className="p-4 mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md shadow-sm">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM9 11v2h2v-2H9zm0-4v3h2V7H9z"/>
          </svg>
        </div>
        <div>
          <p className="font-semibold">Review Reminder</p>
          <p className="text-sm">{notificationMessage}</p>
        </div>
      </div>
    </div>
  );
};

export { ReviewNotification };
