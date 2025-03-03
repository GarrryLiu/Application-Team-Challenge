"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from "@mui/material";

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
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchICD, setSearchICD] = useState("");
  const router = useRouter();

  // **🔍 获取数据，支持分页 & 搜索**
  const fetchParticipants = async (newSortOrder: "asc" | "desc", newPage: number, nameQuery: string, icdQuery: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/participants?page=${newPage}&limit=10&sort=icdCount&sortOrder=${newSortOrder}&sortOnlyOnPage=${newPage}&search=${nameQuery}&icdSearch=${icdQuery}`
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      // **✅ 避免覆盖数据：分页时追加**
      setParticipants((prev) => (newPage === 1 ? data.data : [...prev, ...data.data]));
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
  };

  // **🔄 监听 `sortOrder`、`page` 变化时重新获取数据**
  useEffect(() => {
    fetchParticipants(sortOrder, page, searchName, searchICD);
  }, [sortOrder, page]); // ✅ 依赖 `sortOrder` & `page`

  // **🔄 切换排序**
  const toggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    setPage(1); // ✅ 排序切换后从第一页重新加载
  };

  // **🔍 搜索功能**
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, type: "name" | "icd") => {
    const value = event.target.value;
    if (type === "name") {
      setSearchName(value);
    } else {
      setSearchICD(value);
    }
    setPage(1); // ✅ 搜索时返回第一页
  };

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* 🔍 搜索框替代 Participant Name */}
              <TableCell>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Participant Name"
                  value={searchName}
                  onChange={(e) => handleSearch(e, "name")}
                  sx={{ background: "#F1F2F3", borderRadius: "8px", padding: "0px 8px" }}
                />
              </TableCell>

              {/* 🔍 搜索框 + 排序按钮 */}
              <TableCell align="right" sx={{ width: "200px" }}>
                <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
                  <TextField
                    variant="outlined"
                    placeholder="ICD Codes"
                    value={searchICD}
                    onChange={(e) => handleSearch(e, "icd")}
                    sx={{ background: "#F1F2F3", borderRadius: "8px", padding: "0px 8px", flex: 1 }}
                  />
                  <button
                    onClick={toggleSort}
                    style={{ border: "none", background: "none", cursor: "pointer", padding: 0, marginLeft: "8px" }}
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

      {/* 🔄 **分页控制** */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          style={{ marginRight: "10px", padding: "8px 12px", borderRadius: "5px", backgroundColor: "#4D7EF8", color: "white", border: "none" }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ padding: "8px 12px", borderRadius: "5px", backgroundColor: "#4D7EF8", color: "white", border: "none" }}
        >
          Next →
        </button>
      </Box>
    </Box>
  );
};

export default ParticipantList;
