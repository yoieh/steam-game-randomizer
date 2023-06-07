import SteamProvider, { PROVIDER_ID } from "next-auth-steam";
import NextAuth from "next-auth/next";
import { headers } from "next/headers";

import type { NextRequest } from "next/server";

async function handler(
  req: NextRequest,
  ctx: { params: { nextauth: string[] } }
) {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  // @ts-expect-error
  return NextAuth(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET!,
        callbackUrl: `${protocol}://${host}/api/auth/callback`,
      }),
    ],
    callbacks: {
      jwt({ token, account, profile }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile;
        }

        return token;
      },
      session({ session, token }) {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steam = token.steam;
        }

        return session;
      },
    },
  });
}

export { handler as GET, handler as POST };
