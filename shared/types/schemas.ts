import { z } from "zod";

// Diagnosis schema
export const DiagnosisSchema = z.object({
  icdCode: z.string(),
  timestamp: z.date(),
  conditionName: z.string().optional(),
});

// Participant schema
export const ParticipantSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  gender: z.enum(["MALE", "FEMALE", "NON-BINARY"]),
  phoneNumber: z.number(),
  patientNotes: z.string().nullable(),
  diagnoses: z.array(DiagnosisSchema),
});

// ParticipantQueryParams schema
export const ParticipantQueryParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  sort: z.enum(["icdCount", "name"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  sortOnlyOnPage: z.string().optional(),
  search: z.string().optional(),
  icdSearch: z.string().optional(),
  category: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
});

// ParticipantsResponse schema
export const ParticipantsResponseSchema = z.object({
  total: z.number(),
  totalPages: z.number(),
  page: z.number(),
  limit: z.number(),
  sortedOnPage: z.string(),
  searchQuery: z.string(),
  icdSearchQuery: z.string(),
  sortOrder: z.enum(["asc", "desc"]),
  data: z.array(ParticipantSchema),
});

// Export types inferred from schemas
export type Diagnosis = z.infer<typeof DiagnosisSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type ParticipantQueryParams = z.infer<typeof ParticipantQueryParamsSchema>;
export type ParticipantsResponse = z.infer<typeof ParticipantsResponseSchema>;
