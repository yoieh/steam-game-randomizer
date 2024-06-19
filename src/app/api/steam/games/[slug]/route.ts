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
  const url = `https://store.steampowered.com/api/appdetails/?appids=${slug}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return NextResponse.json(data[slug].data);
  } catch (error) {
    console.error("Error fetching game library:", error);
    return NextResponse.error();
  }
}
