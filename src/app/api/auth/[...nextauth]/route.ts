import { getAuthOptions } from "@/app/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, getAuthOptions(req));
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, getAuthOptions(req));
}
