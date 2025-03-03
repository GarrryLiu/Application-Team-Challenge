"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, TablePagination
} from "@mui/material";

interface Diagnosis {
  icdCode: string;
  timestamp: Date;
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "NON-BINARY";
  phoneNumber: number;
  patientNotes: string | null;
  diagnoses: Diagnosis[];
}

const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(8); 
  const router = useRouter();

  const fetchParticipants = async (newSortOrder: "asc" | "desc") => {
    try {
      const response = await fetch(
        `http://localhost:5000/participants?page=1&limit=100&sort=icdCount&sortOrder=${newSortOrder}&sortOnlyOnPage=1`
      );
      const data = await response.json();
      setParticipants(data.data);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
  };

  useEffect(() => {
    fetchParticipants(sortOrder);
  }, [sortOrder]);

  const toggleSort = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      setParticipants((prevParticipants) =>
        [...prevParticipants].sort((a, b) =>
          newOrder === "asc"
            ? a.diagnoses.length - b.diagnoses.length
            : b.diagnoses.length - a.diagnoses.length
        )
      );
      return newOrder;
    });
  };

  const paginatedParticipants = participants.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handlePageChange = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); 
  };

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <input
                  type="text"
                  placeholder="Participant Name"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                />
              </TableCell>
              <TableCell align="right" sx={{ width: "150px" }}>
                <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
                  <input
                    type="text"
                    placeholder="ICD Code"
                    style={{
                      width: "100px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      marginRight: "8px"
                    }}
                  />
                  <button 
                    onClick={toggleSort}
                    style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}
                  >
                    <Image 
                      src={sortOrder === "asc" ? "/orderFilter_Up.svg" : "/orderFilter_Down.svg"}
                      alt="Sort Order"
                      width={20}
                      height={20}
                      style={{ minWidth: "20px", flexShrink: 0 }}
                    />
                  </button>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedParticipants.map((participant) => (
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

      {/* ✅ 分页控件 */}
      <TablePagination
        component="div"
        count={participants.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default ParticipantList;
