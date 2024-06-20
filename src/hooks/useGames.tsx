"use client";

import { useContext } from "react";
import { type GamesContext, gamesContext } from "@/context/GamesProvider";

export const useGames = (): GamesContext => useContext(gamesContext);

export const useFilteredGames = () => {
    const { games, filter } = useGames();
        
    return games.filter((game) => {
        if (filter.played && filter["not-played"]) return true;
        if (filter.played) return game.playtime_forever > 0;
        if (filter["not-played"]) return game.playtime_forever === 0;
    
        return false;
    });
};