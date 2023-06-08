"use client";

import { useSession } from "next-auth/react";
import { useGames } from "@/hooks/useGames";

export const FilterData = () => {
  const { games } = useGames();

  const session = useSession();

  const playedGames = games.filter((game) => game.playtime_forever > 0);
  const unplayedGames = games.filter((game) => game.playtime_forever === 0);

  const playedGamesPercentage = (playedGames.length / games.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full mb-8 gap-4">
      <p className="text-lg">
        You have played {playedGames.length} of your {games.length} games.
      </p>
      <p className="text-lg">
        You still have {unplayedGames.length} games to play.
      </p>
      <div className="w-96 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${playedGamesPercentage}%` }}
        >
          {playedGamesPercentage.toFixed(2)}%
        </div>
      </div>

      <p className="text-sm opacity-40">
        SteamId: {session.data?.user?.steam?.steamid}
      </p>
    </div>
  );
};
