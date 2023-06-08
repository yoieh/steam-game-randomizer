"use client";

import { useSession } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";
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

export const GamesProvider = ({ children }: GamesProviderProps) => {
  const session = useSession();

  const [games, setGames] = useState<LibraryGame[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      if (!session.data?.user?.steam?.steamid) return;

      const url = `/api/user/${session.data?.user?.steam?.steamid}/games`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setGames(data);
        return data;
      } catch (error) {
        console.error("Error fetching game library:", error);
        return [];
      }
    };

    void fetchGames();

    return () => {};
  }, [session]);

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
