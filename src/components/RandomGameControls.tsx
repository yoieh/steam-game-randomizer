"use client";

import React from "react";
import { useRandomGame } from "@/hooks/useRandomGame";

export const RandomGameControls = () => {
  const { randomize } = useRandomGame();

  return (
    <div className="flex flex-col items-center justify-center w-full mb-8">
      <button
        className="px-4 py-2 mt-8 text-lg font-bold text-white bg-slate-700 rounded-lg shadow-md"
        onClick={randomize}
      >
        Randomize
      </button>
    </div>
  );
};
