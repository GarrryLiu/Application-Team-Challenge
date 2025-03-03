"use client";  // 🔥 确保 layout.tsx 也是客户端组件

import React from "react";
import Header from "./components/header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme(); 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
