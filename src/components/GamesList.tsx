"use client";

import { GameCard } from "@/components/GameCard";
import { useFilterGames } from "@/hooks/useFilterGames";

export const GamesList = () => {
  const { filteredGames } = useFilterGames();

  return (
    <div className="flex flex-wrap justify-center mb-8 sm:w-full">
      {filteredGames.map((game) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
};
