import React from "react";

import Search from "./search";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <div className="px-4 md:px-6 lg:px-8 @container">
      <div className="w-full max-w-6xl mx-auto ">
        <Header />
        <Search />
        {children}
      </div>
    </div>
  );
}
