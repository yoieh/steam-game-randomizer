"use client";
import { LibraryGame } from "@/types/LibraryGame";

export interface GamesProviderProps {
    children: React.ReactNode;
    games: LibraryGame[];
}
