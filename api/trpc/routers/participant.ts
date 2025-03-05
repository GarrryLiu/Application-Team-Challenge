import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  getAllParticipants,
  getParticipantById,
  SortType,
  SortOrder,
} from "../../services/participantService";

// Input validation schema for getAll
const getAllInputSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(20),
  sort: z.enum(["icdCount", "name"]).default("icdCount"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  sortOnlyOnPage: z.string().optional(),
  search: z.string().optional(),
  icdSearch: z.string().optional(),
  category: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
});

// Input validation schema for getById
const getByIdInputSchema = z.object({
  id: z.string(),
});

export const participantRouter = router({
  // Get all participants with filtering, sorting, and pagination
  getAll: publicProcedure
    .input(getAllInputSchema.optional())
    .query(({ input }) => {
      try {
        return getAllParticipants(
          input ?? { page: 1, limit: 20, sort: "icdCount", sortOrder: "desc" },
        );
      } catch (error) {
        console.error("Error in getAll:", error);
        throw new Error("Failed to retrieve participants");
      }
    }),

  // Get a single participant by ID
  getById: publicProcedure
    .input(getByIdInputSchema)
    .query(async ({ input }) => {
      try {
        const { id } = input;
        return await getParticipantById(id);
      } catch (error) {
        console.error("Error in getById:", error);
        throw new Error(
          `Failed to retrieve participant: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      }
    }),
});
