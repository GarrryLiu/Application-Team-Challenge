"use client";

import React, { Suspense } from "react";
import { Box } from "@mui/material";
import { ParticipantProvider } from "../context/ParticipantContext";
import ParticipantTable from "./participant/ParticipantTable";
import PaginationControls from "./pagination/PaginationControls";

// Loading state component
const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      fontSize: "1.2rem",
      color: "#666",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    }}
  >
    Loading participants...
  </Box>
);

const ParticipantList: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ParticipantProvider>
        <Box
          sx={{
            width: "100%",
            maxWidth: 2000,
            margin: "auto",
            px: { xs: 1, sm: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 160px)", // Account for header and pagination
            overflow: "hidden",
          }}
        >
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <ParticipantTable />
          </Box>
          <Box
            sx={{
              marginTop: "auto",
              backgroundColor: "white",
              zIndex: 1000,
              padding: "8px 0",
              borderTop: "1px solid rgba(224, 224, 224, 1)",
              position: "sticky",
              bottom: 0,
              boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PaginationControls />
          </Box>
        </Box>
      </ParticipantProvider>
    </Suspense>
  );
};

export default ParticipantList;
