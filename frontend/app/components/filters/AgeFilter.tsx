"use client";

import React from "react";
import { useParticipants } from "../../context/ParticipantContext";

const AgeFilter: React.FC = () => {
  const { ageFilter, setAgeFilter } = useParticipants();

  return (
    <select
      value={ageFilter}
      onChange={(e) => setAgeFilter(e.target.value)}
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
      <option value="">All Ages</option>
      <option value="60">60+</option>
      <option value="75">75+</option>
      <option value="85">85+</option>
    </select>
  );
};

export default AgeFilter;
