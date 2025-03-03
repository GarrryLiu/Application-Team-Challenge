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

  // 🔍 **封装 `fetchParticipants`，动态获取数据**
  const fetchParticipants = async (newSortOrder: "asc" | "desc") => {
    try {
      const response = await fetch(
        `http://localhost:5000/participants?page=1&limit=10&sort=icdCount&sortOrder=${newSortOrder}&sortOnlyOnPage=1`
      );
      const data = await response.json();
      setParticipants(data.data);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
  };

  // 🔄 **初始化数据**
  useEffect(() => {
    fetchParticipants(sortOrder);
  }, [sortOrder]);  // ✅ 依赖于 sortOrder
  
  // 🔄 **点击按钮切换排序**
const toggleSort = () => {
  setSortOrder((prevOrder) => {
    const newOrder = prevOrder === "asc" ? "desc" : "asc";
    setParticipants((prevParticipants) => {
      return [...prevParticipants].sort((a, b) =>
        newOrder === "asc"
          ? a.diagnoses.length - b.diagnoses.length
          : b.diagnoses.length - a.diagnoses.length
      );
    });
    return newOrder; // 确保 `sortOrder` 立即更新
  });
};

  return (
    <Box sx={{ maxWidth: 1500, margin: "auto", mt: 4 }}>
      <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0px 0.4px 0.4rem 0.06rem rgba(0, 0, 0, 0.5)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Participant Name</strong></TableCell>
              <TableCell align="right">
              <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">

                  <strong>ICD Codes</strong>
                  <button 
                    onClick={toggleSort}
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
