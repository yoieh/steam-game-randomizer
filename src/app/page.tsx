import { use } from "react";
import { getOwnedGames } from "../services/user";

import { RandomGame } from "@/components/RandomGame";
import { GamesProvider } from "@/context/GamesProvider";
import { LibraryGame } from "@/types/LibraryGame";
import { GamesList } from "./GamesList";
import { RandomGameControls } from "@/components/RandomGameControls";
import { FilterControls } from "@/components/FilterControls";
import { RandomGameProvider } from "@/context/RandomGameProvider";

export default function Home() {
  const steamId = process.env.STEAM_ID;

  if (!steamId) return <div>No steamId defined</div>;

  const games = use(getOwnedGames(steamId)).sort(
    (a, b) => a.playtime_forever - b.playtime_forever
  );

  const filteredGames = games.filter((game) => game.playtime_forever === 0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-white">
      <div className="flex flex-col items-center justify-center w-full mb-8">
        <h1 className="text-4xl font-bold text-center ">
          Steam Game Randomizer
        </h1>
        <p className="text-lg text-center">
          Randomly select a game from your games form your Steam library.
        </p>
      </div>

      <GamesProvider games={games}>
        <RandomGameProvider>
          <RandomGame />

          <RandomGameControls />

          <FilterControls />

          <div className="flex flex-col items-center justify-center w-full mb-8">
            <p className="text-lg">
              You have played {games.length - filteredGames.length} of your{" "}
              {games.length} games.
            </p>
            <p className="text-lg">
              You still have {filteredGames.length} games to play.
            </p>
            <p className="text-sm opacity-40">SteamId: {steamId}</p>
          </div>

          <GamesList />
        </RandomGameProvider>
      </GamesProvider>
    </main>
  );
}
