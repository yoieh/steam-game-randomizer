import { LibraryGame } from "@/types/LibraryGame";
import { SteamGame } from "@/types/SteamGame";
import { headers } from "next/headers";

export async function getGameInfo(
  appIds: LibraryGame["appid"]
): Promise<SteamGame | null> {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const url = `${protocol}://${host}/api/steam/game/${appIds}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data[appIds].data;
  } catch (error) {
    console.error("Error fetching game library:", error);
    return null;
  }
}
