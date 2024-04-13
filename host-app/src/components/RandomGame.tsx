"use client";

import React from "react";
import { GameCard } from "./GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { useRandomGame } from "@/hooks/useRandomGame";

export const RandomGame = () => {
  const { randomItem } = useRandomGame();

  if (!randomItem) return <GameCardSkeleton size="lg" />;

  return <GameCard game={randomItem} size="lg" />;
};
