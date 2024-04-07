import Image from "next/image";
import { convertMinutesToReadableTime } from "@/utils/StringFormat";
import type { LibraryGame } from "@/types/LibraryGame";
import React from "react";
import type { Size } from "@/types/Constants";
import format from "date-fns/format";

interface GameCardProps {
  game: LibraryGame;
  size?: Size;
}

export const GameCard: React.FC<GameCardProps> = ({ game, size = "sm" }) => (
  <div className="rounded-lg shadow-lg bg-slate-700">
    <div
      className={`relative rounded-t-lg 
          w-[20rem] h-[10rem] md:w-[32rem] md:h-[16rem]
          ${size == "lg" && "lg:w-[64rem] lg:h-[32rem]"}
        `}
    >
      <Image
        src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
        fill
        alt={""}
        className="object-cover rounded-t-lg "
      />
    </div>
    <div className="flex flex-col items-center justify-center flex-1 w-full p-4">
      <h2 className="text-xl font-bold">{game.name}</h2>
      <p className="text-sm">
        Playtime: {convertMinutesToReadableTime(game.playtime_forever)}
      </p>
      <span className="text-sm">
        Last played:{" "}
        {game.rtime_last_played > 0
          ? format(new Date(game.rtime_last_played * 1000), "yyyy-MM-dd")
          : "Never"}
      </span>
    </div>
  </div>
);
