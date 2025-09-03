'use client';
import React, { useEffect } from "react";
import Image from "next/image";

interface PopupModalProps {
  show: boolean;
  onClose: () => void;
  redirectUrl: string;
  imageUrl: string;
}

const PopupModal: React.FC<PopupModalProps> = ({ show, onClose, redirectUrl, imageUrl }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Prevent background scroll when modal open
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0, 0, 0, 0.7)",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem"
    }}>
      <div style={{
        position: "relative",
        background: "white",
        borderRadius: "12px",
        maxWidth: "360px",  // narrower width for vertical style
        width: "90%",
        boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.3s",
            zIndex: 10,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.6)")}
        >
          &times;
        </button>

        {/* Image Container with taller aspect ratio (2:3) */}
        <div style={{ position: "relative", width: "100%", height: 0, paddingBottom: "120%" /* vertical 2:3 ratio */ }}>
          <Image
            src={imageUrl}
            alt="Popup"
            fill
            style={{ objectFit: "fill", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
            priority
          />
        </div>

        {/* Button */}
        <div style={{ padding: "1.5rem", width: "100%" }}>
          <button
            onClick={() => window.location.href = redirectUrl}
            style={{
              width: "100%",
              padding: "14px 0",
              backgroundColor: "#0969da",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(9,105,218,0.6)",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#054ea8")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0969da")}
          >
            Go to Hill View Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
