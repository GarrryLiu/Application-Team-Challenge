"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./header";

/**
 * A wrapper component for the Header that ensures it correctly detects URL changes
 * by forcing a re-render whenever the pathname changes.
 */
const HeaderWrapper = () => {
  // Using the pathname as a key will force the Header component to re-mount
  // whenever the path changes, ensuring proper URL detection
  const pathname = usePathname();

  // Log the current pathname to help with debugging
  console.log("HeaderWrapper detected pathname:", pathname);

  return <Header key={pathname} />;
};

export default HeaderWrapper;
