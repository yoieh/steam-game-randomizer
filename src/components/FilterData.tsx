"use client";

import { useSession } from "next-auth/react";
import { useGames } from "@/hooks/useGames";

export const FilterData = () => {
  const { filteredGames, games } = useGames();

  const session = useSession();

  console.log(session);

  return (
    <div className="flex flex-col items-center justify-center w-full mb-8">
      <p className="text-lg">
        You have played {games.length - filteredGames.length} of your{" "}
        {games.length} games.
      </p>
      <p className="text-lg">
        You still have {filteredGames.length} games to play.
      </p>
      <p className="text-sm opacity-40">
        SteamId: {session.data?.user?.steam?.steamid}
      </p>
    </div>
  );
};
