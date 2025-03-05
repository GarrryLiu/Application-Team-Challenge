import { participants } from "../data";
import { getConditionName, getDiseaseCategory } from "../utils/icdService";

// Types
export type SortType = "icdCount" | "name";
export type SortOrder = "asc" | "desc";

export interface ParticipantQueryParams {
  page: number;
  limit: number;
  sort: SortType;
  sortOrder: SortOrder;
  sortOnlyOnPage?: string;
  search?: string;
  icdSearch?: string;
  category?: string;
  age?: string;
  gender?: string;
}

export interface ParticipantQueryResult {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  sortedOnPage: string;
  searchQuery: string;
  icdSearchQuery: string;
  sortOrder: SortOrder;
  data: any[];
}

// Filter participants by name
export function filterParticipantsByName(search: string) {
  if (!search) return participants;

  const lowerSearch = search.toLowerCase();
  return participants.filter(
    (p) =>
      p.firstName.toLowerCase().includes(lowerSearch) ||
      p.lastName.toLowerCase().includes(lowerSearch),
  );
}

// Filter participants by disease category
export function filterParticipantsByCategory(
  participantList: any[],
  category?: string,
) {
  if (!category) return participantList;

  return participantList.filter((participant) =>
    participant.diagnoses.some(
      (diag: any) => getDiseaseCategory(diag.icdCode) === category,
    ),
  );
}

// Filter participants by age
export function filterParticipantsByAge(participantList: any[], age?: string) {
  if (!age) return participantList;

  const ageThreshold = parseInt(age, 10);
  if (isNaN(ageThreshold)) return participantList;

  const today = new Date();

  return participantList.filter((participant) => {
    const birthDate = new Date(participant.dateOfBirth);
    const ageInYears = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    const hasBirthdayOccurredThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    const adjustedAge = hasBirthdayOccurredThisYear
      ? ageInYears
      : ageInYears - 1;

    return adjustedAge >= ageThreshold;
  });
}

// Filter participants by gender
export function filterParticipantsByGender(
  participantList: any[],
  gender?: string,
) {
  if (!gender) return participantList;

  return participantList.filter((participant) => participant.gender === gender);
}

// Filter participants by ICD code
export function filterParticipantsByICD(
  participantList: any[],
  icdSearch?: string,
) {
  if (!icdSearch) return participantList;

  // Split by comma and remove empty items
  const icdCodes = icdSearch
    .split(",")
    .map((code) => code.trim().toLowerCase())
    .filter((code) => code);

  if (icdCodes.length === 0) return participantList;

  // Get all participants' ICD code sets
  const participantsWithCodes = participantList.map((participant) => {
    const codes = participant.diagnoses.map((diag: any) =>
      diag.icdCode.toLowerCase(),
    );
    return { participant, codes };
  });

  // Use AND logic: must satisfy all search conditions
  return participantsWithCodes
    .filter(({ codes }) => {
      // Check if each search code matches the participant's code set
      return icdCodes.every((searchCode) => {
        // If search code length is 1 or 2, treat as prefix match
        if (searchCode.length <= 2) {
          return codes.some((code: string) => code.startsWith(searchCode));
        }
        // Otherwise perform exact match
        else {
          return codes.includes(searchCode);
        }
      });
    })
    .map(({ participant }) => participant);
}

// Sort participants
export function sortParticipants(
  participantList: any[],
  sort: SortType,
  sortOrder: SortOrder,
  sortOnlyOnPage?: string,
  page?: number,
) {
  // Always sort if sortOnlyOnPage is "all"
  if (sortOnlyOnPage === "all") {
    // Continue with sorting
  }
  // Skip sorting if sortOnlyOnPage is specified and doesn't match current page
  else if (sortOnlyOnPage && page && parseInt(sortOnlyOnPage, 10) !== page) {
    return participantList;
  }

  const sortedList = [...participantList];

  if (sort === "icdCount") {
    sortedList.sort((a, b) =>
      sortOrder === "asc"
        ? a.diagnoses.length - b.diagnoses.length
        : b.diagnoses.length - a.diagnoses.length,
    );
  } else if (sort === "name") {
    sortedList.sort((a, b) =>
      sortOrder === "asc"
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName),
    );
  }

  return sortedList;
}

// Paginate participants
export function paginateParticipants(
  participantList: any[],
  page: number,
  limit: number,
) {
  const startIndex = (page - 1) * limit;
  return participantList.slice(startIndex, startIndex + limit);
}

// Get all participants with filtering, sorting, and pagination
export function getAllParticipants(
  params: ParticipantQueryParams,
): ParticipantQueryResult {
  const {
    page,
    limit,
    sort,
    sortOrder,
    sortOnlyOnPage,
    search,
    icdSearch,
    category,
    age,
    gender,
  } = params;

  // Apply filters in sequence
  let filteredParticipants = filterParticipantsByName(search || "");
  filteredParticipants = filterParticipantsByCategory(
    filteredParticipants,
    category,
  );
  filteredParticipants = filterParticipantsByICD(
    filteredParticipants,
    icdSearch,
  );
  filteredParticipants = filterParticipantsByAge(filteredParticipants, age);
  filteredParticipants = filterParticipantsByGender(
    filteredParticipants,
    gender,
  );

  // Sort
  const sortedParticipants = sortParticipants(
    filteredParticipants,
    sort,
    sortOrder,
    sortOnlyOnPage,
    page,
  );

  // Paginate
  const paginatedParticipants = paginateParticipants(
    sortedParticipants,
    page,
    limit,
  );

  return {
    total: filteredParticipants.length,
    totalPages: Math.ceil(filteredParticipants.length / limit),
    page,
    limit,
    sortedOnPage: sortOnlyOnPage || "all",
    searchQuery: search || "none",
    icdSearchQuery: icdSearch || "none",
    sortOrder,
    data: paginatedParticipants,
  };
}

// Get participant by ID with diagnoses
export async function getParticipantById(id: string) {
  const participant = participants.find((p) => p.id === id);

  if (!participant) {
    throw new Error("Participant not found");
  }

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

  return { ...participant, diagnoses: diagnosesWithCondition };
}
