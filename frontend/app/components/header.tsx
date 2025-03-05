"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "@/public/logo_IntusCare.svg";
import { trpc } from "../utils/trpc";
import { useExportAllParticipants } from "../hooks/useExport";
import { usePageType } from "../context/PageTypeContext";

/**
 * Header component that displays the logo and export button
 * The export button is only shown on the main page, not on participant detail pages
 */
const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Get the export hook for all participants
  const { exportAll, isExporting: isExportingAll } = useExportAllParticipants();

  // Use the page type context instead of URL detection
  const { pageType } = usePageType();

  // Determine if we're on a detail page based on the context
  const isParticipantDetailPage = pageType === "detail";

  // Debug information - this will be visible in the UI to help understand what's happening
  const debugInfo = {
    pageType,
    isParticipantDetailPage,
    buttonShouldShow: !isParticipantDetailPage,
    currentTime: new Date().toLocaleTimeString(),
  };

  useEffect(() => {
    // Log the current page type whenever it changes
  }, [mounted, pageType, isParticipantDetailPage]);

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

      {/* Only show Export All Data button when NOT on a participant detail page */}
      {!isParticipantDetailPage && (
        <Button
          variant="contained"
          disabled={isExportingAll}
          startIcon={
            isExportingAll ? <CircularProgress size={20} /> : <DownloadIcon />
          }
          onClick={exportAll}
          sx={{
            backgroundColor: "#4D7EF8",
            color: "white",
            "&:hover": {
              backgroundColor: "#3A6AD4",
            },
          }}
        >
          {isExportingAll ? "Exporting all data..." : "Export All Data"}
        </Button>
      )}
    </Box>
  );
};

export default Header;
