"use client";

import { createContext, use, useMemo, useState } from "react";
import { LibraryGame } from "@/types/LibraryGame";
import { PlayerFilter } from "@/types/PlayerFilter";

export interface GamesContext {
  games: LibraryGame[];
  filteredGames: LibraryGame[];
  filter: PlayerFilter;
  setFilter: React.Dispatch<React.SetStateAction<PlayerFilter>>;
}

export const gamesContext = createContext<GamesContext>({
  games: [],
  filteredGames: [],
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

  const filteredGames = useMemo(
    () =>
      games.filter((game) => {
        if (filter.played && game.playtime_forever > 0) return true;
        if (filter["not-played"] && game.playtime_forever === 0) return true;
        return false;
      }),
    [filter, games]
  );

  const sortedGames = useMemo(
    () => games.sort((a, b) => a.playtime_forever - b.playtime_forever),
    [games]
  );

  return (
    <gamesContext.Provider
      value={{
        games: sortedGames,
        filteredGames,
        filter,
        setFilter,
      }}
    >
      {children}
    </gamesContext.Provider>
  );
};
