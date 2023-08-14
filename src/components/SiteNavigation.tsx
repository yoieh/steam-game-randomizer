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
    <div className="sticky top-0 right-0 left-0 z-40 bg-slate-800/90 backdrop-blur-md shadow-lg">
      <div className="flex justify-around items-center p-4">
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
