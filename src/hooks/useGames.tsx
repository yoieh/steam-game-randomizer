"use client";

import { useContext } from "react";
import { GamesContext, gamesContext } from "@/context/GamesProvider";

export const useGames = (): GamesContext => useContext(gamesContext);
