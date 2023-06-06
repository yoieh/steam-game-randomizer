import Image from "next/image";
import { LibraryGame } from "@/LibraryGame";
import { convertMinutesToReadableTime } from "@/utils/StringFormat";

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
