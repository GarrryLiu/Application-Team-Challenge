"use client";

import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface ExportButtonProps {
  onClick: () => Promise<void>;
  label?: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "small" | "medium" | "large";
}

const ExportButton: React.FC<ExportButtonProps> = ({
  onClick,
  label = "exportData",
  variant = "contained",
  color = "primary",
  size = "medium",
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleClick = async () => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      await onClick();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={handleClick}
      disabled={isExporting}
      startIcon={
        isExporting ? <CircularProgress size={20} /> : <DownloadIcon />
      }
      sx={{
        backgroundColor: "#4D7EF8",
        color: "white",
        "&:hover": {
          backgroundColor: "#3A6AD4",
        },
      }}
    >
      {isExporting ? "Exporting..." : label}
    </Button>
  );
};

export default ExportButton;
