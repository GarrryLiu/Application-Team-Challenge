"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

// ✅ 定义 Participant 类型
interface Diagnosis {
  icdCode: string;
  conditionName: string;
  timestamp: string;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: number;
  patientNotes: string | null;
  diagnoses: Diagnosis[];
}

const ParticipantList = () => {
  // ✅ 给 useState 添加泛型
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/participants?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => setParticipants(data.data)); // 确保数据格式匹配
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ padding: 2, textAlign: "center" }}>
        Participants List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="right"><strong>Diagnoses Count</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow key={participant.id}>
              <TableCell>{participant.firstName} {participant.lastName}</TableCell>
              <TableCell align="right">{participant.diagnoses.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParticipantList;
