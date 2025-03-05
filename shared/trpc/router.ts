// Define a placeholder for the AppRouter type
export type AppRouter = any;

// Define specific input and output types for each procedure
export type ParticipantGetAllInput = {
  page?: number;
  limit?: number;
  sort?: "icdCount" | "name";
  sortOrder?: "asc" | "desc";
  sortOnlyOnPage?: string;
  search?: string;
  icdSearch?: string;
  category?: string;
  age?: string;
  gender?: string;
};

export type ParticipantGetAllOutput = {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  sortedOnPage: string;
  searchQuery: string;
  icdSearchQuery: string;
  sortOrder: "asc" | "desc";
  data: Array<{
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: "MALE" | "FEMALE" | "NON-BINARY";
    phoneNumber: number;
    patientNotes: string | null;
    diagnoses: Array<{
      icdCode: string;
      timestamp: Date;
      conditionName?: string;
    }>;
  }>;
};

export type ParticipantGetByIdInput = {
  id: string;
};

export type ParticipantGetByIdOutput = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  phoneNumber: number;
  patientNotes: string | null;
  diagnoses: Array<{
    icdCode: string;
    conditionName: string;
    timestamp: Date;
  }>;
};
