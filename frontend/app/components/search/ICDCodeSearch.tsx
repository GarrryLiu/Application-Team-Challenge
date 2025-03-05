"use client";

import React, { useRef, useEffect } from "react";
import SearchInput from "./SearchInput";
import { useParticipants } from "../../context/ParticipantContext";

interface ICDCodeSearchProps {
  setActiveInput: (input: "name" | "icd" | null) => void;
  activeInput: "name" | "icd" | null;
}

const ICDCodeSearch: React.FC<ICDCodeSearchProps> = ({
  setActiveInput,
  activeInput,
}) => {
  const { searchICDInput, handleSearchInput } = useParticipants();
  const icdInputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (activeInput === "icd" && icdInputRef.current) {
      icdInputRef.current.focus();
    }
  }, [activeInput]);

  return (
    <SearchInput
      placeholder="Search ICD Code(s): J42,I10"
      value={searchICDInput}
      onChange={(e) => {
        handleSearchInput(e, "icd");
        setActiveInput("icd");
      }}
      inputRef={icdInputRef}
    />
  );
};

export default ICDCodeSearch;
