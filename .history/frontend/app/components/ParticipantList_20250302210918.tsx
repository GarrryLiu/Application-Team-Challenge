"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";

interface Diagnosis {
  icdCode: string;
  timestamp: Date;
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
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 搜索姓名
  const [icdSearchQuery, setIcdSearchQuery] = useState(""); // 🔍 搜索 ICD 代码
  const router = useRouter();

  // **🔍 获取数据**
  const fetchParticipants = async (newSortOrder: "asc" | "desc", nameSearch: string, icdSearch: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/participants?page=1&limit=10&sort=icdCount&sortOrder=${newSortOrder}&sortOnlyOnPage=1&search=${nameSearch}&icdSearch=${icdSearch}`
      );
      const data = await response.json();
      setParticipants(data.data);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
  };

  // **🔄 初始化数据**
  useEffect(() => {
    fetchParticipants(sortOrder, searchQuery, icdSearchQuery);
  }, [sortOrder, searchQuery, icdSearchQuery]); // ✅ 监听 `searchQuery` & `icdSearchQuery`

  // **🔄 切换排序**
  const toggleSort = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      fetchParticipants(newOrder, searchQuery, icdSearchQuery);
      return newOrder;
    });
  };

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      {/* 📋 Participant Table */}
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* 🔍 Participant Name 搜索框 */}
              <TableCell>
                <TextField
                  fullWidth
                  placeholder="Search Participant Name"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    backgroundColor: "#F1F2F3",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </TableCell>

              {/* 🔍 ICD Codes 搜索框 & 排序按钮 */}
              <TableCell align="right" sx={{ width: "200px" }}>
                <Box display="flex" alignItems="center" width="100%">
                  <TextField
                    fullWidth
                    placeholder="Search ICD Code"
                    variant="outlined"
                    value={icdSearchQuery}
                    onChange={(e) => setIcdSearchQuery(e.target.value)}
                    sx={{
                      backgroundColor: "#F1F2F3",
                      borderRadius: "8px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
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
    </Box>
  );
};

export default ParticipantList;
