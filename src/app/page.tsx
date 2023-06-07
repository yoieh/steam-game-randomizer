import { getServerSession } from "next-auth";

import { getOwnedGames } from "@/services/user";
import { RandomGame } from "@/components/RandomGame";
import { GamesProvider } from "@/context/GamesProvider";
import { RandomGameControls } from "@/components/RandomGameControls";
import { FilterControls } from "@/components/FilterControls";
import { RandomGameProvider } from "@/context/RandomGameProvider";
import { FilterData } from "@/components/FilterData";
import { GamesList } from "@/components/GamesList";
import { SignIn, SignOut } from "@/components/Sign";

export default async function Home() {
  const session = await getServerSession();

  const steamId = process.env.STEAM_ID;

  if (!steamId) return <div>No steamId defined</div>;

  const games = await getOwnedGames(steamId);

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

      {session ? (
        <>
          <SignOut />

          <GamesProvider games={games}>
            <RandomGameProvider>
              <RandomGame />

              <RandomGameControls />

              <FilterControls />

              <FilterData steamId={steamId} />

              <GamesList />
            </RandomGameProvider>
          </GamesProvider>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-lg text-center">
            Please login to your Steam account to use this app.
          </p>
          <SignIn />
        </div>
      )}
    </main>
  );
}
