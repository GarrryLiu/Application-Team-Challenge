import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // 记录排序状态

  useEffect(() => {
    fetch("http://localhost:5000/participants?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => setParticipants(data.data));
  }, []);

  // 处理排序切换
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setParticipants([...participants].sort((a, b) => 
      sortOrder === "asc" ? b.diagnoses.length - a.diagnoses.length : a.diagnoses.length - b.diagnoses.length
    ));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
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
              <TableRow key={participant.id} sx={{ "&:hover": { border: "2px solid #4D7EF8" } }}>
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
