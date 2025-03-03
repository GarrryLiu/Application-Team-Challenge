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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchICD, setSearchICD] = useState("");
  const router = useRouter();

  // **🔍 获取数据**
  const fetchParticipants = async (newSortOrder: "asc" | "desc", page: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/participants?page=${page + 1}&limit=${rowsPerPage}&sort=icdCount&sortOrder=${newSortOrder}&sortOnlyOnPage=${page + 1}&search=${searchName}&icdSearch=${searchICD}`
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      // ✅ 避免覆盖数据，分页时追加
      setParticipants((prev) => (page === 0 ? data.data : [...prev, ...data.data]));
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
  };

  // 🔄 **监听 `sortOrder` & `currentPage` 变化**
  useEffect(() => {
    fetchParticipants(sortOrder, currentPage);
  }, [sortOrder, currentPage]);

  // 🔄 **切换排序**
  const toggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setCurrentPage(0); // ✅ 排序切换时，重置为第一页
  };

  // 🔍 **搜索**
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, type: "name" | "icd") => {
    const value = event.target.value;
    if (type === "name") {
      setSearchName(value);
    } else {
      setSearchICD(value);
    }
    setCurrentPage(0); // ✅ 搜索时回到第一页
  };

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* 🔍 搜索框替代 Participant Name */}
              <TableCell>
                <input
                  type="text"
                  placeholder="Participant Name"
                  value={searchName}
                  onChange={(e) => handleSearch(e, "name")}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc"
                  }}
                />
              </TableCell>

              {/* 🔍 搜索框 + 排序按钮 */}
              <TableCell align="right" sx={{ width: "200px" }}>
                <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
                  <input
                    type="text"
                    placeholder="ICD Code"
                    value={searchICD}
                    onChange={(e) => handleSearch(e, "icd")}
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

      {/* ✅ 分页控件 */}
      <TablePagination
        component="div"
        count={participants.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => setCurrentPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setCurrentPage(0);
        }}
      />
    </Box>
  );
};

export default ParticipantList;
