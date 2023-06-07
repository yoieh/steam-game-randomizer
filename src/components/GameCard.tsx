import Image from "next/image";
import { convertMinutesToReadableTime } from "@/utils/StringFormat";
import { LibraryGame } from "@/types/LibraryGame";

export const GameCard = ({
  game,
  size = "sm",
}: {
  game: LibraryGame;
  size?: "sm" | "lg";
}) => {
  const width = 256 * (size === "sm" ? 2 : 3);
  const height = 144 * (size === "sm" ? 2 : 3);

  return (
    <div
      key={game.appid}
      className="flex flex-col items-center justify-center m-4 bg-slate-700 rounded-lg shadow-md"
    >
      <Image
        src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
        width={width}
        height={height}
        className="rounded-t-lg"
        alt={""}
        style={{ minWidth: width, minHeight: height }}
      />
      <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
        <h2 className="text-xl font-bold">{game.name}</h2>
        <p className="text-sm">
          Playtime: {convertMinutesToReadableTime(game.playtime_forever)}
        </p>
      </div>
    </div>
  );
};

export const GameCardSkeleton = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  const width = 256 * (size === "sm" ? 2 : 3);
  const height = 144 * (size === "sm" ? 2 : 3);

  return (
    <div className="flex flex-col items-center justify-center m-4 bg-slate-700 rounded-lg shadow-md">
      <div
        className="w-full h-0 rounded-t-lg animate-pulse bg-gray-800 rounded-lg"
        style={{ minWidth: width, minHeight: height }}
      />
      <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
        <div className="w-2/3 h-4 mb-2 bg-gray-800 rounded-lg animate-pulse" />
        <div className="w-1/3 h-4 bg-gray-800 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};
