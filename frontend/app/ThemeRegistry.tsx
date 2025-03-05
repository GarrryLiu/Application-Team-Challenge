"use client";

import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#4D7EF8",
    },
    secondary: {
      main: "#062DBF",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
