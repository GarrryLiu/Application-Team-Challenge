"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

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

const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/participants?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => setParticipants(data.data));
  }, []);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  
  useEffect(() => {
    setParticipants((prevParticipants) => {
      const sorted = [...prevParticipants].sort((a, b) =>
        sortOrder === "asc"
          ? a.diagnoses.length - b.diagnoses.length
          : b.diagnoses.length - a.diagnoses.length
      );
      return sorted;
    });
  }, [sortOrder]); // sortOrder 改变时触发排序
  

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Participant Name</strong></TableCell>
              <TableCell align="right">
  <Box display="flex" alignItems="center">
    <strong>ICD Codes</strong>
    <button 
      onClick={(e) => {
        e.stopPropagation();
        toggleSort();
      }}
      style={{ 
        border: "none", 
        background: "none", 
        cursor: "pointer", 
        marginLeft: "8px", 
    </button>
  </Box>
</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
              <TableRow 
                key={participant.id} 
                sx={{ "&:hover": { border: "2px solid #4D7EF8", cursor: "pointer", transition: "0.2s" } }}
                onClick={() => router.push(`/participant/${participant.id}`)}
              >
                <TableCell sx={{ cursor: "pointer" }}>{participant.firstName} {participant.lastName}</TableCell>
                <TableCell align="right" sx={{ cursor: "pointer" }}>{participant.diagnoses.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ParticipantList;
