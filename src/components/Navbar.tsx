"use client";
import React, { useState, useEffect } from "react";
import Hamburger from "./Hamburger";

const navLinks = [
  { label: "RETAIL", href: "#" },
  { label: "RESIDENTIAL", href: "#" },
  { label: "COMMERCIAL", href: "#" },
  { label: "HOSPITALITY", href: "#" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        background: "rgba(0, 0, 0, 0.1)",
        backdropFilter: isHovered ? "blur(10px)" : "none",
        WebkitBackdropFilter: isHovered ? "blur(10px)" : "none",
        color: "#fff",
        fontFamily: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        padding: "0 4rem",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
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