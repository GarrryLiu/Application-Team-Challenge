"use client";  

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import logo from "@/public/logo_IntusCare.svg";

const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);  
  }, []);

  if (!mounted) return null; 

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
      <Image
        src={logo}
        alt="IntusCare Logo"
        width={300}
        height={100}
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
      />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#062DBF", cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
      </Typography>
    </Box>
  );
};

export default Header;
