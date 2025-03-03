import React, { useState, useEffect } from "react";
import { Box, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

const ParticipantList = () => {
  const [searchQuery, setSearchQuery] = useState("");  // ⬅️ 新增 search 状态
  const [participants, setParticipants] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:5000/participants?search=${searchQuery}`)
      .then(res => res.json())
      .then(data => setParticipants(data.data));
  }, [searchQuery]);  // ⬅️ 监听 searchQuery 变化

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      {/* 🔍 Search Bar */}
      <TextField
        fullWidth
        placeholder="Participant Name"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          backgroundColor: "#F1F2F3",
          borderRadius: "8px",
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />

      {/* 📝 Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Participant Name</strong></TableCell>
              <TableCell align="right"><strong>ICD Codes</strong></TableCell>
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
    </Box>
  );
};

export default ParticipantList;
