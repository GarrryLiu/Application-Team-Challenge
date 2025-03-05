import express, { Request, Response } from "express";
import { participants } from "./data";
import { getConditionName } from "./utils/icdService";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./trpc/routers/_app";
import { createContext } from "./trpc/context";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("✅ API is running!");
});

// Health check endpoint for Render
app.get("/trpc/healthcheck", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// tRPC API endpoint
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export { app };
