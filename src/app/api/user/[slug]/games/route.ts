import { NextResponse } from "next/server";

let cache = new Map();
let cacheTime = 60 * 60 * 1000; // 1 hour
let lastCacheRelease = Date.now();

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
    // Clear the cache if it's been more than 1 hour
    if (Date.now() - lastCacheRelease > cacheTime) {
      cache = new Map();
      lastCacheRelease = Date.now();
    }

    // Check if we have a cached response
    if (cache.has(slug)) {
      return NextResponse.json(cache.get(slug));
    }

    const response = await fetch(url);
    if (!response.ok) {
      const statusText = response.statusText;
      throw new Error(
        `HTTP error! status: ${response.status}, statusText: ${statusText}`
      );
    }
    const data = await response.json();

    // Cache the response for 1 hour
    cache.set(slug, data.response.games);

    return NextResponse.json(data.response.games);
  } catch (error) {
    console.error("Error fetching game library:", error);
    return NextResponse.error();
  }
}
