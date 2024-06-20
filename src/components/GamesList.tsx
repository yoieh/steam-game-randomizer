"use client";

import { GameCard } from "@/components/GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { useFilteredGames } from "@/hooks/useGames";
import { useEffect, useState } from "react";
import ScrollToTopButton from "./ScrollToTopButton";

const NEXT_AMOUNT = 6;

export const GamesList = () => {
  const filteredGames = useFilteredGames();

  const [visibleGames, setVisibleGames] = useState(
    filteredGames.slice(0, NEXT_AMOUNT)
  );
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setLoading(true);
    setTimeout(() => {
      setVisibleGames((prevGames) => [
        ...prevGames,
        ...filteredGames.slice(
          prevGames.length,
          prevGames.length + NEXT_AMOUNT
        ),
      ]);
      setLoading(false);
    }, 200); // Simulate network delay
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visibleGames.length) {
    return (
      <div className="flex flex-wrap justify-center gap-4 mb-8 sm:w-full">
        {[...Array(NEXT_AMOUNT)].map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8 sm:w-full">
      {visibleGames.map((game) => (
        <GameCard key={game.appid} game={game} />
      ))}
      {loading &&
        [...Array(NEXT_AMOUNT)].map((_, i) => <GameCardSkeleton key={i} />)}
      <ScrollToTopButton />
    </div>
  );
};
