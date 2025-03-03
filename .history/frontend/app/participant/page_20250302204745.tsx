"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Paper } from "@mui/material";

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
  const { id } = useParams();
  const [participant, setParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/participants/${id}`)
      .then((res) => res.json())
      .then((data) => setParticipant(data));
  }, [id]);

  if (!participant) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Paper sx={{ padding: 3, borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Typography variant="h4">
          {participant.firstName} {participant.lastName}
        </Typography>
        <Typography variant="h6">ICD Codes:</Typography>
        <ul>
          {participant.diagnoses.map((d) => (
            <li key={d.icdCode}>
              {d.icdCode} - {d.conditionName}
            </li>
          ))}
        </ul>
      </Paper>
    </Box>
  );
};

export default ParticipantDetail;
