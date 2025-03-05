"use client";

import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { useParticipants } from "../../context/ParticipantContext";

const SortControls: React.FC = () => {
  const { sortType, sortOrder, setSortType, toggleSort } = useParticipants();

  const handleSortTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newSortType = event.target.value as "icdCount" | "name";
    setSortType(newSortType);
  };

  return (
    <Box display="flex" alignItems="center">
      <select
        value={sortType}
        onChange={handleSortTypeChange}
        style={{
          marginLeft: "8px",
          padding: "6px 10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          background: "#F1F2F3",
          cursor: "pointer",
          fontSize: "14px",
          width: "205px", // Fixed width for consistency
          display: "inline-block", // Ensure it's displayed inline
        }}
      >
        <option value="icdCount">Sort by ICD Count</option>
        <option value="name">Sort by Name (A-Z / Z-A)</option>
      </select>

      <button
        onClick={toggleSort}
        style={{
          border: "1px solid #ccc",
          // background: "#F1F2F3",
          cursor: "pointer",
          marginLeft: "8px",
          borderRadius: "10px",
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={
            sortOrder === "asc"
              ? "/orderFilter_Up.svg"
              : "/orderFilter_Down.svg"
          }
          alt="Sort Order"
          width={20}
          height={20}
          style={{ width: "20px", height: "20px" }}
        />
      </button>
    </Box>
  );
};

export default SortControls;
