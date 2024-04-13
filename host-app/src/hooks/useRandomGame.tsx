"use client";

import { useContext } from "react";
import { randomGameContext } from "@/context/RandomGameProvider";


export const useRandomGame = () => useContext(randomGameContext);
