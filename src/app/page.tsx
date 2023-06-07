import { use } from "react";
import { getOwnedGames } from "../services/user";

import { RandomGame } from "@/components/RandomGame";
import { GamesProvider } from "@/context/GamesProvider";
import { LibraryGame } from "@/types/LibraryGame";
import { GamesList } from "./GamesList";
import { RandomGameControls } from "@/components/RandomGameControls";
import { FilterControls } from "@/components/FilterControls";
import { RandomGameProvider } from "@/context/RandomGameProvider";
import { useFilterGames } from "@/hooks/useFilterGames";
import { FilterData } from "../components/FilterData";

export default function Home() {
  const steamId = process.env.STEAM_ID;

  if (!steamId) return <div>No steamId defined</div>;

  const games = use(getOwnedGames(steamId));

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

          <FilterData steamId={steamId} />

          <GamesList />
        </RandomGameProvider>
      </GamesProvider>
    </main>
  );
}
