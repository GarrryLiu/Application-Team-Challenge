"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Box, Typography, Paper, Button } from "@mui/material";

// 定义接口
interface Diagnosis {
  icdCode: string;
  conditionName: string;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  diagnoses: Diagnosis[];
}

const ParticipantDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const [participant, setParticipant] = useState<Participant | null>(null);


  useEffect(() => {
    fetch(`http://localhost:5000/participants/${id}`)
      .then((res) => res.json())
      .then((data) => setParticipant(data))
      .catch((error) => console.error("Error fetching participant data:", error));
  }, [id]);

  if (!participant) {
    return <Typography>Loading participant details...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#4D7EF8", color: "white", mb: 2 }}
        onClick={() => router.push("/")}
      >
        ← Back
      </Button>
      <Paper sx={{ padding: 3, borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#062DBF" }}>
          {participant.firstName} {participant.lastName}
        </Typography>
        <Typography variant="body1" sx={{ color: "#97999B", mt: 1 }}>
          ICD Codes ({participant.diagnoses.length})
        </Typography>

        {participant.diagnoses.map((diag, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "space-between", p: 2, mt: 1, background: "#F1F2F3", borderRadius: "8px" }}>
            <Typography variant="body1">{diag.conditionName}</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{diag.icdCode}</Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ParticipantDetail;
