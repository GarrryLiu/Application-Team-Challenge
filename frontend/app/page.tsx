"use client";

import { useEffect } from "react";
import ParticipantList from "./components/ParticipantList";
import { Box, Typography } from "@mui/material";
import { usePageType } from "./context/PageTypeContext";

export default function Home() {
  const { setPageType } = usePageType();

  // Set page type to "list" when this component mounts
  useEffect(() => {
    console.log("Home page mounted - setting page type to list");
    setPageType("list");
  }, [setPageType]);
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Fixed header section */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "white",
          paddingTop: "20px",
          paddingBottom: "10px",
        }}
      >
        <Box
          sx={{
            paddingLeft: { xs: "16px", sm: "24px", md: "36px" },
            maxWidth: 2000,
            margin: "auto",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              fontFamily: "Mulish, Arial, sans-serif",
              color: "#062D8F",
              paddingBottom: "10px",
              textAlign: "left",
              paddingLeft: { xs: "8px", sm: "16px", md: "16px" },
            }}
          >
            Participants
          </Typography>
        </Box>
      </Box>

      {/* Scrollable content area */}
      <Box
        sx={{
          mt: -4.5,
          borderRadius: 0,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 120px)", // Adjusted for accurate header height
          overflow: "hidden",
          flexShrink: 0, // Prevent container shrinking
        }}
      >
        <ParticipantList />
      </Box>
    </main>
  );
}
