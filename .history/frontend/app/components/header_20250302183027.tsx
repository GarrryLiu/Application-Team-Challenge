"use client";
import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="space-between"
      padding="16px 32px"
      sx={{ backgroundColor: "#FFFFFF", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Logo */}
      <Image src="/logo_IntusCare.svg" alt="IntusCare Logo" width={150} height={50} />

      {/* Participants Title */}
      <Typography variant="h5" fontWeight="bold" color="#062DBF">
        Participants
      </Typography>
    </Box>
  );
};

export default Header;
