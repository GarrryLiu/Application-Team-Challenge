import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntusCare - Participant List",
  description: "Manage participants and their ICD diagnoses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Header />  {/* ✅ 添加 Header 组件 */}
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
