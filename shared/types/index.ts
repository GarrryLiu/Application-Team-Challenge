export interface Diagnosis {
  icdCode: string;
  timestamp: Date;
  conditionName?: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  phoneNumber: number;
  patientNotes: string | null;
  diagnoses: Diagnosis[];
}

export interface ParticipantQueryParams {
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
}

export interface ParticipantsResponse {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  sortedOnPage: string;
  searchQuery: string;
  icdSearchQuery: string;
  sortOrder: "asc" | "desc";
  data: Participant[];
}
