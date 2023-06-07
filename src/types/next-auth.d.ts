import NextAuth from "next-auth";
import { SteamProfile } from "@/types/SteamProfile";

// nextauth.d.ts
declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    image: string;
    steam: SteamProfile;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    steam: SteamProfile;
  }
}
