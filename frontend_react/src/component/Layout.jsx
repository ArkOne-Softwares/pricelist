import React from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <>
      <div className="">
        {children}
      </div>
    </>
  );
}
