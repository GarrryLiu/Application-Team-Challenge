"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { trpc } from "../utils/trpc";
import { 
  DEFAULT_ROWS_PER_PAGE, 
  MAX_ALL_ROWS 
} from "../config/paginationConfig";

// Define the context type
type ParticipantContextType = {
  // State
  sortType: "icdCount" | "name";
  sortOrder: "asc" | "desc";
  currentPage: number;
  rowsPerPage: number;
  searchNameInput: string;
  searchICDInput: string;
  diseaseCategoryFilter: string;
  ageFilter: string;
  genderFilter: string;
  searchName: string;
  searchICD: string;

  // Setters
  setSortType: (type: "icdCount" | "name") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (limit: number) => void;
  setSearchNameInput: (name: string) => void;
  setSearchICDInput: (icd: string) => void;
  setDiseaseCategoryFilter: (category: string) => void;
  setAgeFilter: (age: string) => void;
  setGenderFilter: (gender: string) => void;

  // Data
  participants: any[];
  totalParticipants: number;
  isLoading: boolean;
  isError: boolean;
  error: any;

  // Actions
  toggleSort: () => void;
  handleSearchInput: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "name" | "icd",
  ) => void;
  buildParticipantUrl: (participantId: string) => string;
};

// Create the context with a default value
const ParticipantContext = createContext<ParticipantContextType | undefined>(
  undefined,
);

// Provider component
export const ParticipantProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [sortType, setSortType] = useState<"icdCount" | "name">(
    (searchParams.get("sort") as "icdCount" | "name") || "icdCount",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (searchParams.get("order") as "asc" | "desc") || "desc",
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "0"),
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get("limit") || DEFAULT_ROWS_PER_PAGE.toString()),
  );
  const [searchNameInput, setSearchNameInput] = useState(
    searchParams.get("name") || "",
  );
  const [searchICDInput, setSearchICDInput] = useState(
    searchParams.get("icd") || "",
  );
  const [diseaseCategoryFilter, setDiseaseCategoryFilter] = useState(
    searchParams.get("category") || "",
  );
  const [ageFilter, setAgeFilter] = useState(searchParams.get("age") || "");
  const [genderFilter, setGenderFilter] = useState(
    searchParams.get("gender") || "",
  );

  // Debounce search inputs
  const [searchName] = useDebounce(searchNameInput, 500);
  const [searchICD] = useDebounce(searchICDInput, 500);

  // Update URL parameters
  useEffect(() => {
    const params = new URLSearchParams();
    if (sortType !== "icdCount") params.set("sort", sortType);
    if (sortOrder !== "desc") params.set("order", sortOrder);
    if (currentPage !== 0) params.set("page", currentPage.toString());
    if (rowsPerPage !== DEFAULT_ROWS_PER_PAGE) params.set("limit", rowsPerPage.toString());
    if (searchName) params.set("name", searchName);
    if (searchICD) params.set("icd", searchICD);
    if (diseaseCategoryFilter) params.set("category", diseaseCategoryFilter);
    if (ageFilter) params.set("age", ageFilter);
    if (genderFilter) params.set("gender", genderFilter);

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    window.history.replaceState({}, "", newUrl);
  }, [
    sortType,
    sortOrder,
    currentPage,
    rowsPerPage,
    searchName,
    searchICD,
    diseaseCategoryFilter,
    ageFilter,
    genderFilter,
  ]);

  // Reset page when search values change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchName, searchICD, diseaseCategoryFilter, ageFilter, genderFilter]);

  // Use tRPC query
  const participantsQuery = trpc.participant.getAll.useQuery(
    {
      page: rowsPerPage === -1 ? 1 : currentPage + 1,
      limit: rowsPerPage === -1 ? MAX_ALL_ROWS : rowsPerPage, // Use configured max value for "All" option
      sort: sortType,
      sortOrder: sortOrder,
      sortOnlyOnPage: rowsPerPage === -1 ? "all" : (currentPage + 1).toString(),
      search: searchName,
      icdSearch: searchICD,
      category: diseaseCategoryFilter,
      age: ageFilter,
      gender: genderFilter,
    },
    {
      keepPreviousData: true,
      staleTime: 1000,
    },
  );

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Handle search input
  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "name" | "icd",
  ) => {
    const value = event.target.value;
    if (type === "name") {
      setSearchNameInput(value);
    } else {
      // Ensure ICD code search input is formatted correctly
      const cleanedValue = value.replace(/\s+/g, ""); // Remove all whitespace
      setSearchICDInput(cleanedValue);
    }
  };

  // Build participant URL with search parameters
  const buildParticipantUrl = (participantId: string) => {
    const params = new URLSearchParams();
    if (sortType !== "icdCount") params.set("sort", sortType);
    if (sortOrder !== "desc") params.set("order", sortOrder);
    if (currentPage !== 0) params.set("page", currentPage.toString());
    if (rowsPerPage !== DEFAULT_ROWS_PER_PAGE) params.set("limit", rowsPerPage.toString());
    if (searchName) params.set("name", searchName);
    if (searchICD) params.set("icd", searchICD);
    if (diseaseCategoryFilter) params.set("category", diseaseCategoryFilter);
    if (ageFilter) params.set("age", ageFilter);
    if (genderFilter) params.set("gender", genderFilter);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return `/participant/${participantId}${queryString}`;
  };

  // Context value
  const value: ParticipantContextType = {
    // State
    sortType,
    sortOrder,
    currentPage,
    rowsPerPage,
    searchNameInput,
    searchICDInput,
    diseaseCategoryFilter,
    ageFilter,
    genderFilter,
    searchName,
    searchICD,

    // Setters
    setSortType,
    setSortOrder,
    setCurrentPage,
    setRowsPerPage,
    setSearchNameInput,
    setSearchICDInput,
    setDiseaseCategoryFilter,
    setAgeFilter,
    setGenderFilter,

    // Data
    participants: participantsQuery.data?.data || [],
    totalParticipants: participantsQuery.data?.total || 0,
    isLoading: participantsQuery.isLoading,
    isError: participantsQuery.isError,
    error: participantsQuery.error,

    // Actions
    toggleSort,
    handleSearchInput,
    buildParticipantUrl,
  };

  return (
    <ParticipantContext.Provider value={value}>
      {children}
    </ParticipantContext.Provider>
  );
};

// Custom hook to use the context
export const useParticipants = () => {
  const context = useContext(ParticipantContext);
  if (context === undefined) {
    throw new Error(
      "useParticipants must be used within a ParticipantProvider",
    );
  }
  return context;
};
