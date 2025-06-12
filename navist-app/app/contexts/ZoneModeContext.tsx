"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface ZoneModeContextType {
  isZoneModeActive: boolean;
  toggleZoneMode: () => void;
  activateZoneMode: () => void;
  deactivateZoneMode: () => void;
}

const ZoneModeContext = createContext<ZoneModeContextType | undefined>(undefined);

interface ZoneModeProviderProps {
  children: ReactNode;
}

export const ZoneModeProvider: React.FC<ZoneModeProviderProps> = ({ children }) => {
  const [isZoneModeActive, setIsZoneModeActive] = useState(false);

  const toggleZoneMode = useCallback(() => {
    setIsZoneModeActive(prev => !prev);
  }, []);

  const activateZoneMode = useCallback(() => {
    setIsZoneModeActive(true);
  }, []);

  const deactivateZoneMode = useCallback(() => {
    setIsZoneModeActive(false);
  }, []);

  return (
    <ZoneModeContext.Provider value={{ isZoneModeActive, toggleZoneMode, activateZoneMode, deactivateZoneMode }}>
      {children}
    </ZoneModeContext.Provider>
  );
};

export const useZoneMode = (): ZoneModeContextType => {
  const context = useContext(ZoneModeContext);
  if (context === undefined) {
    throw new Error('useZoneMode must be used within a ZoneModeProvider');
  }
  return context;
};
