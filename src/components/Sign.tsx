"use client";

import { signIn, signOut } from "next-auth/react";

export function SignIn() {
  return (
    <button
      onClick={() => signIn()}
      className="px-4 py-2 mb-4 text-lg font-bold text-white bg-slate-700 hover:bg-slate-600 rounded-lg shadow-md"
    >
      Sign In
    </button>
  );
}

export function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 mb-4 text-lg font-bold text-white bg-slate-700 hover:bg-slate-600 rounded-lg shadow-md"
    >
      Sign out
    </button>
  );
}
