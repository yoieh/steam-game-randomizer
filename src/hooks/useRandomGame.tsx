"use client";

import { useCallback, useEffect, useState } from "react";
import { LibraryGame } from "@/types/LibraryGame";
import { useGames } from "./useGames";

export const useRandomGame = (): {
  randomItem: LibraryGame | undefined;
  randomize: () => void;
} => {
  const { filteredGames } = useGames();

  const [randomItem, setRandomItem] = useState<LibraryGame>();

  const randomize = useCallback(() => {
    setRandomItem(
      filteredGames[Math.floor(Math.random() * filteredGames.length)]
    );
  }, [filteredGames]);

  useEffect(() => {
    randomize();

    return () => {
      setRandomItem(undefined);
    };
  }, [randomize]);

  return {
    randomItem,
    randomize,
  };
};
