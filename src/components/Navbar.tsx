import React from "react";
import Hamburger from "./Hamburger";

const navLinks = [
  { label: "RETAIL", href: "#" },
  { label: "RESIDENTIAL", href: "#" },
  { label: "COMMERCIAL", href: "#" },
  { label: "HOSPITALITY", href: "#" },
];

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        background: "transparent",
        color: "#fff",
        fontFamily: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "0 4rem",
      }}
    >
      {/* Top Row: Menu Icon, Logo, Contact Us */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "1rem" }}>
        {/* Menu Icon */}
        <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
          <Hamburger size={34} color="white" />
        </div>
        {/* Logo */}
        <div style={{ flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", minWidth: 0 }}>
          {/* Big RN */}
          <span style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: 2, lineHeight: 1, marginRight: "0.8rem" }}>RN</span>
          {/* TREHAN and IRIS stacked to the right */}
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", lineHeight: 1 }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: 1, fontWeight: 300, marginBottom: 0 }}>ROYAL NEST</span>
            <span style={{ fontSize: "1.2rem", letterSpacing: 1, fontWeight: 400, marginTop: 0 }}>GROUP</span>
          </span>
        </div>
        {/* Contact Us */}
        <a
          href="#"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 400,
            fontSize: "0.8rem",
            letterSpacing: 1,
            marginTop: "0.7rem",
          }}
        >
          CONTACT US
        </a>
      </div>
      {/* Links Row: Centered below logo */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.2rem", marginTop: "0.5rem", marginBottom: "0.3rem", width: "100%" }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{ color: "#fff", textDecoration: "none", fontSize: "0.75rem", fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
} 