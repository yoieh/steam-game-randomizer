"use client";

import { useFilteredGames, useGames } from "@/hooks/useGames";
import type { LibraryGame } from "@/types/LibraryGame";
import React, { createContext, useCallback, useEffect, useState } from "react";

export interface RandomGameContext {
  randomItem: LibraryGame | null;
  randomize: () => void;
}

export const randomGameContext = createContext<RandomGameContext>({
  randomItem: null,
  randomize: () => {
    throw new Error("randomize not implemented");
  },
});

interface RandomGameProviderProps {
  children: React.ReactNode;
}

export const RandomGameProvider = ({ children }: RandomGameProviderProps) => {
  const filteredGames = useFilteredGames();

  const [randomItem, setRandomItem] = useState<LibraryGame | null>(null);

  const randomize = useCallback(() => {
    setRandomItem(
      filteredGames[Math.floor(Math.random() * filteredGames.length)]
    );
  }, [filteredGames]);

  useEffect(() => {
    randomize();

    return () => {
      setRandomItem(null);
    };
  }, [randomize]);

  return (
    <randomGameContext.Provider value={{ randomItem, randomize }}>
      {children}
    </randomGameContext.Provider>
  );
};
