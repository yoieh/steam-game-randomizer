import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const slug = params.slug;
  const apiKey = process.env.STEAM_SECRET; // Replace with your Steam Web API key

  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${slug}&format=json&include_appinfo=true`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const statusText = response.statusText;
      throw new Error(
        `HTTP error! status: ${response.status}, statusText: ${statusText}`
      );
    }
    const data = await response.json();
    return NextResponse.json(data.response.games);
  } catch (error) {
    console.error("Error fetching game library:", error);
    return NextResponse.json([]);
  }
}
