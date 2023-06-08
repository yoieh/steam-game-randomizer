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

export const metadata = {
  title: "Steam Game Randomizer",
  description:
    "Randomly select a game from your games form your Steam library.",
};

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white mx-4 my-8">
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

          <GamesProvider games={[]}>
            <RandomGameProvider>
              <RandomGame />

              <RandomGameControls />

              <FilterControls />

              <FilterData />

              <GamesList />
            </RandomGameProvider>
          </GamesProvider>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-lg text-center mb-4">
            Please login to your Steam account to use this app.
          </p>
          <SignIn />
        </div>
      )}
    </main>
  );
}
