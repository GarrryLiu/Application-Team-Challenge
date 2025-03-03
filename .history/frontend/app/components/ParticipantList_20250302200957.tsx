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

  // 🔹 只更新排序方向
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // 🔹 监听 `sortOrder` 变化，进行排序
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
              <TableCell align="right" className="clickable-cell">
  <Box display="flex" alignItems="center">
    <strong>ICD Codes</strong>
    <button 
      onClick={(e) => {
        e.stopPropagation(); // 避免 TableRow 捕获事件
        toggleSort();
      }}
      style={{ border: "none", background: "none", cursor: "pointer", marginLeft: "8px", padding: 0 }}
    >
      <Image 
        src={sortOrder === "asc" ? "/orderFilter_Up.svg" : "/orderFilter_Down.svg"}
        alt="Sort Order"
        width={24}
        height={24}
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
