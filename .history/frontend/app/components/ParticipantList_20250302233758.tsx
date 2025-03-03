"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, TablePagination, TextField
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
  const [sortType, setSortType] = useState<"icdCount" | "name">("icdCount"); 
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchICD, setSearchICD] = useState("");
  const router = useRouter();

  // **🔍 获取数据**
  const [totalParticipants, setTotalParticipants] = useState(0); // ✅ 存储总数据量

  const fetchParticipants = async (
    newSortOrder: "asc" | "desc",
    page: number,
    nameQuery: string,
    icdQuery: string,
    sortType: "icdCount" | "name"
  ) => {
    console.log("ICD Search Query Sent to API:", icdQuery); // 🔍 检查 API 请求参数
  
    try {
      const response = await fetch(
        `http://localhost:5000/participants?page=${page + 1}&limit=${rowsPerPage}&sort=${sortType}&sortOrder=${newSortOrder}&sortOnlyOnPage=${page + 1}&search=${nameQuery}&icdSearch=${encodeURIComponent(icdQuery)}`
      );
      const data = await response.json();
  
      console.log("Fetched Data:", data); // 🔍 确保 API 返回正确数据
      setParticipants(data.data);
      setTotalParticipants(data.total);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
  };
  
  const handleSortTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortType = event.target.value as "icdCount" | "name";
    setSortType(newSortType);
    fetchParticipants(sortOrder, currentPage, searchName, searchICD, newSortType); 
  };  

  // 🔄 **监听 `sortOrder`、`currentPage`、`searchName`、`searchICD` 变化**
  useEffect(() => {
    fetchParticipants(sortOrder, currentPage, searchName, searchICD, sortType);
  }, [sortOrder, sortType, currentPage, searchName, searchICD]);// ✅ 监听所有关键变量
  

  // 🔄 **切换排序**
// 🔄 **切换排序**
const toggleSort = () => {
  setSortOrder((prevOrder) => {
    const newOrder = prevOrder === "asc" ? "desc" : "asc";
    fetchParticipants(newOrder, currentPage, searchName, searchICD,  sortType); // ✅ 立即获取排序后的数据
    console.log("Sorting Order Changed:", newOrder); // ✅ 确保排序被触发
    return newOrder;
  });
};


  // 🔍 **搜索**
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: "name" | "icd") => {
    const value = event.target.value.trim(); // ✅ 去掉前后空格
    console.log(`Updating Search (${type}):`, value); // 🔍 检查输入框输入
  
    if (type === "name") {
      setSearchName(value);
    } else {
      const formattedICDSearch = value.replace(/,\s*/g, " ").split(" ").join(","); // ✅ 兼容“逗号” 和 “空格” 分隔
      setSearchICD(formattedICDSearch);
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
              <TableCell >
              <TextField
  variant="standard" // ✅ 让 TextField 没有黑色框
  fullWidth
  placeholder="Search Participant Name"
  value={searchName}
  onChange={(e) => handleSearch(e, "name")}
  sx={{ 
    background: "#F1F2F3", // ✅ 让背景颜色符合你的设计
    padding: "6px 12px",
    width: "300px",
    "& .MuiInput-underline:before": { borderBottom: "none" }, // ✅ 去掉黑色框
    "& .MuiInput-underline:hover:before": { borderBottom: "none" },
    "& .MuiInput-underline:after": { borderBottom: "none" }
  }}
/>

              </TableCell>

              {/* 🔍 搜索框 + 排序按钮 */}
              <TableCell align="right" sx={{ width: "900px" }}>
                <Box display="flex" alignItems="center" justifyContent="flex-end" width="100%">
                  <TextField
                    variant="standard"
                    placeholder="Search ICD Code"
                    value={searchICD}
                    onChange={(e) => handleSearch(e, "icd")}
                    sx={{ 
                      background: "#F1F2F3", // ✅ 让背景颜色符合你的设计
                      padding: "6px 12px",
                      width: "300px",
                      "& .MuiInput-underline:before": { borderBottom: "none" }, // ✅ 去掉黑色框
                      "& .MuiInput-underline:hover:before": { borderBottom: "none" },
                      "& .MuiInput-underline:after": { borderBottom: "none" }
                    }}
                  />
                  <select
          value={sortType}
          onChange={handleSortTypeChange}
          style={{ 
            marginLeft: "8px",
            padding: "6px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#F1F2F3",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          <option value="icdCount">Sort by ICD Count</option>
          <option value="name">Sort by Name (A-Z / Z-A)</option>
        </select>

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

      {/* ✅ 分页控件 */}
      <TablePagination
        component="div"
        count={totalParticipants}
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
