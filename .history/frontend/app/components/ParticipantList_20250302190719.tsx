"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

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

const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const router = useRouter();

  // 获取数据
  useEffect(() => {
    fetch("http://localhost:5000/participants?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => setParticipants(data.data));
  }, []);

  // 处理排序
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setParticipants((prevParticipants) =>
      [...prevParticipants].sort((a, b) =>
        sortOrder === "asc" ? b.diagnoses.length - a.diagnoses.length : a.diagnoses.length - b.diagnoses.length
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Participant Name</strong></TableCell>
              <TableCell align="right">
                <Box display="flex" alignItems="center">
                  <strong>ICD Codes</strong>
                  <Image 
                    src={sortOrder === "asc" ? "/orderFilter_Up.svg" : "/orderFilter_Down.svg"}
                    alt="Sort Order"
                    width={24}
                    height={24}
                    onClick={toggleSort}
                    style={{ cursor: "pointer", marginLeft: "8px" }}
                  />
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
