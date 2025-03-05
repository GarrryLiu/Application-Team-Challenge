"use client";

import React, { useRef, useEffect } from "react";
import SearchInput from "./SearchInput";
import { useParticipants } from "../../context/ParticipantContext";

interface ParticipantNameSearchProps {
  setActiveInput: (input: "name" | "icd" | null) => void;
  activeInput: "name" | "icd" | null;
}

const ParticipantNameSearch: React.FC<ParticipantNameSearchProps> = ({
  setActiveInput,
  activeInput,
}) => {
  const { searchNameInput, handleSearchInput } = useParticipants();
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (activeInput === "name" && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [activeInput]);

  return (
    <SearchInput
      placeholder="Search Participant Name: John Doe"
      value={searchNameInput}
      onChange={(e) => {
        handleSearchInput(e, "name");
        setActiveInput("name");
      }}
      inputRef={nameInputRef}
    />
  );
};

export default ParticipantNameSearch;
