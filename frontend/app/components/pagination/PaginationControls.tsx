"use client";

import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { useParticipants } from "../../context/ParticipantContext";
import {
  calculateRowsPerPageOptions,
  DEFAULT_ROWS_PER_PAGE_OPTIONS,
  RowsPerPageOption,
} from "../../config/paginationConfig";

const PaginationControls: React.FC = () => {
  const {
    currentPage,
    rowsPerPage,
    totalParticipants,
    setCurrentPage,
    setRowsPerPage,
  } = useParticipants();

  // State to store dynamically calculated pagination options
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState<
    RowsPerPageOption[]
  >(DEFAULT_ROWS_PER_PAGE_OPTIONS);

  // Recalculate options when total items count changes
  useEffect(() => {
    // Calculate options based on total number of participants
    const options = calculateRowsPerPageOptions(totalParticipants);
    setRowsPerPageOptions(options);

    // If current rowsPerPage is not in the new options, reset to a valid option
    const flatOptions = options.map((opt) =>
      typeof opt === "number" ? opt : opt.value,
    );

    // Only reset if current value is not -1 (All) and not in the options
    if (!flatOptions.includes(rowsPerPage) && rowsPerPage !== -1) {
      // Handle case when flatOptions is empty
      if (flatOptions.length === 0) {
        // If no options available, default to -1 (All)
        setRowsPerPage(-1);
      } else {
        // Find the closest option to the current value
        const closestOption = flatOptions.reduce(
          (prev, curr) =>
            Math.abs(curr - rowsPerPage) < Math.abs(prev - rowsPerPage)
              ? curr
              : prev,
          flatOptions[0], // Provide initial value to prevent empty array error
        );

        setRowsPerPage(closestOption);
      }
      setCurrentPage(0);
    }
  }, [totalParticipants, rowsPerPage, setRowsPerPage, setCurrentPage]);

  return (
    <TablePagination
      component="div"
      count={totalParticipants}
      page={rowsPerPage === -1 ? 0 : currentPage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={(_, newPage) => setCurrentPage(newPage)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(0);
      }}
      sx={{
        width: "100%",
        "& .MuiToolbar-root": {
          width: "100%",
          justifyContent: "space-between",
        },
      }}
    />
  );
};

export default PaginationControls;
