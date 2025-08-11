"use client";
import React, { useState } from "react";
import Link from "next/link";

const menuLinks = [
  { label: "About Us", href: "/Aboutus" },
  { label: "Residential", href: "/RealEstatePage#residential" },
  { label: "Construction Material", href: "/RealEstatePage#construction-material" },
  { label: "Hospitality", href: "#" },
  { label: "Integrated Facility Management", href: "#" },
  { label: "Health & Fitness", href: "#" },
  { label: "Agriculture & Food Processing", href: "#" },
  { label: "Media", href: "#" },
  { label: "Careers", href: "#" },
];
const socialIcons = [
   { label: "LinkedIn", icon: (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="black"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
  ) },
  { label: "Facebook", icon: (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="black"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z"/></svg>
  ) },
  { label: "Instagram", icon: (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="black"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.851s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
  ) },
  { label: "YouTube", icon: (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="black"><path d="M19.615 3.184c-1.049-.356-3.523-.367-7.615-.367s-6.566.011-7.615.367c-1.049.356-1.871 1.175-2.228 2.228-.356 1.049-.367 3.523-.367 7.615s.011 6.566.367 7.615c.356 1.049 1.175 1.871 2.228 2.228 1.049.356 3.523.367 7.615.367s6.566-.011 7.615-.367c1.049-.356 1.871-1.175 2.228-2.228.356-1.049.367-3.523.367-7.615s-.011-6.566-.367-7.615c-.356-1.049-1.175-1.871-2.228-2.228zm-10.615 15.816v-8l8 4-8 4z"/></svg>
  ) },
];

export default function Hamburger({ size = 34, color = "white" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon */}
      <div
        className="hamburger-icon-wrapper"
        style={{
          cursor: "pointer",
          display: open ? "none" : "block",
        }}
        onClick={() => setOpen(true)}
      >
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="12" width="48" height="2" rx="1" fill={color} />
          <rect y="25" width="48" height="2" rx="1" fill={color} />
          <rect y="38" width="48" height="2" rx="1" fill={color} />
        </svg>
      </div>
      {/* Sidebar Drawer and Overlay */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="hamburger-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.25)",
              zIndex: 99,
              transition: "background 0.2s",
            }}
            onClick={() => setOpen(false)}
          />
          {/* Sidebar */}
          <div
            className="hamburger-sidebar"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "50vw",
              maxWidth: 400,
              minWidth: 260,
              height: "100vh",
              background: "#f7f3eb",
              zIndex: 100,
              boxShadow: "2px 0 16px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              padding: "2.5rem 2.5rem 1.5rem 2.5rem",
              fontFamily: "inherit",
              animation: "slideIn 0.3s cubic-bezier(0.4,0,0.2,1)",
              overflowY: "auto",
              transition: "width 0.2s, padding 0.2s",
            }}
          >
            {/* Cross Icon */}
            <div style={{ alignSelf: "flex-start", marginBottom: "2.5rem", cursor: "pointer" }} onClick={() => setOpen(false)}>
              <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="6" y1="6" x2="32" y2="32" stroke="#222" strokeWidth="2" strokeLinecap="round" />
                <line x1="32" y1="6" x2="6" y2="32" stroke="#222" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            {/* Menu Links */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {menuLinks.map((link, idx) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    color: "#222",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: 400,
                    letterSpacing: 1,
                    marginBottom: idx === 6 ? "0.2rem" : 0,
                  }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Contact Us and Social Icons */}
              <div>
                <Link href="/Contact"><div style={{ color: "#222", fontSize: "1.2rem", fontWeight: 400, marginBottom: "0.7rem" }}>Contact Us</div></Link>
                <div style={{ display: "flex", gap: "0.7rem" }}>
                  {socialIcons.map((icon) => (
                    <span key={icon.label} style={{ display: "inline-flex", alignItems: "center" }}>
                      {icon.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Sidebar Animation Keyframes and Responsive Styles */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .hamburger-icon-wrapper {
          transition: transform 0.2s;
        }
        
        /* Hamburger icon size for mobile */
        @media (max-width: 600px) {
          .hamburger-icon-wrapper svg {
            width: 26px !important;
            height: 26px !important;
          }
        }
        /* Sidebar full width on mobile */
        @media (max-width: 600px) {
          .hamburger-sidebar {
            width: 100vw !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            padding: 1.2rem 1.1rem 1rem 1.1rem !important;
          }
          .hamburger-sidebar div[style*='font-size: 1rem'] {
            font-size: 0.98rem !important;
          }
          .hamburger-sidebar div[style*='font-size: 1.2rem'] {
            font-size: 1.05rem !important;
          }
        }
        /* Sidebar width for tablet */
        @media (max-width: 900px) and (min-width: 601px) {
          .hamburger-sidebar {
            width: 70vw !important;
            min-width: 0 !important;
            max-width: 70vw !important;
            padding: 2rem 1.5rem 1.2rem 1.5rem !important;
          }
        }
      `}</style>
    </>
  );
} 