"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the page types
export type PageType = "list" | "detail";

// Define the context type
type PageTypeContextType = {
  pageType: PageType;
  setPageType: (type: PageType) => void;
};

// Create the context with default values
const PageTypeContext = createContext<PageTypeContextType>({
  pageType: "list", // Default to list page
  setPageType: () => {}, // Empty function as placeholder
});

// Provider component
export function PageTypeProvider({ children }: { children: ReactNode }) {
  const [pageType, setPageType] = useState<PageType>("list");

  return (
    <PageTypeContext.Provider value={{ pageType, setPageType }}>
      {children}
    </PageTypeContext.Provider>
  );
}

// Custom hook for using the context
export function usePageType() {
  return useContext(PageTypeContext);
}
