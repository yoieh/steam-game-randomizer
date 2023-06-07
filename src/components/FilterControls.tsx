"use client";
import { useGames } from "@/hooks/useGames";
import React, { useCallback } from "react";

export const FilterControls = () => {
  const { filter, setFilter } = useGames();

  const handelOnChangeFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;

      setFilter((prev) => ({
        ...prev,
        [name]: checked,
      }));
    },
    [setFilter]
  );

  return (
    <div className="flex flex-col items-center justify-center w-full mb-8">
      <div className="flex items-center justify-center w-full">
        <input
          type="checkbox"
          id="played"
          name="played"
          className="mr-2 disabled:opacity-50"
          checked={filter.played}
          disabled={filter["not-played"] === false}
          onChange={handelOnChangeFilter}
        />
        <label htmlFor="played">Played</label>

        <input
          type="checkbox"
          id="not-played"
          name="not-played"
          className="ml-4 mr-2 disabled:opacity-50"
          checked={filter["not-played"]}
          disabled={filter.played === false}
          onChange={handelOnChangeFilter}
        />
        <label htmlFor="not-played">Not Played</label>
      </div>
    </div>
  );
};
