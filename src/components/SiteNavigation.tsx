import React from "react";
import { getServerSession } from "next-auth";
import { SignIn, SignOut } from "./Sign";

type Props = {};

export const SiteNavigation = async (props: Props) => {
  const session = await getServerSession();

  const items = [
    {
      name: "Home",
      href: "/",
    },
  ];

  return (
    <div className="sticky top-0 left-0 right-0 z-40 flex justify-center shadow-lg bg-slate-800/90 backdrop-blur-md">
      <div className="container flex items-center justify-between p-4 sm:w-full">
        {items.map(({ name, href }) => (
          <a key={name} href={href}>
            {name}
          </a>
        ))}

        {session ? <SignOut /> : null}
        {!session ? <SignIn /> : null}
      </div>
    </div>
  );
};
