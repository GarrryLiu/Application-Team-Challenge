"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../../assets/logo_IntusCare.svg";

const Header = () => {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "white",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      <Image src={logo} alt="IntusCare Logo" width={150} height={40} />
    </header>
  );
};

export default Header;
