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
        padding: { xs: "12px 16px", sm: "16px 32px" }, // Responsive padding
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor: "white",
      }}
    >
      <Image
        src={logo}
        alt="IntusCare Logo"
        width={300}
        height={100}
        style={{
          cursor: "pointer",
          maxWidth: "100%", // Ensure image doesn't overflow container
          height: "auto", // Maintain aspect ratio
        }}
        onClick={() => router.push("/")}
      />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#062DBF", cursor: "pointer" }}
        onClick={() => router.push("/")}
      ></Typography>
    </Box>
  );
};

export default Header;
