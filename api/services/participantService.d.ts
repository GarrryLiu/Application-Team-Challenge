import {
  ParticipantQueryParams,
  ParticipantsResponse,
  Participant,
} from "../../shared/types";
export type SortType = "icdCount" | "name";
export type SortOrder = "asc" | "desc";
export type { ParticipantQueryParams };
export type ParticipantQueryResult = ParticipantsResponse;
export declare function filterParticipantsByName(search: string): {
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
export declare function filterParticipantsByCategory(
  participantList: Participant[],
  category?: string,
): {
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
export declare function filterParticipantsByAge(
  participantList: Participant[],
  age?: string,
): {
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
export declare function filterParticipantsByGender(
  participantList: Participant[],
  gender?: string,
): {
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
export declare function filterParticipantsByICD(
  participantList: Participant[],
  icdSearch?: string,
): {
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
export declare function sortParticipants(
  participantList: Participant[],
  sort: SortType,
  sortOrder: SortOrder,
  sortOnlyOnPage?: string,
  page?: number,
): {
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
export declare function paginateParticipants(
  participantList: Participant[],
  page: number,
  limit: number,
): {
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
export declare function getAllParticipants(
  params: ParticipantQueryParams,
): ParticipantQueryResult;
export declare function getParticipantById(id: string): Promise<{
  diagnoses: {
    icdCode: string;
    conditionName: string;
    timestamp: Date;
  }[];
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  phoneNumber: number;
  patientNotes: string | null;
}>;
