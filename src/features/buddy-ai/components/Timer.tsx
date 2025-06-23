// src/features/buddy-ai/components/Timer.tsx
'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState, useEffect, useCallback } from 'react';

interface TimerProps {
  onTimerStart?: () => void;
  onTimerPause?: (elapsedTime: number) => void;
  onTimerResume?: (elapsedTime: number) => void;
  onTimerStop?: (elapsedTime: number) => void; // Called when study session ends
  className?: string;
}

const Timer: React.FC<TimerProps> = ({
  onTimerStart,
  onTimerPause,
  onTimerResume,
  onTimerStop,
  className,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const handleStart = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      if (elapsedTime > 0) {
        onTimerResume?.(elapsedTime);
      } else {
        onTimerStart?.();
      }
    }
  }, [isRunning, elapsedTime, onTimerStart, onTimerResume]);

  const handlePause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      onTimerPause?.(elapsedTime);
    }
  }, [isRunning, elapsedTime, onTimerPause]);

  const handleStop = useCallback(() => {
    setIsRunning(false);
    onTimerStop?.(elapsedTime);
    // setElapsedTime(0); // Parent decides if time should be reset or if component is unmounted
  }, [elapsedTime, onTimerStop]); // Removed isRunning from deps as it's set within this func

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Removed empty useEffect, it was not needed.

  return (
    <div className={cn("text-center p-4 border rounded-lg shadow-md bg-card", className)}>
      <div className="text-5xl font-mono font-bold mb-6 tracking-wider">
        {formatTime(elapsedTime)}
      </div>
      <div className="space-x-3">
        {!isRunning ? (
          <Button onClick={handleStart} size="lg" className="px-6 bg-green-500 hover:bg-green-600 text-white"> {/* Using default variant and adding custom success-like styles */}
            {elapsedTime > 0 ? '再開' : '開始'}
          </Button>
        ) : (
          <Button onClick={handlePause} variant="outline" size="lg" className="px-6">
            一時停止
          </Button>
        )}
        <Button onClick={handleStop} variant="destructive" size="lg" className="px-6">
          学習終了
        </Button>
      </div>
    </div>
  );
};

export default Timer;
