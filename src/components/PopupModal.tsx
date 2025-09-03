'use client';
import React, { useEffect } from "react";
import Image from "next/image";

interface PopupModalProps {
  show: boolean;
  onClose: () => void;
  redirectUrl: string;
  imageUrl: string;
}

const styles = `
  @keyframes slideInModal {
    0% {
      opacity: 0;
      transform: translateY(-60px) scale(0.97);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const PopupModal: React.FC<PopupModalProps> = ({ show, onClose, redirectUrl, imageUrl }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [show]);

  if (!show) return null;

  return (
    <>
      <style>{styles}</style>
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0, 0, 0, 0.65)",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}
      >
        <div
          style={{
            position: "relative", // Important for close button positioning
            background: "white",
            borderRadius: "22px",
            maxWidth: "370px",
            width: "90%",
            boxShadow: "0 16px 40px rgba(0,0,0,0.32)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "slideInModal 0.8s cubic-bezier(0.4,0,0.2,1)"
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "#222a",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 10px #0002",
              zIndex: 20,
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(20,20,20, 0.99)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(35,35,35, 0.78)")}
          >
            &times;
          </button>

          {/* Image Container */}
          <div style={{ position: "relative", width: "100%", height: 0, paddingBottom: "120%" }}>
            <Image
              src={imageUrl}
              alt="Popup"
              fill
              style={{ objectFit: "fill", borderTopLeftRadius: "22px", borderTopRightRadius: "22px" }}
              priority
            />
          </div>

          {/* Button */}
          <div style={{ padding: "1.5rem", width: "100%" }}>
            <button
              onClick={() => window.location.href = redirectUrl}
              style={{
                width: "100%",
                padding: "15px 0",
                background: "linear-gradient(90deg, #0051ba 0%, #2176ff 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(33,118,255,0.18)",
                transition: "background 0.3s, box-shadow 0.3s",
                letterSpacing: "0.02em"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(90deg, #003d8e, #1a59d9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(90deg, #0051ba 0%, #2176ff 100%)";
              }}
            >
              Go to Hill View Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
