'use client';
import React, { useEffect } from "react";
import ContactPage from "./contactpage";

interface PopupModalProps {
  show: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ show, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

   const downloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/Brochure Royalnest Hill View_compressed.pdf"; // place the brochure in public folder
    link.download = "Royalnest_Brochure";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        padding: "2rem",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "white",
          borderRadius: "1rem",
          width: "100%",
          maxWidth: "1200px", // ✅ Keeps full two-column layout
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            color: "#333",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* ✅ Keep the ContactPage layout exactly same */}
        <ContactPage onSubmitSuccess={downloadBrochure} />
      </div>
    </div>
  );
};

export default PopupModal;
