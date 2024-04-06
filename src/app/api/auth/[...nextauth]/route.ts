import { getAuthOptions } from "@/app/auth";
import NextAuth from "next-auth/next";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: { params: { nextauth: string[] } }
) {
  return NextAuth(req, ctx, getAuthOptions(req));
}

export async function POST(
  req: NextRequest,
  ctx: { params: { nextauth: string[] } }
) {
  return NextAuth(req, ctx, getAuthOptions(req));
}
