"use client";

import { createContext, useMemo, useState } from "react";
import type { LibraryGame } from "@/types/LibraryGame";
import type { PlayerFilter } from "@/types/PlayerFilter";

export interface GamesContext {
  games: LibraryGame[];
  filter: PlayerFilter;
  setFilter: React.Dispatch<React.SetStateAction<PlayerFilter>>;
}

export const gamesContext = createContext<GamesContext>({
  games: [],
  filter: {
    played: true,
    "not-played": true,
  },
  setFilter: () => {
    throw new Error("setFilter not implemented");
  },
});

export interface GamesProviderProps {
  children: React.ReactNode;
  games: LibraryGame[];
}

export const GamesProvider = ({ children, games }: GamesProviderProps) => {
  const [filter, setFilter] = useState<PlayerFilter>({
    played: true,
    "not-played": true,
  });


  const sortedGames = useMemo(
    () => games.sort((a, b) => a.playtime_forever - b.playtime_forever),
    [games]
  );

  return (
    <gamesContext.Provider
      value={{
        games: sortedGames,
        filter,
        setFilter,
      }}
    >
      {children}
    </gamesContext.Provider>
  );
};
