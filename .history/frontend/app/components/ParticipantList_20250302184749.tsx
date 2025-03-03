"use client";  // 需要加上这一行，否则 useState/useEffect 报错

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();

  // 获取数据
  useEffect(() => {
    fetch("http://localhost:5000/participants")
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  }, []);

  // 处理排序切换
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setParticipants((prevParticipants) => 
      [...prevParticipants].sort((a, b) => 
        sortOrder === "asc" ? b.diagnoses.length - a.diagnoses.length : a.diagnoses.length - b.diagnoses.length
      )
    );
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Participant Name</strong></TableCell>
              <TableCell align="right" onClick={toggleSort} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                <strong>ICD Codes</strong>
                <Image 
                  src={sortOrder === "asc" ? "/orderFilter_Up.svg" : "/orderFilter_Down.svg"}
                  alt="Sort"
                  width={20}
                  height={20}
                  style={{ marginLeft: "8px" }}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant) => (
              <TableRow 
                key={participant.id} 
                sx={{ "&:hover": { backgroundColor: "#F1F2F3", cursor: "pointer", transition: "0.3s" } }}
                onClick={() => router.push(`/participant/${participant.id}`)}
              >
                <TableCell>{participant.firstName} {participant.lastName}</TableCell>
                <TableCell align="right">{participant.diagnoses.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ParticipantList;
