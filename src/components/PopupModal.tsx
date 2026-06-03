// 'use client';
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface PopupModalProps {
//   show: boolean;
//   onClose: () => void;
// }

// const PopupModal: React.FC<PopupModalProps> = ({ show, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     city: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = show ? "hidden" : "auto";
//   }, [show]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/sendEmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed to send email");

//       // Download brochure
//       const link = document.createElement("a");
//       link.href = "/Brochure_Royalnest_Dharamshala.pdf";
//       link.download = "Royalnest_Brochure";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong while sending email.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!show) return null;

//   const router = useRouter();
//   const handleBannerClick = () => router.push("/royal-nest-dharamshala");

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle} className="popup-modal">
//         <div
//           style={bannerStyle}
//           className="popup-banner"
//           role="button"
//           tabIndex={0}
//           onClick={handleBannerClick}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" || e.key === " ") {
//               handleBannerClick();
//             }
//           }}
//         >
//           <span>Visit Royal Nest Dharamshala</span>
//         </div>
//         {/* Close Button */}
//         <button onClick={onClose} style={closeButtonStyle}>✕</button>

//         <div style={contentWrapperStyle}>
//           {/* ✅ Left Side: Image (still visible on mobile) */}
//           <div className="popup-image" style={imageSectionStyle}></div>

//           {/* ✅ Right Side: Form */}
//           <div className="popup-form" style={formContainerStyle}>
//           <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
//             Get the Brochure for RN Forest View
//           </h2>
//           <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//             <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
//             <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
//             <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required style={inputStyle} />
//             <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               style={{
//                 background: "#1e3a8a",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "0.5rem",
//                 padding: "0.75rem",
//                 fontSize: "1rem",
//                 cursor: "pointer",
//                 opacity: isSubmitting ? 0.6 : 1,
//               }}
//             >
//               {isSubmitting ? "Downloading..." : "Download Brochure"}
//             </button>
//           </form>
//         </div>
//         </div>
//       </div>

//       {/* ✅ Inline Responsive CSS */}
//       <style jsx>{`
//         /* Mobile styles */
//         @media (max-width: 768px) {
//           .popup-modal {
//             flex-direction: column;
//             max-width: 90%;
//             height: auto;
//           }

//           .popup-image {
//             width: 100%;
//             height: 200px;
//             border-radius: 1rem 1rem 0 0;
//             background-position: center;
//           }

//           .popup-form {
//             padding: 1.5rem;
//           }

//           .popup-form h2 {
//             font-size: 1.25rem;
//           }

//           input {
//             font-size: 0.9rem;
//           }

//           button {
//             font-size: 0.95rem;
//           }
//         }

//         /* Tablet */
//         @media (min-width: 769px) and (max-width: 1024px) {
//           .popup-modal {
//             max-width: 95%;
//           }

//           .popup-form {
//             padding: 1.8rem;
//           }
//         }

//         .popup-banner {
//           animation: pulseBanner 2.5s ease-in-out infinite;
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }

//         .popup-banner:hover {
//           transform: scale(1.02);
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
//         }

//         @keyframes pulseBanner {
//           0%, 100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.02);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// /* ====== Styles ====== */
// const overlayStyle: React.CSSProperties = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   background: "rgba(0, 0, 0, 0.6)",
//   zIndex: 10000,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   overflowY: "auto",
//   padding: "2rem",
// };

// const modalStyle: React.CSSProperties = {
//   position: "relative",
//   background: "white",
//   borderRadius: "1rem",
//   width: "100%",
//   maxWidth: "1000px",
//   maxHeight: "90vh",
//   overflow: "hidden",
//   display: "flex",
//   paddingTop: "3rem",
//   boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
// };

// const imageSectionStyle: React.CSSProperties = {
//   flex: 1,
//   backgroundImage: "url('/DHARAMSHALA,HP.png')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   borderTopLeftRadius: "1rem",
//   borderBottomLeftRadius: "1rem",
//   minHeight: "300px",
// };

// const closeButtonStyle: React.CSSProperties = {
//   position: "absolute",
//   top: "3rem",
//   right: "1rem",
//   background: "transparent",
//   border: "none",
//   color: "#333",
//   fontSize: "1.5rem",
//   cursor: "pointer",
//   zIndex: 10,
// };

// const bannerStyle: React.CSSProperties = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   background: "#228a1e",
//   color: "#fff",
//   textAlign: "center",
//   padding: "0.9rem 1rem",
//   fontWeight: 700,
//   letterSpacing: "0.08em",
//   textTransform: "uppercase",
//   borderTopLeftRadius: "1rem",
//   borderTopRightRadius: "1rem",
//   zIndex: 11,
//   cursor: "pointer",
// };

// const formContainerStyle: React.CSSProperties = {
//   flex: 1,
//   padding: "2rem",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   color: "#333",
// };

// const contentWrapperStyle: React.CSSProperties = {
//   display: "flex",
//   flex: 1,
//   minHeight: 0,
// };

// const inputStyle: React.CSSProperties = {
//   padding: "0.75rem",
//   borderRadius: "0.5rem",
//   border: "1px solid #ccc",
//   fontSize: "1rem",
//   outline: "none",
//   color: "#333",
// };

// export default PopupModal;























// 'use client';
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface PopupModalProps {
//   show: boolean;
//   onClose: () => void;
// }

// const PopupModal: React.FC<PopupModalProps> = ({ show, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     city: ""
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     document.body.style.overflow = show ? "hidden" : "auto";
//   }, [show]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const res = await fetch("/api/sendEmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) throw new Error("Failed to send email");
//       const link = document.createElement("a");
//       link.href = "/Brochure_Royalnest_Dharamshala.pdf";
//       link.download = "Royalnest_Brochure";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong while sending email.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!show) return null;

//   const handleBannerClick = () => router.push("/royal-nest-dharamshala");

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle} className="popup-modal">

//         {/* ── ATTRACTIVE BANNER ── */}
//         <div
//           className="popup-banner"
//           style={bannerStyle}
//           role="button"
//           tabIndex={0}
//           onClick={handleBannerClick}
//           onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleBannerClick(); }}
//         >
//           {/* Animated shimmer overlay */}
//           <div style={bannerShimmerStyle} className="banner-shimmer" />

//           {/* Left: badge */}
//           <div style={bannerBadgeStyle}>
//             <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", color: "#4ade80", display: "block", marginBottom: "2px" }}>
//               NEW LAUNCH
//             </span>
//             <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}>
//             </span>
//           </div>

//           {/* Center: main message */}
//           <div style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}>
//             <span style={{
//               fontSize: "clamp(11px, 2vw, 14px)",
//               fontWeight: 700,
//               letterSpacing: "0.06em",
//               color: "#fff",
//             }}>
//               🏔️ Royal Nest Forest View, Dharamshala
//             </span>
//             <span style={{
//               display: "block",
//               fontSize: "clamp(9px, 1.5vw, 11px)",
//               color: "rgba(255,255,255,0.65)",
//               marginTop: "2px",
//               letterSpacing: "0.04em",
//               fontWeight: 400,
//             }}>
//               Limited Edition Himalayan Living · Explore the Project
//             </span>
//           </div>

//           {/* Right: CTA pill */}
//           <div style={bannerCtaStyle} className="banner-cta">
//             View →
//           </div>
//         </div>

//         {/* Close Button */}
//         <button onClick={onClose} style={closeButtonStyle}>✕</button>

//         <div style={contentWrapperStyle}>
//           {/* Left: Image */}
//           <div className="popup-image" style={imageSectionStyle} />

//           {/* Right: Form */}
//           <div className="popup-form" style={formContainerStyle}>
//             <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "0.4rem", color: "#1e293b" }}>
//               Get the Brochure
//             </h2>
//             <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.2rem" }}>
//               Royal Nest — Instant Download
//             </p>
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
//               <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
//               <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
//               <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required style={inputStyle} />
//               <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 style={{
//                   background: "#1e3a8a",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "0.5rem",
//                   padding: "0.85rem",
//                   fontSize: "0.95rem",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   opacity: isSubmitting ? 0.6 : 1,
//                   letterSpacing: "0.03em",
//                 }}
//               >
//                 {isSubmitting ? "Downloading…" : "Download Brochure →"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .banner-shimmer {
//           position: absolute;
//           top: 0; left: -100%; width: 60%; height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
//           animation: shimmer 3s ease-in-out infinite;
//           z-index: 0;
//         }

//         @keyframes shimmer {
//           0% { left: -100%; }
//           60% { left: 160%; }
//           100% { left: 160%; }
//         }

//         .banner-cta {
//           transition: background 0.2s, transform 0.2s;
//         }

//         .popup-banner:hover .banner-cta {
//           background: rgba(255,255,255,0.25) !important;
//           transform: translateX(2px);
//         }

//         @media (max-width: 768px) {
//           .popup-modal {
//             flex-direction: column;
//             max-width: 92%;
//             max-height: 92vh;
//             height: auto;
//           }
//           .popup-image {
//             width: 100%;
//             height: 180px;
//             border-radius: 0;
//           }
//           .popup-form {
//             padding: 1.4rem;
//           }
//         }

//         @media (min-width: 769px) and (max-width: 1024px) {
//           .popup-modal {
//             max-width: 95%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// /* ── Styles ── */

// const overlayStyle: React.CSSProperties = {
//   position: "fixed",
//   top: 0, left: 0,
//   width: "100vw", height: "100vh",
//   background: "rgba(0,0,0,0.65)",
//   zIndex: 10000,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   overflowY: "auto",
//   padding: "2rem",
// };

// const modalStyle: React.CSSProperties = {
//   position: "relative",
//   background: "white",
//   borderRadius: "1rem",
//   width: "100%",
//   maxWidth: "1000px",
//   maxHeight: "90vh",
//   overflow: "hidden",
//   display: "flex",
//   paddingTop: "3.2rem",
//   boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
// };

// const bannerStyle: React.CSSProperties = {
//   position: "absolute",
//   top: 0, left: 0,
//   width: "100%",
//   height: "3.2rem",
//   background: "linear-gradient(90deg, #1e3a8a 0%, #166534 60%, #15803d 100%)",
//   display: "flex",
//   alignItems: "center",
//   gap: "12px",
//   padding: "0 16px",
//   cursor: "pointer",
//   borderTopLeftRadius: "1rem",
//   borderTopRightRadius: "1rem",
//   zIndex: 11,
//   overflow: "hidden",
//   userSelect: "none",
// };

// const bannerShimmerStyle: React.CSSProperties = {
//   position: "absolute",
//   top: 0, left: "-100%",
//   width: "60%", height: "100%",
// };

// const bannerBadgeStyle: React.CSSProperties = {
//   flexShrink: 0,
//   background: "rgba(255,255,255,0.12)",
//   border: "1px solid rgba(255,255,255,0.2)",
//   borderRadius: "6px",
//   padding: "4px 8px",
//   textAlign: "center",
//   position: "relative",
//   zIndex: 1,
// };

// const bannerCtaStyle: React.CSSProperties = {
//   flexShrink: 0,
//   background: "rgba(255,255,255,0.15)",
//   border: "1px solid rgba(255,255,255,0.3)",
//   borderRadius: "20px",
//   padding: "4px 12px",
//   fontSize: "11px",
//   fontWeight: 700,
//   color: "#fff",
//   letterSpacing: "0.04em",
//   position: "relative",
//   zIndex: 1,
//   whiteSpace: "nowrap",
// };

// const imageSectionStyle: React.CSSProperties = {
//   flex: 1,
//   backgroundImage: "url('/DHARAMSHALA,HP.png')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   borderTopLeftRadius: 0,
//   borderBottomLeftRadius: "1rem",
//   minHeight: "300px",
// };

// const closeButtonStyle: React.CSSProperties = {
//   position: "absolute",
//   top: "3.5rem",
//   right: "1rem",
//   background: "transparent",
//   border: "none",
//   color: "#64748b",
//   fontSize: "1.3rem",
//   cursor: "pointer",
//   zIndex: 12,
//   lineHeight: 1,
// };

// const formContainerStyle: React.CSSProperties = {
//   flex: 1,
//   padding: "2rem",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   color: "#333",
// };

// const contentWrapperStyle: React.CSSProperties = {
//   display: "flex",
//   flex: 1,
//   minHeight: 0,
// };

// const inputStyle: React.CSSProperties = {
//   padding: "0.75rem 1rem",
//   borderRadius: "0.5rem",
//   border: "1px solid #e2e8f0",
//   fontSize: "0.9rem",
//   outline: "none",
//   color: "#1e293b",
//   background: "#f8fafc",
//   transition: "border-color 0.2s",
// };

// export default PopupModal;





















// 'use client';
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface PopupModalProps {
//   show: boolean;
//   onClose: () => void;
// }

// const PopupModal: React.FC<PopupModalProps> = ({ show, onClose }) => {
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     document.body.style.overflow = show ? "hidden" : "auto";
//     return () => { document.body.style.overflow = "auto"; };
//   }, [show]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const res = await fetch("/api/sendEmail", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) throw new Error("Failed to send email");
//       const link = document.createElement("a");
//       link.href = "/Brochure_Royalnest_Dharamshala.pdf";
//       link.download = "Royalnest_Brochure";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong while sending email.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!show) return null;

//   const handleBannerClick = () => router.push("/royal-nest-dharamshala");

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle} className="popup-modal">

//         {/* ── BANNER ── */}
//         <div
//           className="popup-banner"
//           style={bannerStyle}
//           role="button"
//           tabIndex={0}
//           onClick={handleBannerClick}
//           onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleBannerClick(); }}
//           aria-label="Visit Royal Nest Forest View"
//         >
//           {/* SVG mountain + forest silhouette background */}
//           <svg
//             style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", opacity: 0.13, pointerEvents: "none" }}
//             viewBox="0 0 1000 80" preserveAspectRatio="xMidYMax slice"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {/* Mountain range */}
//             <path d="M0 80 L80 30 L140 55 L220 10 L300 50 L370 25 L440 60 L520 5 L600 45 L670 20 L750 55 L820 15 L900 50 L1000 30 L1000 80 Z" fill="white"/>
//             {/* Tree line */}
//             <path d="M0 80 L15 65 L25 72 L35 60 L50 70 L60 58 L75 68 L90 55 L105 65 L120 52 L135 63 L150 50 L165 62 L180 48 L195 60 L210 47 L230 58 L250 45 L270 57 L290 44 L310 56 L330 43 L350 55 L375 42 L400 54 L425 40 L450 53 L480 39 L510 52 L540 38 L570 51 L600 37 L630 50 L660 36 L690 49 L720 35 L750 48 L780 34 L810 47 L840 33 L870 46 L900 32 L930 45 L960 31 L990 44 L1000 80 Z" fill="white"/>
//           </svg>

//           {/* Warm sun-glow orb — top right */}
//           <div style={{
//             position: "absolute", top: "-18px", right: "80px",
//             width: "70px", height: "70px",
//             background: "radial-gradient(circle, rgba(255,210,100,0.35) 0%, transparent 70%)",
//             borderRadius: "50%", pointerEvents: "none",
//           }} />

//           {/* Left: location pin + property name */}
//           <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1, flexShrink: 0 }}>
//             {/* Pin icon */}
//             <div style={{
//               width: "30px", height: "30px", borderRadius: "50%",
//               background: "rgba(255,255,255,0.18)",
//               border: "1px solid rgba(255,255,255,0.35)",
//               display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//             }}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//                 <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.9)"/>
//                 <circle cx="12" cy="9" r="2.5" fill="rgba(134,239,172,1)"/>
//               </svg>
//             </div>
//             <div>
//               <div style={{
//                 fontSize: "clamp(11px, 2vw, 13px)", fontWeight: 700,
//                 color: "#fff", letterSpacing: "0.04em", lineHeight: 1.2,
//                 textShadow: "0 1px 4px rgba(0,0,0,0.3)",
//               }}>
//                 Royal Nest Forest View
//               </div>
//               <div style={{
//                 fontSize: "clamp(9px, 1.4vw, 10px)", color: "rgba(255,255,255,0.75)",
//                 letterSpacing: "0.06em", marginTop: "1px",
//               }}>
//                 🏔 Dharamshala, Himachal Pradesh
//               </div>
//             </div>
//           </div>

//           {/* Center: tagline — hidden on small screens via CSS */}
//           <div className="banner-tagline" style={{
//             flex: 1, textAlign: "center", position: "relative", zIndex: 1,
//           }}>
//             <span style={{
//               fontSize: "clamp(9px, 1.6vw, 11px)",
//               color: "rgba(255,255,255,0.6)",
//               letterSpacing: "0.18em",
//               textTransform: "uppercase",
//               fontWeight: 500,
//             }}>
//               Himalayan Living · 68 Limited Apartments
//             </span>
//           </div>

//           {/* Right: CTA button */}
//           <div className="banner-cta-btn" style={{
//             flexShrink: 0, position: "relative", zIndex: 1,
//             background: "rgba(255,255,255,0.18)",
//             border: "1px solid rgba(255,255,255,0.45)",
//             borderRadius: "24px",
//             padding: "6px 16px",
//             display: "flex", alignItems: "center", gap: "6px",
//             cursor: "pointer",
//             backdropFilter: "blur(4px)",
//           }}>
//             <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.06em" }}>
//               View Project
//             </span>
//             <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//               <path d="M2 5h6M6 3l2 2-2 2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//           </div>
//         </div>

//         {/* Close */}
//         <button onClick={onClose} style={closeButtonStyle} className="popup-close" aria-label="Close">
//           ✕
//         </button>

//         <div style={contentWrapperStyle}>
//           {/* Left: Image */}
//           <div className="popup-image" style={imageSectionStyle} />

//           {/* Right: Form */}
//           <div className="popup-form" style={formContainerStyle}>
//             <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "0.4rem", color: "#1e293b" }}>
//               Get the Brochure
//             </h2>
//             <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.2rem" }}>
//               Royal Nest — Instant Download
//             </p>
//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
//               <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
//               <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required style={inputStyle} />
//               <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required style={inputStyle} />
//               <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 style={{
//                   background: "#1e3a8a",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "0.5rem",
//                   padding: "0.85rem",
//                   fontSize: "0.95rem",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   opacity: isSubmitting ? 0.6 : 1,
//                   letterSpacing: "0.03em",
//                 }}
//               >
//                 {isSubmitting ? "Downloading…" : "Download Brochure →"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Banner gradient — forest morning light */
//         .popup-banner {
//           background: linear-gradient(105deg, #14532d 0%, #166534 30%, #15803d 60%, #4d7c0f 100%) !important;
//           transition: filter 0.25s ease;
//         }
//         .popup-banner:hover {
//           filter: brightness(1.06);
//         }
//         .banner-cta-btn {
//           transition: background 0.2s, transform 0.2s;
//         }
//         .popup-banner:hover .banner-cta-btn {
//           background: rgba(255,255,255,0.28) !important;
//           transform: translateX(2px);
//         }

//         .popup-close:hover {
//           background: rgba(0,0,0,0.08) !important;
//           color: #1e293b !important;
//         }

//         @media (max-width: 768px) {
//           .popup-modal {
//             flex-direction: column !important;
//             max-width: 92% !important;
//             max-height: 92vh !important;
//             height: auto !important;
//           }
//           .popup-image {
//             width: 100% !important;
//             height: 200px !important;
//             border-radius: 0 !important;
//             flex: none !important;
//           }
//           .popup-form {
//             padding: 1.4rem !important;
//           }
//           .banner-tagline {
//             display: none;
//           }
//         }

//         @media (min-width: 769px) and (max-width: 1024px) {
//           .popup-modal {
//             max-width: 95% !important;
//           }
//           .banner-tagline {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// const overlayStyle: React.CSSProperties = {
//   position: "fixed",
//   top: 0, left: 0,
//   width: "100vw", height: "100vh",
//   background: "rgba(0,0,0,0.65)",
//   zIndex: 10000,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   overflowY: "auto",
//   padding: "2rem",
// };

// const modalStyle: React.CSSProperties = {
//   position: "relative",
//   background: "white",
//   borderRadius: "1rem",
//   width: "100%",
//   maxWidth: "1000px",
//   maxHeight: "90vh",
//   overflow: "hidden",
//   display: "flex",
//   paddingTop: "3.2rem",
//   boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
// };

// const bannerStyle: React.CSSProperties = {
//   position: "absolute",
//   top: 0, left: 0,
//   width: "100%",
//   height: "3.2rem",
//   display: "flex",
//   alignItems: "center",
//   gap: "16px",
//   padding: "0 18px",
//   cursor: "pointer",
//   borderTopLeftRadius: "1rem",
//   borderTopRightRadius: "1rem",
//   zIndex: 11,
//   overflow: "hidden",
//   userSelect: "none",
// };

// const imageSectionStyle: React.CSSProperties = {
//   flex: 1,
//   backgroundImage: "url('/DHARAMSHALA,HP.png')",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   borderBottomLeftRadius: "1rem",
//   minHeight: "300px",
// };

// const closeButtonStyle: React.CSSProperties = {
//   position: "absolute",
//   top: "0.9rem",
//   right: "1rem",
//   background: "transparent",
//   border: "none",
//   color: "rgba(255,255,255,0.7)",
//   fontSize: "1.3rem",
//   cursor: "pointer",
//   zIndex: 12,
//   lineHeight: 1,
//   width: "26px",
//   height: "26px",
//   borderRadius: "50%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   transition: "background 0.15s, color 0.15s",
// };

// const formContainerStyle: React.CSSProperties = {
//   flex: 1,
//   padding: "2rem",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   color: "#333",
// };

// const contentWrapperStyle: React.CSSProperties = {
//   display: "flex",
//   flex: 1,
//   minHeight: 0,
// };

// const inputStyle: React.CSSProperties = {
//   padding: "0.75rem 1rem",
//   borderRadius: "0.5rem",
//   border: "1px solid #e2e8f0",
//   fontSize: "0.9rem",
//   outline: "none",
//   color: "#1e293b",
//   background: "#f8fafc",
//   transition: "border-color 0.2s",
// };

// export default PopupModal;





















'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PopupModalProps {
  show: boolean;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ show, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", city: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect mobile on mount and on resize — drives conditional rendering of image panel
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const link = document.createElement("a");
      link.href = "/Brochure_Royalnest_Dharamshala.pdf";
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

  const handleBannerClick = () => router.push("/royal-nest-dharamshala");

  return (
    <div style={overlayStyle}>
      <div
        style={{
          ...modalStyle,
          // On mobile: auto height, no overflow-hidden so form isn't clipped
          maxHeight: isMobile ? "92vh" : "90vh",
          overflowY: isMobile ? "auto" : "hidden",
          overflowX: "hidden",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "94vw" : "100%",
          maxWidth: isMobile ? "94vw" : "1000px",
        }}
        className="popup-modal"
      >
        {/* ── BANNER ── */}
        <div
          className="popup-banner"
          style={bannerStyle}
          role="button"
          tabIndex={0}
          onClick={handleBannerClick}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleBannerClick(); }}
          aria-label="Visit Royal Nest Dharamshala"
        >
          {/* SVG mountain + forest silhouette */}
          <svg
            style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", opacity: 0.13, pointerEvents: "none" }}
            viewBox="0 0 1000 80" preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 80 L80 30 L140 55 L220 10 L300 50 L370 25 L440 60 L520 5 L600 45 L670 20 L750 55 L820 15 L900 50 L1000 30 L1000 80 Z" fill="white"/>
            <path d="M0 80 L15 65 L25 72 L35 60 L50 70 L60 58 L75 68 L90 55 L105 65 L120 52 L135 63 L150 50 L165 62 L180 48 L195 60 L210 47 L230 58 L250 45 L270 57 L290 44 L310 56 L330 43 L350 55 L375 42 L400 54 L425 40 L450 53 L480 39 L510 52 L540 38 L570 51 L600 37 L630 50 L660 36 L690 49 L720 35 L750 48 L780 34 L810 47 L840 33 L870 46 L900 32 L930 45 L960 31 L990 44 L1000 80 Z" fill="white"/>
          </svg>

          {/* Sun-glow orb */}
          <div style={{
            position: "absolute", top: "-18px", right: "80px",
            width: "70px", height: "70px",
            background: "radial-gradient(circle, rgba(255,210,100,0.35) 0%, transparent 70%)",
            borderRadius: "50%", pointerEvents: "none",
          }} />

          {/* Left: pin + name */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1, flexShrink: 0 }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.9)"/>
                <circle cx="12" cy="9" r="2.5" fill="rgba(134,239,172,1)"/>
              </svg>
            </div>
            <div>
              <div style={{
                fontSize: "clamp(11px, 2vw, 13px)", fontWeight: 700,
                color: "#fff", letterSpacing: "0.04em", lineHeight: 1.2,
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              }}>
                Royal Nest Forest View
              </div>
              <div style={{
                fontSize: "clamp(9px, 1.4vw, 10px)", color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.06em", marginTop: "1px",
              }}>
                🏔 Dharamshala, Himachal Pradesh
              </div>
            </div>
          </div>

          {/* Center: tagline — hidden on mobile via isMobile */}
          {!isMobile && (
            <div style={{ flex: 1, textAlign: "center", position: "relative", zIndex: 1 }}>
              <span style={{
                fontSize: "clamp(9px, 1.6vw, 11px)",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}>
                Himalayan Living · 68 Limited Apartments
              </span>
            </div>
          )}

          {/* Right: View Project CTA */}
          <div className="banner-cta-btn" style={{
            flexShrink: 0, position: "relative", zIndex: 1,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.45)",
            borderRadius: "24px",
            padding: isMobile ? "5px 10px" : "6px 16px",
            display: "flex", alignItems: "center", gap: "6px",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            marginRight: "44px",
          }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.06em" }}>
              View Project
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M6 3l2 2-2 2" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── CLOSE BUTTON ── */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          style={closeButtonStyle}
          className="popup-close"
          aria-label="Close"
        >
          ✕
        </button>

        {/* ── CONTENT WRAPPER ── */}
        <div style={{
          display: "flex",
          flex: 1,
          flexDirection: isMobile ? "column" : "row",
          minHeight: 0,
          // On mobile let this grow naturally — no height constraint
          ...(isMobile ? {} : { overflow: "hidden" }),
        }}>
          {/* Image panel — hidden on mobile to give full space to form */}
          {!isMobile && (
            <div style={imageSectionStyle} />
          )}

          {/* Form panel */}
          <div style={{
            ...formContainerStyle,
            // On mobile: full width, looser padding, no justify-center so form starts at top
            flex: isMobile ? "none" : 1,
            width: isMobile ? "100%" : undefined,
            padding: isMobile ? "1.4rem 1.2rem 1.8rem" : "2rem",
            justifyContent: isMobile ? "flex-start" : "center",
          }}>
            <h2 style={{ fontSize: isMobile ? "1.2rem" : "1.4rem", fontWeight: "bold", marginBottom: "0.4rem", color: "#1e293b" }}>
              Get the Brochure
            </h2>
            <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1.2rem" }}>
              Royal Nest — Instant Download
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="text" name="name" placeholder="Full Name"
                value={formData.name} onChange={handleChange} required
                style={inputStyle}
              />
              <input
                type="email" name="email" placeholder="Email Address"
                value={formData.email} onChange={handleChange} required
                style={inputStyle}
              />
              <input
                type="tel" name="phone" placeholder="Phone Number"
                value={formData.phone} onChange={handleChange} required
                style={inputStyle}
              />
              <input
                type="text" name="city" placeholder="City"
                value={formData.city} onChange={handleChange}
                style={inputStyle}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: "#1e3a8a",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  padding: "0.85rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: isSubmitting ? 0.6 : 1,
                  letterSpacing: "0.03em",
                  marginTop: "0.25rem",
                }}
              >
                {isSubmitting ? "Downloading…" : "Download Brochure →"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .popup-banner {
          background: linear-gradient(105deg, #14532d 0%, #166534 30%, #15803d 60%, #4d7c0f 100%) !important;
          transition: filter 0.25s ease;
        }
        .popup-banner:hover {
          filter: brightness(1.06);
        }
        .banner-cta-btn {
          transition: background 0.2s, transform 0.2s;
        }
        .popup-banner:hover .banner-cta-btn {
          background: rgba(255,255,255,0.28) !important;
          transform: translateX(2px);
        }
        .popup-close:hover {
          background: rgba(255,255,255,0.2) !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

/* ── STATIC STYLES ── */

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0, left: 0,
  width: "100vw", height: "100vh",
  background: "rgba(0,0,0,0.65)",
  zIndex: 10000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
  padding: "1rem",
};

const modalStyle: React.CSSProperties = {
  position: "relative",
  background: "white",
  borderRadius: "1rem",
  width: "100%",
  paddingTop: "3.2rem",  // space for the absolute-positioned banner
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  display: "flex",
};

const bannerStyle: React.CSSProperties = {
  position: "absolute",
  top: 0, left: 0,
  width: "100%",
  height: "3.2rem",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "0 18px",
  cursor: "pointer",
  borderTopLeftRadius: "1rem",
  borderTopRightRadius: "1rem",
  zIndex: 11,
  overflow: "hidden",
  userSelect: "none",
};

const imageSectionStyle: React.CSSProperties = {
  flex: 1,
  backgroundImage: "url('/DHARAMSHALA,HP.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderBottomLeftRadius: "1rem",
  minHeight: "300px",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "0",
  right: "0",
  width: "3.2rem",
  height: "3.2rem",
  background: "transparent",
  border: "none",
  color: "rgba(255,255,255,0.85)",
  fontSize: "1rem",
  cursor: "pointer",
  zIndex: 13,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTopRightRadius: "1rem",
  transition: "background 0.15s, color 0.15s",
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
  padding: "0.75rem 1rem",
  borderRadius: "0.5rem",
  border: "1px solid #e2e8f0",
  fontSize: "0.9rem",
  outline: "none",
  color: "#1e293b",
  background: "#f8fafc",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

export default PopupModal;