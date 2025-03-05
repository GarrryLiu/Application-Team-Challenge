"use client";

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useParticipants } from "../../context/ParticipantContext";
import ParticipantNameSearch from "../search/ParticipantNameSearch";
import ICDCodeSearch from "../search/ICDCodeSearch";
import CategoryFilter from "../filters/CategoryFilter";
import AgeFilter from "../filters/AgeFilter";
import GenderFilter from "../filters/GenderFilter";
import SortControls from "../filters/SortControls";

const ParticipantTable: React.FC = () => {
  const router = useRouter();
  const { participants, isLoading, isError, error, buildParticipantUrl } =
    useParticipants();
  const [activeInput, setActiveInput] = React.useState<"name" | "icd" | null>(
    null,
  );
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Save scroll position to localStorage when scrolling
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      localStorage.setItem(
        "participantListScrollPosition",
        container.scrollTop.toString(),
      );
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll position when data is loaded
  useEffect(() => {
    // Only restore scroll position when data is loaded
    if (!isLoading && participants.length > 0) {
      const container = tableContainerRef.current;
      if (!container) return;

      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        const savedPosition = localStorage.getItem(
          "participantListScrollPosition",
        );
        if (savedPosition) {
          container.scrollTop = parseInt(savedPosition);
        }
      }, 0);
    }
  }, [isLoading, participants]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 250px)",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 50,
          fontSize: "1.2rem",
          color: "#666",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography variant="h6">Loading participants...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error">
        Error loading participants: {error.message}
      </Typography>
    );
  }

  return (
    <Paper
      sx={{
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        padding: "16px",
        margin: "16px 0",
        background: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Fixed section at the top containing search, filters, and table headers */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
          paddingBottom: "8px",
        }}
      >
        {/* Search and filters section */}
        <Box
          className="search-section"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: "16px",
            marginBottom: "16px",
            padding: "8px",
            backgroundColor: "white",
          }}
        >
          {/* Search inputs side by side */}
          <Box
            className="search-inputs-container"
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "nowrap",
              width: { xs: "100%", md: "auto" },
            }}
          >
            <ParticipantNameSearch
              setActiveInput={setActiveInput}
              activeInput={activeInput}
            />
            <ICDCodeSearch
              setActiveInput={setActiveInput}
              activeInput={activeInput}
            />
          </Box>

          {/* Filters in a simple row */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "0px",
              width: { xs: "100%", md: "auto" },
              overflowX: "auto",
            }}
          >
            <CategoryFilter />
            <AgeFilter />
            <GenderFilter />
            <SortControls />
          </Box>
        </Box>

        {/* 表头作为一个独立的行 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "white",
            padding: "16px 20px 16px 16px", // 右侧padding调整为20px以对齐单元格
            borderRadius: "30px",
            marginBottom: "0px",
          }}
        >
          {/* Name */}
          <Typography
            variant="h6"
            sx={{
              mt: -2,
              fontWeight: "bold",
              flex: 0.5,
              textAlign: "left",
              minWidth: "150px",

              fontSize: "1.25rem",
            }}
          >
            Name
          </Typography>

          {/* ICD Count */}
          <Typography
            variant="h6"
            sx={{
              mt: -2,
              fontWeight: "bold",
              textAlign: "right",
              minWidth: "150px",
              fontSize: "1.25rem",
            }}
          >
            ICD Count
          </Typography>
        </Box>
      </Box>

      {/* Table section - scrollable (only the body) */}
      <TableContainer
        ref={tableContainerRef}
        className="data-table-section"
        sx={{
          borderRadius: "30px",
          flexGrow: 1,
          height: "100%",
          overflow: "auto",
          position: "relative",
          marginTop: -3,
          maxHeight: "calc(100vh - 300px)", // Ensure table doesn't exceed viewport
        }}
      >
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 px",
            tableLayout: "fixed",
            width: "100%",
          }}
        >
          <TableBody>
            {participants.map((participant) => (
              <TableRow
                key={participant.id}
                sx={{
                  display: "flex",
                  width: "100%",
                  borderRadius: "30px",
                  margin: "12px 0",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "white",
                    boxShadow: "none",
                    border: "none",
                    transform: "none",
                  },
                }}
                onClick={() => router.push(buildParticipantUrl(participant.id))}
              >
                <TableCell
                  sx={{
                    padding: "24px 20px",
                    border: "none",
                    borderTopLeftRadius: "30px",
                    borderBottomLeftRadius: "30px",
                    width: "200px",
                    height: "70px",
                    flex: 1,
                    maxWidth: "400px",
                    position: "sticky",
                    left: 0,
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  {" "}
                  <Typography
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "18px",
                    }}
                  >
                    {participant.firstName} {participant.lastName}
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    padding: "16px 20px",
                    border: "none",
                    borderTopRightRadius: "30px",
                    borderBottomRightRadius: "30px",
                    width: "200px",
                    position: "sticky",
                    flex: 1,
                    right: 0,
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    sx={{ color: "#062D8F", fontSize: "17px", right: "20px" }}
                  >
                    {participant.diagnoses.length}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ParticipantTable;
