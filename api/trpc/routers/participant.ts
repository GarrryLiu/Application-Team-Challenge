import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  getAllParticipants,
  getParticipantById,
  SortType,
  SortOrder,
} from "../../services/participantService";
import { participants } from "../../data";
import { getConditionName } from "../../utils/icdService";

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

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const ageInYears = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if birthday hasn't occurred yet this year
  const hasBirthdayOccurredThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  return hasBirthdayOccurredThisYear ? ageInYears : ageInYears - 1;
}

// Helper function to format gender for display
function formatGender(gender: string): string {
  return gender === "MALE"
    ? "Male"
    : gender === "FEMALE"
      ? "Female"
      : "Non-Binary";
}

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

  // Export all participants data
  exportAll: publicProcedure.query(async () => {
    try {
      // Get all participants data (without pagination)
      const allParticipants = await Promise.all(
        participants.map(async (participant) => {
          const diagnosesWithCondition = await Promise.all(
            participant.diagnoses.map(async (diag) => {
              const conditionName = await getConditionName(diag.icdCode);
              return {
                icdCode: diag.icdCode,
                conditionName,
                timestamp: diag.timestamp,
              };
            }),
          );

          return {
            ...participant,
            diagnoses: diagnosesWithCondition,
            age: calculateAge(participant.dateOfBirth),
            formattedGender: formatGender(participant.gender),
          };
        }),
      );

      return {
        exportedAt: new Date().toISOString(),
        totalCount: allParticipants.length,
        data: allParticipants,
      };
    } catch (error) {
      console.error("Error in exportAll:", error);
      throw new Error("Failed to export participants data");
    }
  }),

  // Export a single participant by ID
  exportById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const { id } = input;
        const participant = await getParticipantById(id);

        return {
          exportedAt: new Date().toISOString(),
          data: {
            ...participant,
            age: calculateAge(participant.dateOfBirth),
            formattedGender: formatGender(participant.gender),
          },
        };
      } catch (error) {
        console.error("Error in exportById:", error);
        throw new Error(
          `Failed to export participant: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
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
