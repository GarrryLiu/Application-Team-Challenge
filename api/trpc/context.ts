import { inferAsyncReturnType } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  return {
    req,
    res,
    // Can add database connections, authentication info, etc. here
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
