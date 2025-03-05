import { z } from "zod";
import type { Participant, ParticipantsResponse } from "../types";

// Define the input types for the procedures
export const getAllInputSchema = z.object({
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

export const getByIdInputSchema = z.object({
  id: z.string(),
});

// Define the router type structure
export interface AppRouter {
  participant: {
    getAll: {
      input: z.infer<typeof getAllInputSchema>;
      output: ParticipantsResponse;
    };
    getById: {
      input: z.infer<typeof getByIdInputSchema>;
      output: Participant;
    };
  };
}
