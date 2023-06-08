"use client";

import { GameCard, GameCardSkeleton } from "@/components/GameCard";
import { useGames } from "@/hooks/useGames";

export const GamesList = () => {
  const { filteredGames } = useGames();

  return (
    <div className="flex flex-wrap justify-center mb-8 sm:w-full gap-4">
      {!filteredGames.length &&
        [...Array(10)].map((_, i) => <GameCardSkeleton key={i} />)}

      {filteredGames.map((game) => (
        <GameCard key={game.appid} game={game} />
      ))}
    </div>
  );
};
