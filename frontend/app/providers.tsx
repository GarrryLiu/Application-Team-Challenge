"use client";

import { ReactNode } from "react";
import { trpc, trpcClient, queryClient } from "./utils/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import ThemeRegistry from "./ThemeRegistry";

export function TRPCProvider({ children }: { children: ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
