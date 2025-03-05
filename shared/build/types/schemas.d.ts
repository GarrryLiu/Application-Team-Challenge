import { z } from "zod";
export declare const DiagnosisSchema: z.ZodObject<
  {
    icdCode: z.ZodString;
    timestamp: z.ZodDate;
    conditionName: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    icdCode: string;
    timestamp: Date;
    conditionName?: string | undefined;
  },
  {
    icdCode: string;
    timestamp: Date;
    conditionName?: string | undefined;
  }
>;
export declare const ParticipantSchema: z.ZodObject<
  {
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    dateOfBirth: z.ZodDate;
    gender: z.ZodEnum<["MALE", "FEMALE", "NON-BINARY"]>;
    phoneNumber: z.ZodNumber;
    patientNotes: z.ZodNullable<z.ZodString>;
    diagnoses: z.ZodArray<
      z.ZodObject<
        {
          icdCode: z.ZodString;
          timestamp: z.ZodDate;
          conditionName: z.ZodOptional<z.ZodString>;
        },
        "strip",
        z.ZodTypeAny,
        {
          icdCode: string;
          timestamp: Date;
          conditionName?: string | undefined;
        },
        {
          icdCode: string;
          timestamp: Date;
          conditionName?: string | undefined;
        }
      >,
      "many"
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "MALE" | "FEMALE" | "NON-BINARY";
    phoneNumber: number;
    patientNotes: string | null;
    diagnoses: {
      icdCode: string;
      timestamp: Date;
      conditionName?: string | undefined;
    }[];
  },
  {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "MALE" | "FEMALE" | "NON-BINARY";
    phoneNumber: number;
    patientNotes: string | null;
    diagnoses: {
      icdCode: string;
      timestamp: Date;
      conditionName?: string | undefined;
    }[];
  }
>;
export declare const ParticipantQueryParamsSchema: z.ZodObject<
  {
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodOptional<z.ZodEnum<["icdCount", "name"]>>;
    sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
    sortOnlyOnPage: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    icdSearch: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    sort?: "icdCount" | "name" | undefined;
    gender?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    sortOnlyOnPage?: string | undefined;
    search?: string | undefined;
    icdSearch?: string | undefined;
    category?: string | undefined;
    age?: string | undefined;
  },
  {
    sort?: "icdCount" | "name" | undefined;
    gender?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    sortOnlyOnPage?: string | undefined;
    search?: string | undefined;
    icdSearch?: string | undefined;
    category?: string | undefined;
    age?: string | undefined;
  }
>;
export declare const ParticipantsResponseSchema: z.ZodObject<
  {
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    sortedOnPage: z.ZodString;
    searchQuery: z.ZodString;
    icdSearchQuery: z.ZodString;
    sortOrder: z.ZodEnum<["asc", "desc"]>;
    data: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          firstName: z.ZodString;
          lastName: z.ZodString;
          dateOfBirth: z.ZodDate;
          gender: z.ZodEnum<["MALE", "FEMALE", "NON-BINARY"]>;
          phoneNumber: z.ZodNumber;
          patientNotes: z.ZodNullable<z.ZodString>;
          diagnoses: z.ZodArray<
            z.ZodObject<
              {
                icdCode: z.ZodString;
                timestamp: z.ZodDate;
                conditionName: z.ZodOptional<z.ZodString>;
              },
              "strip",
              z.ZodTypeAny,
              {
                icdCode: string;
                timestamp: Date;
                conditionName?: string | undefined;
              },
              {
                icdCode: string;
                timestamp: Date;
                conditionName?: string | undefined;
              }
            >,
            "many"
          >;
        },
        "strip",
        z.ZodTypeAny,
        {
          id: string;
          firstName: string;
          lastName: string;
          dateOfBirth: Date;
          gender: "MALE" | "FEMALE" | "NON-BINARY";
          phoneNumber: number;
          patientNotes: string | null;
          diagnoses: {
            icdCode: string;
            timestamp: Date;
            conditionName?: string | undefined;
          }[];
        },
        {
          id: string;
          firstName: string;
          lastName: string;
          dateOfBirth: Date;
          gender: "MALE" | "FEMALE" | "NON-BINARY";
          phoneNumber: number;
          patientNotes: string | null;
          diagnoses: {
            icdCode: string;
            timestamp: Date;
            conditionName?: string | undefined;
          }[];
        }
      >,
      "many"
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    data: {
      id: string;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      gender: "MALE" | "FEMALE" | "NON-BINARY";
      phoneNumber: number;
      patientNotes: string | null;
      diagnoses: {
        icdCode: string;
        timestamp: Date;
        conditionName?: string | undefined;
      }[];
    }[];
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    total: number;
    totalPages: number;
    sortedOnPage: string;
    searchQuery: string;
    icdSearchQuery: string;
  },
  {
    data: {
      id: string;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
      gender: "MALE" | "FEMALE" | "NON-BINARY";
      phoneNumber: number;
      patientNotes: string | null;
      diagnoses: {
        icdCode: string;
        timestamp: Date;
        conditionName?: string | undefined;
      }[];
    }[];
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    total: number;
    totalPages: number;
    sortedOnPage: string;
    searchQuery: string;
    icdSearchQuery: string;
  }
>;
export type Diagnosis = z.infer<typeof DiagnosisSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type ParticipantQueryParams = z.infer<
  typeof ParticipantQueryParamsSchema
>;
export type ParticipantsResponse = z.infer<typeof ParticipantsResponseSchema>;
