"use client";

import React from "react";
import { useParticipants } from "../../context/ParticipantContext";

const GenderFilter: React.FC = () => {
  const { genderFilter, setGenderFilter } = useParticipants();

  return (
    <select
      value={genderFilter}
      onChange={(e) => setGenderFilter(e.target.value)}
      style={{
        marginLeft: "8px",
        padding: "6px 10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        background: "#F1F2F3",
        cursor: "pointer",
        fontSize: "14px",
        width: "120px", // Fixed width for consistency
        display: "inline-block", // Ensure it's displayed inline
      }}
    >
      <option value="">All Genders</option>
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
      <option value="NON-BINARY">Non-Binary</option>
    </select>
  );
};

export default GenderFilter;
