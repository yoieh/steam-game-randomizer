import { AuthOptions, getServerSession, Session } from "next-auth";

import { RandomGame } from "@/components/RandomGame";
import { GamesProvider } from "@/context/GamesProvider";
import { RandomGameControls } from "@/components/RandomGameControls";
import { FilterControls } from "@/components/FilterControls";
import { RandomGameProvider } from "@/context/RandomGameProvider";
import { FilterData } from "@/components/FilterData";
import { GamesList } from "@/components/GamesList";
import { getAuthOptions } from "./auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Steam Game Randomizer",
  description: "Randomly select a game from your Steam library.",
};

const fetchGames = async (session: Session) => {
  if (!session?.user?.steam?.steamid) return [];

  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const steamid = session?.user?.steam?.steamid;

  const url = `${protocol}://${host}/api/user/${steamid}/games`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching game library:", error);
    return [];
  }
};

export default async function Home() {
  const session = await getServerSession<AuthOptions, Session>(
    getAuthOptions()
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen mx-4 my-8 text-white">
      <div className="flex flex-col items-center justify-center w-full mb-8">
        <h1 className="text-4xl font-bold text-center ">
          Steam Game Randomizer
        </h1>
        <p className="text-lg text-center">
          Randomly select a game from your Steam library.
        </p>
      </div>

      {!session ? <NoneAuth /> : <Authenticated session={session} />}
    </main>
  );
}

function NoneAuth() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="mb-4 text-lg text-center">
        Please login to your Steam account to use this app.
      </p>
    </div>
  );
}

async function Authenticated({ session }: { session: Session }) {
  const games = await fetchGames(session);

  return (
    <GamesProvider games={games}>
      <RandomGameProvider>
        <RandomGame />

        <RandomGameControls />

        <FilterControls />

        <FilterData />

        <GamesList />
      </RandomGameProvider>
    </GamesProvider>
  );
}
