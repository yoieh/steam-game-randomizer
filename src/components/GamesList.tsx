"use client";

import { GameCard } from "@/components/GameCard";
import { useGames } from "@/hooks/useGames";

export const GamesList = () => {
  const { filteredGames } = useGames();

  return (
    <div className="flex flex-wrap justify-center mb-8 sm:w-full">
      {filteredGames.map((game) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
};
