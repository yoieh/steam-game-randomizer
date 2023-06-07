"use client";

import React, { useCallback, useMemo } from "react";
import { GameCard, GameCardSkeleton } from "./GameCard";
import { LibraryGame } from "@/types/LibraryGame";
import { useFilterGames } from "@/hooks/useFilterGames";
import { useRandomGame } from "@/hooks/useRandomGame";

export const RandomGame = () => {
  const { filter, setFilter } = useFilterGames();
  const { randomItem, randomize } = useRandomGame();

  const handelOnChangeFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;

      setFilter((prev) => ({
        ...prev,
        [name]: checked,
      }));
    },
    [setFilter]
  );

  if (!randomItem) return <GameCardSkeleton size="lg" />;

  return (
    <>
      <GameCard game={randomItem} size="lg" />

      <div className="flex flex-col items-center justify-center w-full mb-8">
        <button
          className="px-4 py-2 mt-8 text-lg font-bold text-white bg-slate-700 rounded-lg shadow-md"
          onClick={randomize}
        >
          Randomize
        </button>
        {/* checkbox */}
        <div className="flex items-center justify-center w-full mt-8">
          <input
            type="checkbox"
            id="played"
            name="played"
            className="mr-2"
            checked={filter.played}
            onChange={handelOnChangeFilter}
          />
          <label htmlFor="played">Played</label>

          <input
            type="checkbox"
            id="not-played"
            name="not-played"
            className="ml-4 mr-2"
            checked={filter["not-played"]}
            onChange={handelOnChangeFilter}
          />
          <label htmlFor="not-played">Not Played</label>
        </div>
      </div>
    </>
  );
};
