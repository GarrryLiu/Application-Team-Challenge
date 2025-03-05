import { router } from "../trpc";
import { participantRouter } from "./participant";

export const appRouter = router({
  participant: participantRouter,
});

export type AppRouter = typeof appRouter;
