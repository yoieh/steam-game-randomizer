import SteamProvider, { PROVIDER_ID } from "next-auth-steam";

import type { AuthOptions, Session } from "next-auth";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";

export function getAuthOptions(req?: NextRequest): AuthOptions {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  return {
    providers: req
      ? [
          SteamProvider(req, {
            clientSecret: process.env.STEAM_SECRET!,
            callbackUrl: `${protocol}://${host}/api/auth/callback`,
          }),
        ]
      : [],
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
        return session as Session;
      },
    },
  };
}
