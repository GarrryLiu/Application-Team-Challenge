"use client";

import React, { useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { usePageType } from "../../context/PageTypeContext";
import { Box, Typography, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import { trpc } from "../../utils/trpc";
import { ParticipantProvider } from "../../context/ParticipantContext";
import { useExportParticipantById } from "../../hooks/useExport";

// Separate component for participant details to keep the context provider at the top level
const ParticipantDetailContent = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const { exportById, isExporting } = useExportParticipantById();
  const { setPageType } = usePageType();

  // Set page type to "detail" when this component mounts
  useEffect(() => {
    console.log(
      "Participant detail page mounted - setting page type to detail",
    );
    setPageType("detail");

    // Reset to "list" when component unmounts
    return () => {
      console.log(
        "Participant detail page unmounted - resetting page type to list",
      );
      setPageType("list");
    };
  }, [setPageType]);

  // Use tRPC query
  const participantQuery = trpc.participant.getById.useQuery({
    id: id as string,
  });

  if (participantQuery.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 200px)",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
          fontSize: "1.2rem",
          color: "#666",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography variant="h6">Loading participant details...</Typography>
      </Box>
    );
  }

  if (participantQuery.isError) {
    return (
      <Typography color="error">
        Error: {participantQuery.error.message}
      </Typography>
    );
  }

  const participant = participantQuery.data!;

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 1000,
        margin: "0 auto",
        mt: 10,
        px: 3, // Horizontal padding
        position: "relative", // For absolute positioned back button
        width: "100%",
        height: "calc(100vh - 80px)", // Account for header height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          width: "142px",
          height: "53px",
          backgroundColor: "#4D7EF8",
          color: "white",
          position: "fixed", // Fixed positioning for desktop
          left: "40px",
          top: "150px",
          fontSize: "20px",
          fontWeight: "bold",
          zIndex: 10, // Ensure button stays above other content
          // Mobile-specific styles
          "@media (max-width: 600px)": {
            position: "relative",
            left: "auto",
            top: "auto",
            width: "100px",
            height: "40px",
            fontSize: "16px",
            marginBottom: "16px",
            alignSelf: "flex-start",
          },
        }}
        onClick={() => {
          // Preserve search parameters
          const params = new URLSearchParams(searchParams.toString());
          const queryString = params.toString()
            ? `/?${params.toString()}`
            : "/";
          router.push(queryString);
        }}
      >
        Back
      </Button>
      <Paper
        sx={{
          padding: 4,
          borderRadius: "10px",
          boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)",
          maxHeight: "calc(100vh - 200px)", // Leave space for header and margins
          overflow: "auto", // Make the card content scrollable
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#626275" }}
          >
            {participant.firstName} {participant.lastName}
          </Typography>
          <Button
            variant="contained"
            disabled={isExporting}
            startIcon={<DownloadIcon />}
            onClick={() => {
              const name = `${participant.firstName}_${participant.lastName}`;
              exportById(id as string, name);
            }}
            sx={{
              backgroundColor: "#4D7EF8",
              color: "white",
              "&:hover": {
                backgroundColor: "#3A6AD4",
              },
            }}
          >
            {isExporting ? "Exporting..." : "Export Data"}
          </Button>
        </Box>
        <Typography variant="body1" sx={{ mt: 1, color: "#97999B" }}>
          Age:{" "}
          {new Date().getFullYear() -
            new Date(participant.dateOfBirth).getFullYear()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "#97999B" }}>
          Gender:{" "}
          {participant.gender === "MALE"
            ? "Male"
            : participant.gender === "FEMALE"
              ? "Female"
              : "Non-Binary"}
        </Typography>
        <Typography variant="body1" sx={{ color: "#97999B", mt: 1 }}>
          ICD Codes ({participant.diagnoses.length})
        </Typography>

        {participant.diagnoses.map((diag, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              mt: 1,
              background: "#F1F2F3",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {diag.conditionName}
            </Typography>
            <Typography variant="body1">{diag.icdCode}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

// Main component with context provider
const ParticipantDetail = () => {
  return (
    <ParticipantProvider>
      <ParticipantDetailContent />
    </ParticipantProvider>
  );
};

export default ParticipantDetail;
