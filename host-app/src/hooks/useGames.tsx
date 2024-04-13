"use client";

import { useContext } from "react";
import { type GamesContext, gamesContext } from "@/context/GamesProvider";

export const useGames = (): GamesContext => useContext(gamesContext);
