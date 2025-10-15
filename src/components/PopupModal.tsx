'use client';
import React, { useEffect, useState } from "react";

interface PopupModalProps {
  show: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send email");

      // Download brochure
      const link = document.createElement("a");
      link.href = "/Brochure Royalnest Hill View_compressed.pdf";
      link.download = "Royalnest_Brochure";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while sending email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle} className="popup-modal">
        {/* Close Button */}
        <button onClick={onClose} style={closeButtonStyle}>✕</button>

        {/* ✅ Left Side: Image (still visible on mobile) */}
        <div className="popup-image" style={imageSectionStyle}></div>

        {/* ✅ Right Side: Form */}
        <div className="popup-form" style={formContainerStyle}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
            Get the Brochure
          </h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required style={inputStyle} />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: "#1e3a8a",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.75rem",
                fontSize: "1rem",
                cursor: "pointer",
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? "Downloading..." : "Download Brochure"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Inline Responsive CSS */}
      <style jsx>{`
        /* Mobile styles */
        @media (max-width: 768px) {
          .popup-modal {
            flex-direction: column;
            max-width: 90%;
            height: auto;
          }

          .popup-image {
            width: 100%;
            height: 200px;
            border-radius: 1rem 1rem 0 0;
            background-position: center;
          }

          .popup-form {
            padding: 1.5rem;
          }

          .popup-form h2 {
            font-size: 1.25rem;
          }

          input {
            font-size: 0.9rem;
          }

          button {
            font-size: 0.95rem;
          }
        }

        /* Tablet */
        @media (min-width: 769px) and (max-width: 1024px) {
          .popup-modal {
            max-width: 95%;
          }

          .popup-form {
            padding: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

/* ====== Styles ====== */
const overlayStyle: React.CSSProperties = {
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
};

const modalStyle: React.CSSProperties = {
  position: "relative",
  background: "white",
  borderRadius: "1rem",
  width: "100%",
  maxWidth: "1000px",
  maxHeight: "90vh",
  overflow: "hidden",
  display: "flex",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
};

const imageSectionStyle: React.CSSProperties = {
  flex: 1,
  backgroundImage: "url('/tallest residential project royalnest group.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderTopLeftRadius: "1rem",
  borderBottomLeftRadius: "1rem",
  minHeight: "300px",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "1rem",
  right: "1rem",
  background: "transparent",
  border: "none",
  color: "#333",
  fontSize: "1.5rem",
  cursor: "pointer",
  zIndex: 10,
};

const formContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "#333",
};

const inputStyle: React.CSSProperties = {
  padding: "0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #ccc",
  fontSize: "1rem",
  outline: "none",
  color: "#333",
};

export default PopupModal;