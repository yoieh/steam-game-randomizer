"use client";

import React from "react";
import { PlayerFilter } from "@/types/PlayerFilter";
import { LibraryGame } from "@/types/LibraryGame";
import { useGames } from "./useGames";

export const useFilterGames = (): {
  filteredGames: LibraryGame[];
  filter: PlayerFilter;
  setFilter: React.Dispatch<React.SetStateAction<PlayerFilter>>;
} => {
  const { filteredGames, filter, setFilter } = useGames();

  return {
    filteredGames,
    filter,
    setFilter,
  };
};
