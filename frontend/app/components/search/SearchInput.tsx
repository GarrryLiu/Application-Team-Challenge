"use client";

import React from "react";
import { TextField } from "@mui/material";

interface SearchInputProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

// Memoized search input component to reduce re-renders
const SearchInput = React.memo(
  ({ value, onChange, placeholder, inputRef }: SearchInputProps) => (
    <TextField
      variant="standard"
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      inputRef={inputRef}
      className="search-input-no-hover"
      sx={{
        background: "#F1F2F3",
        padding: "6px 12px",
        width: "300px", // Fixed width
        borderRadius: "30px",
        transition: "none !important",
        transform: "none !important",
        boxShadow: "none !important",
        border: "none !important",
        "&:hover": {
          background: "#F1F2F3 !important",
          boxShadow: "none !important",
          transform: "none !important",
          border: "none !important",
          transition: "none !important",
        },
        "& .MuiInputBase-root": {
          borderRadius: "30px",
          transition: "none !important",
          transform: "none !important",
          boxShadow: "none !important",
          border: "none !important",
          "&:hover": {
            background: "#F1F2F3 !important",
            boxShadow: "none !important",
            transform: "none !important",
            border: "none !important",
            transition: "none !important",
          },
        },
        "& .MuiInput-underline:before": {
          borderBottom: "none !important",
        },
        "& .MuiInput-underline:hover:before": {
          borderBottom: "none !important",
        },
        "& .MuiInput-underline:after": {
          borderBottom: "none !important",
        },
      }}
    />
  ),
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
