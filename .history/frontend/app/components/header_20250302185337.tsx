"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import logo from "@/public/logo_IntusCare.svg";

const Header = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Image src={logo} alt="IntusCare Logo" width={120} height={30} style={{ cursor: "pointer" }} onClick={() => router.push("/")} />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#062DBF", cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        Participants
      </Typography>
    </Box>
  );
};

export default Header;
