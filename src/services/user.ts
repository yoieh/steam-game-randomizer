import { LibraryGame } from "@/LibraryGame";
import { headers } from "next/headers";

export async function getOwnedGames(steamId: string): Promise<LibraryGame[]> {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const url = `${protocol}://${host}/api/user/${steamId}/games`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game library:", error);
    return [];
  }
}
