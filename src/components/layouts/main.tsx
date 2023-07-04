import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "../navbar";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex">{children}</div>
      </div>
    </>
  );
};

export default Main;
