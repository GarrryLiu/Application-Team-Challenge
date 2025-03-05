var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { getAllParticipants, getParticipantById } from "../../services/participantService";
import { ParticipantQueryParamsSchema } from "../../../shared/types";
// Input validation schema for getAll with defaults
const getAllInputSchema = ParticipantQueryParamsSchema.extend({
    page: ParticipantQueryParamsSchema.shape.page.default(1),
    limit: ParticipantQueryParamsSchema.shape.limit.default(20),
    sort: ParticipantQueryParamsSchema.shape.sort.default("icdCount"),
    sortOrder: ParticipantQueryParamsSchema.shape.sortOrder.default("desc"),
});
// Input validation schema for getById
const getByIdInputSchema = z.object({
    id: z.string() // Simple string validation
});
export const participantRouter = router({
    // Get all participants with filtering, sorting, and pagination
    getAll: publicProcedure
        .input(getAllInputSchema)
        .query(({ input }) => {
        try {
            return getAllParticipants(input);
        }
        catch (error) {
            console.error("Error in getAll:", error);
            throw new Error("Failed to retrieve participants");
        }
    }),
    // Get a single participant by ID
    getById: publicProcedure
        .input(getByIdInputSchema)
        .query((_a) => __awaiter(void 0, [_a], void 0, function* ({ input }) {
        try {
            const { id } = input;
            return yield getParticipantById(id);
        }
        catch (error) {
            console.error("Error in getById:", error);
            throw new Error(`Failed to retrieve participant: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    })),
});
