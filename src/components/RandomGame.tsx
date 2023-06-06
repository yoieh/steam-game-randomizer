"use client";

import React, { useCallback } from "react";
import { LibraryGame } from "@/LibraryGame";
import { GameCard } from "./GameCard";

type Props = {
  games: LibraryGame[];
};

export const RandomGame = ({ games }: Props) => {
  const [randomItem, setRandomItem] = React.useState<LibraryGame | null>(
    games[Math.floor(Math.random() * games.length)]
  );

  const randomize = useCallback(() => {
    setRandomItem(games[Math.floor(Math.random() * games.length)]);
  }, [games]);

  if (!randomItem) return <div>loading...</div>;

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
            checked={false}
          />
          <label htmlFor="played">Played</label>

          <input
            type="checkbox"
            id="not-played"
            name="not-played"
            className="ml-4 mr-2"
            checked={true}
          />
          <label htmlFor="not-played">Not Played</label>
        </div>
      </div>
    </>
  );
};
