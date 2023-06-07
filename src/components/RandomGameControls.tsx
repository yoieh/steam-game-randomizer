"use client";

import React from "react";
import { useRandomGame } from "@/hooks/useRandomGame";

export const RandomGameControls = () => {
  const { randomize } = useRandomGame();

  return (
    <div className="flex flex-col items-center justify-center w-full mb-8 mt-4">
      <button
        className="px-6 py-4 text-lg font-bold text-white bg-slate-700 hover:bg-slate-600 rounded-lg shadow-md"
        onClick={randomize}
      >
        Randomize
      </button>
    </div>
  );
};
