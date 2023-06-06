import { use } from "react";
import { getOwnedGames } from "../services/user";

import { GameCard } from "@/components/GameCard";
import { RandomGame } from "@/components/RandomGame";

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

      <RandomGame games={games} />

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

      {/* list of cards */}
      <div className="flex flex-wrap justify-center mb-8 sm:w-full">
        {games.map((game) => (
          <GameCard key={game.appid} game={game} />
        ))}
      </div>
    </main>
  );
}
