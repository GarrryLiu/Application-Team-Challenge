"use client";

import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Box, Typography, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { trpc } from "../../utils/trpc";
import { ParticipantProvider } from "../../context/ParticipantContext";

// Separate component for participant details to keep the context provider at the top level
const ParticipantDetailContent = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();

  // Use tRPC query
  const participantQuery = trpc.participant.getById.useQuery({
    id: id as string,
  });

  if (participantQuery.isLoading) {
    return <Typography>Loading participant details...</Typography>;
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
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#626275" }}>
          {participant.firstName} {participant.lastName}
        </Typography>
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
