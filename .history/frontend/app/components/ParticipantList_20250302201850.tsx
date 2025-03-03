"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
      return [...prevParticipants].sort((a, b) =>
        sortOrder === "asc"
          ? a.diagnoses.length - b.diagnoses.length
          : b.diagnoses.length - a.diagnoses.length
      );
    });
  }, [sortOrder]);

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Participant Name</strong></TableCell>
              <TableCell align="right" onClick={(e) => e.stopPropagation()}>
    <Box display="flex" alignItems="center" justifyContent="flex-end">
      <strong>ICD Codes</strong>
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleSort();
          console.log("Sort button clicked, new order:", sortOrder === "asc" ? "desc" : "asc");
        }}
        style={{ 
          border: "1px solid #e0e0e0", 
          background: "white", 
          cursor: "pointer", 
          marginLeft: "8px", 
          padding: "6px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "36px",
          minHeight: "36px",
          zIndex: 10,
          position: "relative"
        }}
      >
        <Image 
          src={sortOrder === "asc" ? "/orderFilter_Up.svg" : "/orderFilter_Down.svg"}
          alt="Sort Order"
          width={24}
          height={24}
          style={{ pointerEvents: "none" }}
        />
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
                <TableCell 
                  align="right" 
                  onClick={(e) => e.stopPropagation()}
                  sx={{ cursor: "default" }}
                >
                  {participant.diagnoses.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ParticipantList;
