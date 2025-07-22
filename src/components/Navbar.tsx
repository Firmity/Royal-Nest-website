"use client";
import React, { useState, useEffect } from "react";
import Hamburger from "./Hamburger";
import Link  from "next/link";
import Image from "next/image";

const navLinks = [
  {
    label: "REAL ESTATE",
    href: "#",
    submenu: [
      { label: "RESIDENTIAL", href: "#" },
      { label: "COMMERCIAL", href: "#" },
      { label: "Construction Materials", href: "#" },
    ],
  },
  {
    label: "HOSPITALITY",
    href: "#",
  },
  {
    label: "SERVICES",
    href: "#",
    submenu: [
      { label: "Integrated Facility Management", href: "#" },
      { label: "Health & Fitness", href: "#" },
      { label: "Agriculture & Food Processing", href: "#" },
    ],
  },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Remove old submenuOpen state, use an index for multiple submenus
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

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
        <Link href="/">
        <div style={{ position: "relative", height: "60px", width: "80px", minWidth: 400 }}>
          <Image
            src="/Royalnest.png"
            alt="Royal Nest Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        </Link>
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
        {navLinks.map((link, idx) =>
          link.submenu ? (
            <div
              key={link.label}
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setOpenSubmenuIndex(idx)}
              onMouseLeave={() => setOpenSubmenuIndex(null)}
            >
              <a
                href={link.href}
                style={{ color: "#fff", textDecoration: "none", fontSize: "0.75rem", fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase" }}
              >
                {link.label}
              </a>
              {openSubmenuIndex === idx && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "rgba(0,0,0,0.85)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    borderRadius: 4,
                    minWidth: 180,
                    zIndex: 100,
                    padding: "0.5rem 0",
                  }}
                >
                  {link.submenu.map((sublink) => (
                    <a
                      key={sublink.label}
                      href={sublink.href}
                      style={{
                        display: "block",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "0.75rem",
                        fontWeight: 400,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        padding: "0.5rem 1.5rem",
                        whiteSpace: "nowrap",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}
                    >
                      {sublink.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <a
              key={link.label}
              href={link.href}
              style={{ color: "#fff", textDecoration: "none", fontSize: "0.75rem", fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase" }}
            >
              {link.label}
            </a>
          )
        )}
      </div>
    </nav>
  );
} 