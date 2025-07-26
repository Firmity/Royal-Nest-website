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
      {
        label: "RESIDENTIAL",
        href: "/HillViewPage",
        image: "/Herocarousel/Royal Nest Hill View Parking Area Evening.jpg",
        description: "Eco-friendly buildings with green solutions",
      },
      {
        label: "Construction Materials",
        href: "#",
        image: "/Verticals/rmc.jpg",
        description: "Quality materials for robust construction",
      },
    ],
  },
  {
    label: "HOSPITALITY",
    href: "#",
    submenu: [
      {
        label: "Radisson Amritsar",
        href: "#",
        image: "/Verticals/Radisson Red Amritsar _ Updated Concept and Material Study_page-0004.jpg",
        description: "Premium hospitality experience with world-class amenities",
      },
      {
        label: "Hotel Xenious",
        href: "#",
        image: "/Verticals/residential.jpg",
        description: "Modern comforts and exceptional service for every guest",
      }
    ],
  },  
  {
    label: "SERVICES",
    href: "#",
    submenu: [
      {
        label: "Integrated Facility Management",
        href: "#",
        image: "/Herocarousel/Royal Nest Hill View Fountain Area.jpg",
        description: "Tech-enabled facility management services",
      },
      {
        label: "Health & Fitness",
        href: "#",
        image: "/Verticals/gym.jpg",
        description: "Comprehensive health and fitness solutions",
      },
      {
        label: "Agriculture & Food Processing",
        href: "#",
        image: "/Verticals/Cold-link.jpg",
        description: "Sustainable agriculture and food processing",
      },
    ],
  },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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
        background: "rgba(86, 93, 96, 0.68)",
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
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "1rem", minHeight: "60px" }}>
        {/* Menu Icon */}
        <div style={{ position: "absolute", top: "25%", left: "5%", display: "flex", alignItems: "center" }}>
          <Hamburger size={34} color="white" />
        </div>
        {/* Logo */}
        <Link href="/">
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", height: "60px", width: "80px", minWidth: 200}}>
            <Image
              src="/Royalnest.png"
              alt="Royal Nest Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        {/* Contact Us */}
        <Link
          href="/Contact"
          className="navbar-contact-link"
          style={{
            position: "absolute",
            right: "18px",
            top: "18px",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 400,
            fontSize: "0.8rem",
            letterSpacing: 1,
            marginTop: 0,
          }}
        >
          CONTACT US
        </Link>
      </div>
      {/* Links Row: Centered below logo */}
      <div className="navbar-links-row" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.2rem", marginTop: "0.5rem", marginBottom: "0.6rem", width: "100%" }}>
        {navLinks.map((link, idx) =>
          link.submenu ? (
            <div
              key={link.label}
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setOpenSubmenuIndex(idx)}
              onMouseLeave={() => setOpenSubmenuIndex(null)}
            >
              <Link
                href={link.href}
                style={{ color: "#fff", textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}
              >
                {link.label}
              </Link>
              {openSubmenuIndex === idx && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.60)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
                    borderRadius: 16,
                    minWidth: 700,
                    zIndex: 100,
                    padding: "2rem 2.5rem 2rem 2.5rem",
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "2.2rem 3.5rem",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {link.submenu.map((sublink) => (
                      <Link
                        key={sublink.label}
                        href={sublink.href}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          borderRadius: 14,
                          overflow: "hidden",
                          textDecoration: "none",
                          color: "#fff",
                          minWidth: 320,
                          maxWidth: 400,
                          transition: "transform 0.2s, box-shadow 0.2s",
                          cursor: "pointer",
                          padding: "0.7rem 1.2rem 0.7rem 0.7rem",
                          gap: "1.2rem",
                          margin: 0,
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "scale(1.04)";
                          e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.28)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)";
                        }}
                      >
                        <div style={{ width: 90, height: 90, position: "relative", borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                          <Image
                            src={sublink.image}
                            alt={sublink.label}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: "1.25rem", marginBottom: 4, textAlign: "left", lineHeight: 1.2, wordBreak: "break-word" }}>{sublink.label}</div>
                          <div style={{ fontSize: "1rem", color: "#e0e0e0", lineHeight: 1.4, textAlign: "left", wordBreak: "break-word" }}>{sublink.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              style={{ color: "#fff", textDecoration: "none", fontSize: "0.75rem", fontWeight: 400, letterSpacing: 1.5, textTransform: "uppercase" }}
            >
              {link.label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
} 