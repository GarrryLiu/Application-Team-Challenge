"use client"; 

import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Stack, // 替代 Grid
} from "@mui/material";

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  diagnoses: { icdCode: string }[];
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/participants?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => setParticipants(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Suspense fallback={<LoadingUI />}>
      <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#003366", // Primary/IntusNavy
            textAlign: "center",
            mb: 2,
          }}
        >
          Participants List
        </Typography>

        {/* 🚀 避免 hydration 问题，保证 UI 结构稳定 */}
        {!participants ? (
          <LoadingUI />
        ) : (
          <Stack spacing={2}>
            {participants.map((participant) => (
              <Card
                key={participant.id}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    border: "2px solid #0066CC", // Primary/IntusBlue
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  },
                }}
                onClick={() => router.push(`/participant/${participant.id}`)}
              >
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#666666", // Grayscale/Body
                      }}
                    >
                      {participant.firstName} {participant.lastName}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#0066CC", // Primary/IntusBlue
                      }}
                    >
                      {participant.diagnoses.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Suspense>
  );
};

const LoadingUI = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

export default ParticipantList;
