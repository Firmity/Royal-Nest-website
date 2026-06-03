// "use client";

// import { useState, useEffect, useRef } from "react";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";

// const brochurePath = "/Brochure Royalnest Forest view Dharamshala.pdf";

// const images = [
//   "/dharamshala_images (3).webp",
//   "/dharamshala_images (1).webp",
//   "/dharamshala_images (4).webp",
//   "/dharamshala_images (2).webp",
//   "/dharamshala_images (5).webp",
// ];

// const amenities = [
//   { icon: "🌲", label: "Forest Facing" },
//   { icon: "🏔️", label: "Mountain View" },
//   { icon: "🧘", label: "Meditation Garden" },
//   { icon: "🚗", label: "Dedicated Parking" },
//   { icon: "🏋️", label: "Gym & TT Room" },
//   { icon: "📚", label: "Kids' Library" },
//   { icon: "🔒", label: "24×7 Security" },
//   { icon: "⚡", label: "Power Backup" },
//   { icon: "🌿", label: "Landscaped Garden" },
//   { icon: "📡", label: "WiFi Society" },
//   { icon: "🚒", label: "Fire Safety" },
//   { icon: "📹", label: "CCTV Surveillance" },
// ];

// const greenFeatures = [
//   "Earthquake Resistant RCC Structure",
//   "Large French Windows for natural ventilation",
//   "Solar Panel Integration",
//   "Rainwater Harvesting",
//   "Sewage Water Treatment",
//   "Smart Lights for Energy Saving",
//   "Sprinkler / Drip Irrigation",
//   "Waste Reduction & Composting",
// ];

// export default function RoyalNestDharamshalaPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [heroLoaded, setHeroLoaded] = useState(false);
//   const formRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setHeroLoaded(true);
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     const validationErrors: Record<string, string> = {};
//     if (!formData.firstName.trim()) validationErrors.firstName = "First name is required.";
//     if (!formData.lastName.trim()) validationErrors.lastName = "Last name is required.";
//     if (!formData.email.trim()) {
//       validationErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       validationErrors.email = "Enter a valid email.";
//     }
//     if (!formData.phone.trim()) {
//       validationErrors.phone = "Phone number is required.";
//     } else if (!/^[\+]?[0-9]{7,15}$/.test(formData.phone.replace(/\s/g, ""))) {
//       validationErrors.phone = "Enter a valid phone number.";
//     }
//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           city: "Dharamshala",
//         }),
//       });
//       if (!response.ok) throw new Error("Failed to submit.");
//       setIsSubmitted(true);
//       setFormData({ firstName: "", lastName: "", email: "", phone: "" });
//       const link = document.createElement("a");
//       link.href = encodeURI(brochurePath);
//       link.download = "Royalnest_Forest_View_Dharamshala_Brochure.pdf";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch {
//       alert("Something went wrong. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const scrollToForm = () => {
//     formRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="bg-white min-h-screen" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
//       <Navbar />

//       {/* ── HERO CAROUSEL ── */}
//       <section className="relative w-full h-screen overflow-hidden">
//         {images.map((src, i) => (
//           <div
//             key={src}
//             className="absolute inset-0 transition-opacity duration-1000"
//             style={{ opacity: i === activeSlide ? 1 : 0 }}
//           >
//             <Image
//               src={src}
//               alt={`Royal Nest Dharamshala ${i + 1}`}
//               fill
//               className="object-cover"
//               priority={i === 0}
//             />
//           </div>
//         ))}

//         {/* Dark gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

//         {/* Hero copy */}
//         <div
//           className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center"
//           style={{
//             opacity: heroLoaded ? 1 : 0,
//             transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
//             transition: "opacity 1.2s ease, transform 1.2s ease",
//           }}
//         >
//           <p
//             className="text-white/70 text-xs sm:text-sm tracking-[0.35em] uppercase mb-3"
//             style={{ fontFamily: "'Arial', sans-serif", letterSpacing: "0.3em" }}
//           >
//             Himachal TCP Approved · RERA No. HPRERAKAN2023036/P
//           </p>
//           <h1
//             className="text-white text-5xl sm:text-7xl font-bold mb-3 leading-tight"
//             style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
//           >
//             Forest View
//           </h1>
//           <h2
//             className="text-white/90 text-2xl sm:text-3xl font-normal mb-2"
//             style={{ letterSpacing: "0.08em" }}
//           >
//             Apartments
//           </h2>
//           <p className="text-white/70 text-base sm:text-lg mb-8" style={{ fontFamily: "'Arial', sans-serif" }}>
//             Shiv Nagar, Dharamshala, Himachal Pradesh
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={scrollToForm}
//               className="px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 hover:scale-105 text-sm tracking-wide"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               Download Brochure
//             </button>
//             <a
//               href="tel:+919289349995"
//               className="px-8 py-3.5 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200 text-sm tracking-wide"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               Call Us
//             </a>
//           </div>
//         </div>

//         {/* Slide indicators */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//           {images.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveSlide(i)}
//               className="transition-all duration-300 rounded-full"
//               style={{
//                 width: i === activeSlide ? "24px" : "8px",
//                 height: "8px",
//                 background: i === activeSlide ? "white" : "rgba(255,255,255,0.4)",
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* ── STATS STRIP ── */}
//       <section className="bg-slate-900 text-white py-10 px-6">
//         <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
//           {[
//             { val: "68", unit: "Apts", label: "Limited Edition Units" },
//             { val: "25+", unit: "Yrs", label: "Developer Experience" },
//             { val: "8M+", unit: "sqft", label: "Delivered Projects" },
//             { val: "5", unit: "km", label: "From Dharamshala Market" },
//           ].map(({ val, unit, label }) => (
//             <div key={label}>
//               <div className="text-3xl sm:text-4xl font-bold">
//                 {val} <span className="text-green-400 text-xl">{unit}</span>
//               </div>
//               <div
//                 className="text-slate-400 text-xs mt-1 uppercase tracking-wider"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 {label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── ABOUT SECTION ── */}
//       <section className="py-20 px-6 max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-14 items-center">
//           <div>
//             <p
//               className="text-green-700 text-xs uppercase tracking-[0.3em] mb-4"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               About the Project
//             </p>
//             <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
//               Where the<br />Himalayas<br />are your<br />backyard.
//             </h2>
//             <p className="text-slate-600 leading-8 text-base mb-5" style={{ fontFamily: "'Arial', sans-serif" }}>
//               This limited-edition project consists of <strong>68 fully furnished apartments</strong> nestled
//               next to ancient forest land — home to over 500 species of indigenous trees — offering
//               stunning views of the Dhauladhar Matterhorn mountains.
//             </p>
//             <p className="text-slate-600 leading-8 text-base mb-8" style={{ fontFamily: "'Arial', sans-serif" }}>
//               Just 5 km from the Dharamshala market and half a kilometre from the renowned herbal
//               cancer hospital, the project provides a peaceful environment, free from tourist
//               congestion. Wake up to birdsong, breathe forest air, gaze at snow peaks — every day.
//             </p>
//             <div className="flex flex-wrap gap-3">
//               {["Tower A", "Tower B", "1 BHK • 951 sq.ft.", "2 BHK • 1321 sq.ft."].map((tag) => (
//                 <span
//                   key={tag}
//                   className="px-4 py-1.5 border border-slate-300 text-slate-700 rounded-full text-sm"
//                   style={{ fontFamily: "'Arial', sans-serif" }}
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="relative">
//             <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
//               <Image
//                 src="/dharamshala_images (3).webp"
//                 alt="Aerial view of Royal Nest Dharamshala"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             {/* RERA badge */}
//             <div
//               className="absolute -bottom-5 -left-5 bg-green-700 text-white px-5 py-4 rounded-2xl shadow-lg text-xs"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               <div className="font-bold text-sm mb-0.5">HP TCP Approved</div>
//               <div className="text-green-200">RERA: HPRERAKAN2023036/P</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── IMAGE GALLERY STRIP ── */}
//       <section className="py-6 px-6">
//         <div className="grid grid-cols-3 gap-3 max-w-6xl mx-auto">
//           {[images[1], images[3], images[4]].map((src, i) => (
//             <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
//               <Image
//                 src={src}
//                 alt={`Royal Nest Dharamshala view ${i + 2}`}
//                 fill
//                 className="object-cover group-hover:scale-105 transition-transform duration-700"
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── AMENITIES ── */}
//       <section className="py-20 px-6 bg-slate-50">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <p
//               className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               Life at Forest View
//             </p>
//             <h2 className="text-4xl font-bold text-slate-900">World-Class Amenities</h2>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//             {amenities.map(({ icon, label }) => (
//               <div
//                 key={label}
//                 className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="text-3xl mb-2">{icon}</div>
//                 <div
//                   className="text-slate-700 text-sm font-medium"
//                   style={{ fontFamily: "'Arial', sans-serif" }}
//                 >
//                   {label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── GREEN CONSTRUCTION ── */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
//           <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
//             <Image
//               src="/dharamshala_images (4).webp"
//               alt="Sustainable construction"
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent" />
//             <div className="absolute bottom-6 left-6 text-white">
//               <div className="text-lg font-bold">Sustainable by Design</div>
//               <div
//                 className="text-green-200 text-sm"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 Built for generations
//               </div>
//             </div>
//           </div>
//           <div className="order-1 lg:order-2">
//             <p
//               className="text-green-700 text-xs uppercase tracking-[0.3em] mb-4"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               Sustainable & Green Construction
//             </p>
//             <h2 className="text-4xl font-bold text-slate-900 mb-8">
//               A home that respects nature
//             </h2>
//             <ul className="space-y-3">
//               {greenFeatures.map((feat) => (
//                 <li key={feat} className="flex items-start gap-3">
//                   <span className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs flex-shrink-0">
//                     ✓
//                   </span>
//                   <span
//                     className="text-slate-600 text-sm"
//                     style={{ fontFamily: "'Arial', sans-serif" }}
//                   >
//                     {feat}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* ── UNIT SIZES ── */}
//       <section className="py-20 px-6 bg-slate-900 text-white">
//         <div className="max-w-4xl mx-auto text-center mb-12">
//           <p
//             className="text-green-400 text-xs uppercase tracking-[0.3em] mb-3"
//             style={{ fontFamily: "'Arial', sans-serif" }}
//           >
//             Floor Plans
//           </p>
//           <h2 className="text-4xl font-bold">Choose Your Space</h2>
//         </div>
//         <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-8">
//           {[
//             {
//               type: "1 BHK",
//               area: "951 sq.ft.",
//               tower: "Tower A",
//               details: [
//                 { k: "Covered Area", v: "741.64 sq.ft." },
//                 { k: "Carpet Area", v: "521.09 sq.ft." },
//                 { k: "Balcony Area", v: "179.97 sq.ft." },
//               ],
//             },
//             {
//               type: "2 BHK",
//               area: "1321 sq.ft.",
//               tower: "Tower A",
//               details: [
//                 { k: "Covered Area", v: "1056.83 sq.ft." },
//                 { k: "Carpet Area", v: "775.38 sq.ft." },
//                 { k: "Balcony Area", v: "216.84 sq.ft." },
//               ],
//             },
//           ].map(({ type, area, tower, details }) => (
//             <div key={type} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
//               <div
//                 className="text-green-400 text-xs uppercase tracking-widest mb-2"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 {tower}
//               </div>
//               <div className="text-3xl font-bold mb-1">{type}</div>
//               <div
//                 className="text-white/60 text-sm mb-6"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 Super Area: {area}
//               </div>
//               <div className="space-y-2">
//                 {details.map(({ k, v }) => (
//                   <div key={k} className="flex justify-between text-sm">
//                     <span
//                       className="text-white/50"
//                       style={{ fontFamily: "'Arial', sans-serif" }}
//                     >
//                       {k}
//                     </span>
//                     <span
//                       className="text-white font-medium"
//                       style={{ fontFamily: "'Arial', sans-serif" }}
//                     >
//                       {v}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={scrollToForm}
//                 className="mt-6 w-full py-2.5 border border-green-400 text-green-400 rounded-full text-sm hover:bg-green-400 hover:text-slate-900 transition-all duration-200"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 Get Price Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── LOCATION ── */}
//       <section className="py-20 px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <p
//               className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               Location Advantage
//             </p>
//             <h2 className="text-4xl font-bold text-slate-900">
//               Shiv Nagar, Dharamshala
//             </h2>
//             <p
//               className="text-slate-500 mt-3 text-sm"
//               style={{ fontFamily: "'Arial', sans-serif" }}
//             >
//               MDR 45 / Kangra–Pathankot Road
//             </p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {[
//               { dist: "5 km", place: "Dharamshala Market" },
//               { dist: "0.5 km", place: "Herbal Cancer Hospital" },
//               { dist: "Next to", place: "500+ Species Forest" },
//               { dist: "Views of", place: "Dhauladhar Mountains" },
//             ].map(({ dist, place }) => (
//               <div
//                 key={place}
//                 className="border border-slate-200 rounded-2xl p-6 text-center hover:border-green-300 hover:bg-green-50 transition-colors"
//               >
//                 <div className="text-xl font-bold text-slate-900 mb-1">{dist}</div>
//                 <div
//                   className="text-slate-500 text-sm"
//                   style={{ fontFamily: "'Arial', sans-serif" }}
//                 >
//                   {place}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── BROCHURE DOWNLOAD FORM ── */}
//       <section ref={formRef} className="py-20 px-6 bg-slate-50">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
//             {/* Left info */}
//             <div>
//               <p
//                 className="text-green-700 text-xs uppercase tracking-[0.3em] mb-4"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 Get the Full Picture
//               </p>
//               <h2 className="text-4xl font-bold text-slate-900 mb-5 leading-tight">
//                 Download the<br />Official Brochure
//               </h2>
//               <p
//                 className="text-slate-600 leading-7 text-sm mb-8"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 Get access to the master plan, detailed floor plans, pricing, and
//                 everything you need to make the right decision — instantly after
//                 submitting your details.
//               </p>
//               <div className="relative rounded-2xl overflow-hidden h-[320px] shadow-lg">
//                 <Image
//                   src="/dharamshala_images (1).webp"
//                   alt="Sunset view of Royal Nest Dharamshala"
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <div className="absolute bottom-5 left-5 text-white">
//                   <div className="text-base font-semibold">Limited Edition</div>
//                   <div
//                     className="text-white/70 text-sm"
//                     style={{ fontFamily: "'Arial', sans-serif" }}
//                   >
//                     68 Fully Furnished Apartments
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right form */}
//             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
//               <h3 className="text-xl font-bold text-slate-900 mb-1">Request Brochure</h3>
//               <p
//                 className="text-slate-500 text-sm mb-6"
//                 style={{ fontFamily: "'Arial', sans-serif" }}
//               >
//                 Fill in your details and the brochure will download instantly.
//               </p>

//               {isSubmitted && (
//                 <div
//                   className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 text-sm"
//                   style={{ fontFamily: "'Arial', sans-serif" }}
//                 >
//                   ✓ Thank you! Your brochure is downloading now.
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label
//                       className="block text-xs font-medium text-slate-600 mb-1.5"
//                       htmlFor="firstName"
//                       style={{ fontFamily: "'Arial', sans-serif" }}
//                     >
//                       First Name
//                     </label>
//                     <input
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                       placeholder="Arjun"
//                     />
//                     {errors.firstName && (
//                       <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
//                     )}
//                   </div>
//                   <div>
//                     <label
//                       className="block text-xs font-medium text-slate-600 mb-1.5"
//                       htmlFor="lastName"
//                       style={{ fontFamily: "'Arial', sans-serif" }}
//                     >
//                       Last Name
//                     </label>
//                     <input
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                       placeholder="Sharma"
//                     />
//                     {errors.lastName && (
//                       <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label
//                     className="block text-xs font-medium text-slate-600 mb-1.5"
//                     htmlFor="email"
//                     style={{ fontFamily: "'Arial', sans-serif" }}
//                   >
//                     Email Address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                     placeholder="you@example.com"
//                   />
//                   {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
//                 </div>

//                 <div>
//                   <label
//                     className="block text-xs font-medium text-slate-600 mb-1.5"
//                     htmlFor="phone"
//                     style={{ fontFamily: "'Arial', sans-serif" }}
//                   >
//                     Phone Number
//                   </label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                     placeholder="+91 98765 43210"
//                   />
//                   {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full rounded-xl bg-slate-900 px-5 py-3.5 text-white text-sm font-semibold hover:bg-green-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
//                   style={{ fontFamily: "'Arial', sans-serif" }}
//                 >
//                   {isSubmitting ? "Sending…" : "Download Brochure →"}
//                 </button>

//                 <p
//                   className="text-center text-slate-400 text-xs"
//                   style={{ fontFamily: "'Arial', sans-serif" }}
//                 >
//                   Your details are sent securely to{" "}
//                   <span className="text-slate-600">info@royalnestgroup.com</span>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER CTA ── */}
//       <section className="py-12 px-6 bg-slate-900 text-white text-center">
//         <p
//           className="text-slate-400 text-xs uppercase tracking-widest mb-2"
//           style={{ fontFamily: "'Arial', sans-serif" }}
//         >
//           Royal Nest Group
//         </p>
//         <p
//           className="text-slate-300 text-sm"
//           style={{ fontFamily: "'Arial', sans-serif" }}
//         >
//           info@royalnestgroup.com · +91 92893 49995
//         </p>
//       </section>
//     </div>
//   );
// }






























// "use client";

// import { useState, useEffect, useRef } from "react";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";

// const brochurePath = "/Brochure Royalnest Forest view Dharamshala.pdf";

// // Image (2) is now FIRST in the carousel and used next to the form
// const images = [
//   "/dharamshala_images (2).webp",
//   "/dharamshala_images (3).webp",
//   "/dharamshala_images (1).webp",
//   "/dharamshala_images (4).webp",
//   "/dharamshala_images (5).webp",
// ];

// const amenities = [
//   { icon: "🌲", label: "Forest Facing" },
//   { icon: "🏔️", label: "Mountain View" },
//   { icon: "🧘", label: "Meditation Garden" },
//   { icon: "🚗", label: "Dedicated Parking" },
//   { icon: "🏋️", label: "Gym & TT Room" },
//   { icon: "📚", label: "Kids' Library" },
//   { icon: "🔒", label: "24×7 Security" },
//   { icon: "⚡", label: "Power Backup" },
//   { icon: "🌿", label: "Landscaped Garden" },
//   { icon: "📡", label: "WiFi Society" },
//   { icon: "🚒", label: "Fire Safety" },
//   { icon: "📹", label: "CCTV Surveillance" },
// ];

// const greenFeatures = [
//   "Earthquake Resistant RCC Structure",
//   "Large French Windows for natural ventilation",
//   "Solar Panel Integration",
//   "Rainwater Harvesting",
//   "Sewage Water Treatment",
//   "Smart Lights for Energy Saving",
//   "Sprinkler / Drip Irrigation",
//   "Waste Reduction & Composting",
// ];

// export default function RoyalNestDharamshalaPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [heroLoaded, setHeroLoaded] = useState(false);
//   const formRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setHeroLoaded(true);
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validateForm = () => {
//     const validationErrors: Record<string, string> = {};
//     if (!formData.firstName.trim()) validationErrors.firstName = "First name is required.";
//     if (!formData.lastName.trim()) validationErrors.lastName = "Last name is required.";
//     if (!formData.email.trim()) {
//       validationErrors.email = "Email is required.";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       validationErrors.email = "Enter a valid email.";
//     }
//     if (!formData.phone.trim()) {
//       validationErrors.phone = "Phone number is required.";
//     } else if (!/^[\+]?[0-9]{7,15}$/.test(formData.phone.replace(/\s/g, ""))) {
//       validationErrors.phone = "Enter a valid phone number.";
//     }
//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           city: "Dharamshala",
//         }),
//       });
//       if (!response.ok) throw new Error("Failed to submit.");
//       setIsSubmitted(true);
//       setFormData({ firstName: "", lastName: "", email: "", phone: "" });
//       const link = document.createElement("a");
//       link.href = encodeURI(brochurePath);
//       link.download = "Royalnest_Forest_View_Dharamshala_Brochure.pdf";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch {
//       alert("Something went wrong. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const scrollToForm = () => {
//     formRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     // ── font matches site default (Geist Sans via CSS variable) ──
//     <div className="bg-white min-h-screen">
//       <Navbar />

//       {/* ── HERO CAROUSEL ── */}
//       <section className="relative w-full h-screen overflow-hidden">
//         {images.map((src, i) => (
//           <div
//             key={src}
//             className="absolute inset-0 transition-opacity duration-1000"
//             style={{ opacity: i === activeSlide ? 1 : 0 }}
//           >
//             <Image
//               src={src}
//               alt={`Royal Nest Dharamshala ${i + 1}`}
//               fill
//               className="object-cover"
//               priority={i === 0}
//             />
//           </div>
//         ))}

//         {/* Stronger dark overlay so text is always readable */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />

//         {/* Hero copy */}
//         <div
//           className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-center"
//           style={{
//             opacity: heroLoaded ? 1 : 0,
//             transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
//             transition: "opacity 1.2s ease, transform 1.2s ease",
//           }}
//         >
//           {/* RERA badge — purple accent matching Royal Nest brand */}
//           <p className="text-white/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 drop-shadow-md">
//             Himachal TCP Approved · RERA No. HPRERAKAN2023036/P
//           </p>

//           {/* Main headline — white, bold, strong text-shadow */}
//           <h1
//             className="text-white text-5xl sm:text-7xl font-bold mb-2 leading-tight drop-shadow-lg"
//             style={{ textShadow: "0 3px 24px rgba(0,0,0,0.7)" }}
//           >
//             Forest View
//           </h1>

//           {/* Sub — uses brand purple/teal accent from the logo palette */}
//           <h2
//             className="text-[#7ec8e3] text-2xl sm:text-3xl font-semibold mb-2 drop-shadow-md"
//             style={{ letterSpacing: "0.1em", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
//           >
//             Apartments
//           </h2>

//           <p className="text-white/80 text-base sm:text-lg mb-8 drop-shadow-md">
//             Shiv Nagar, Dharamshala, Himachal Pradesh
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={scrollToForm}
//               className="px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 hover:scale-105 text-sm tracking-wide shadow-lg"
//             >
//               Download Brochure
//             </button>
//             <a
//               href="tel:+919289349995"
//               className="px-8 py-3.5 border-2 border-white/80 text-white font-semibold rounded-full hover:bg-white/15 transition-all duration-200 text-sm tracking-wide shadow-md"
//             >
//               Call Us
//             </a>
//           </div>
//         </div>

//         {/* Slide indicators */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//           {images.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveSlide(i)}
//               className="transition-all duration-300 rounded-full"
//               style={{
//                 width: i === activeSlide ? "24px" : "8px",
//                 height: "8px",
//                 background: i === activeSlide ? "white" : "rgba(255,255,255,0.4)",
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* ── STATS STRIP ── */}
//       <section className="bg-slate-900 text-white py-10 px-6">
//         <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
//           {[
//             { val: "68", unit: "Apts", label: "Limited Edition Units" },
//             { val: "25+", unit: "Yrs", label: "Developer Experience" },
//             { val: "8M+", unit: "sqft", label: "Delivered Projects" },
//             { val: "5", unit: "km", label: "From Dharamshala Market" },
//           ].map(({ val, unit, label }) => (
//             <div key={label}>
//               <div className="text-3xl sm:text-4xl font-bold">
//                 {val} <span className="text-[#7ec8e3] text-xl">{unit}</span>
//               </div>
//               <div className="text-slate-400 text-xs mt-1 uppercase tracking-wider">
//                 {label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── ABOUT SECTION ── */}
//       <section className="py-20 px-6 max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-14 items-center">
//           <div>
//             <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-4">
//               About the Project
//             </p>
//             <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
//               Where the<br />Himalayas<br />are your<br />backyard.
//             </h2>
//             <p className="text-slate-600 leading-8 text-base mb-5">
//               This limited-edition project consists of <strong>68 fully furnished apartments</strong> nestled
//               next to ancient forest land — home to over 500 species of indigenous trees — offering
//               stunning views of the Dhauladhar Matterhorn mountains.
//             </p>
//             <p className="text-slate-600 leading-8 text-base mb-8">
//               Just 5 km from the Dharamshala market and half a kilometre from the renowned herbal
//               cancer hospital, the project provides a peaceful environment, free from tourist
//               congestion. Wake up to birdsong, breathe forest air, gaze at snow peaks — every day.
//             </p>
//             <div className="flex flex-wrap gap-3">
//               {["Tower A", "Tower B", "1 BHK · 951 sq.ft.", "2 BHK · 1321 sq.ft."].map((tag) => (
//                 <span
//                   key={tag}
//                   className="px-4 py-1.5 border border-slate-300 text-slate-700 rounded-full text-sm"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="relative">
//             <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
//               <Image
//                 src="/dharamshala_images (3).webp"
//                 alt="Aerial view of Royal Nest Dharamshala"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="absolute -bottom-5 -left-5 bg-green-700 text-white px-5 py-4 rounded-2xl shadow-lg text-xs">
//               <div className="font-bold text-sm mb-0.5">HP TCP Approved</div>
//               <div className="text-green-200">RERA: HPRERAKAN2023036/P</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── IMAGE GALLERY STRIP ── */}
//       <section className="py-6 px-6">
//         <div className="grid grid-cols-3 gap-3 max-w-6xl mx-auto">
//           {["/dharamshala_images (1).webp", "/dharamshala_images (4).webp", "/dharamshala_images (5).webp"].map((src, i) => (
//             <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
//               <Image
//                 src={src}
//                 alt={`Royal Nest Dharamshala view ${i + 2}`}
//                 fill
//                 className="object-cover group-hover:scale-105 transition-transform duration-700"
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── AMENITIES ── */}
//       <section className="py-20 px-6 bg-slate-50">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3">
//               Life at Forest View
//             </p>
//             <h2 className="text-4xl font-bold text-slate-900">World-Class Amenities</h2>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
//             {amenities.map(({ icon, label }) => (
//               <div
//                 key={label}
//                 className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="text-3xl mb-2">{icon}</div>
//                 <div className="text-slate-700 text-sm font-medium">{label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── GREEN CONSTRUCTION ── */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
//           <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
//             <Image
//               src="/dharamshala_images (4).webp"
//               alt="Sustainable construction"
//               fill
//               className="object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent" />
//             <div className="absolute bottom-6 left-6 text-white">
//               <div className="text-lg font-bold">Sustainable by Design</div>
//               <div className="text-green-200 text-sm">Built for generations</div>
//             </div>
//           </div>
//           <div className="order-1 lg:order-2">
//             <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-4">
//               Sustainable & Green Construction
//             </p>
//             <h2 className="text-4xl font-bold text-slate-900 mb-8">
//               A home that respects nature
//             </h2>
//             <ul className="space-y-3">
//               {greenFeatures.map((feat) => (
//                 <li key={feat} className="flex items-start gap-3">
//                   <span className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs flex-shrink-0">
//                     ✓
//                   </span>
//                   <span className="text-slate-600 text-sm">{feat}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* ── UNIT SIZES ── */}
//       <section className="py-20 px-6 bg-slate-900 text-white">
//         <div className="max-w-4xl mx-auto text-center mb-12">
//           <p className="text-[#7ec8e3] text-xs uppercase tracking-[0.3em] mb-3">
//             Floor Plans
//           </p>
//           <h2 className="text-4xl font-bold">Choose Your Space</h2>
//         </div>
//         <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-8">
//           {[
//             {
//               type: "1 BHK",
//               area: "951 sq.ft.",
//               tower: "Tower A",
//               details: [
//                 { k: "Covered Area", v: "741.64 sq.ft." },
//                 { k: "Carpet Area", v: "521.09 sq.ft." },
//                 { k: "Balcony Area", v: "179.97 sq.ft." },
//               ],
//             },
//             {
//               type: "2 BHK",
//               area: "1321 sq.ft.",
//               tower: "Tower A",
//               details: [
//                 { k: "Covered Area", v: "1056.83 sq.ft." },
//                 { k: "Carpet Area", v: "775.38 sq.ft." },
//                 { k: "Balcony Area", v: "216.84 sq.ft." },
//               ],
//             },
//           ].map(({ type, area, tower, details }) => (
//             <div key={type} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors">
//               <div className="text-[#7ec8e3] text-xs uppercase tracking-widest mb-2">{tower}</div>
//               <div className="text-3xl font-bold mb-1">{type}</div>
//               <div className="text-white/60 text-sm mb-6">Super Area: {area}</div>
//               <div className="space-y-2">
//                 {details.map(({ k, v }) => (
//                   <div key={k} className="flex justify-between text-sm">
//                     <span className="text-white/50">{k}</span>
//                     <span className="text-white font-medium">{v}</span>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={scrollToForm}
//                 className="mt-6 w-full py-2.5 border border-[#7ec8e3] text-[#7ec8e3] rounded-full text-sm hover:bg-[#7ec8e3] hover:text-slate-900 transition-all duration-200"
//               >
//                 Get Price Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── LOCATION ── */}
//       <section className="py-20 px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-12">
//             <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3">
//               Location Advantage
//             </p>
//             <h2 className="text-4xl font-bold text-slate-900">Shiv Nagar, Dharamshala</h2>
//             <p className="text-slate-500 mt-3 text-sm">MDR 45 / Kangra–Pathankot Road</p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {[
//               { dist: "5 km", place: "Dharamshala Market" },
//               { dist: "0.5 km", place: "Herbal Cancer Hospital" },
//               { dist: "Next to", place: "500+ Species Forest" },
//               { dist: "Views of", place: "Dhauladhar Mountains" },
//             ].map(({ dist, place }) => (
//               <div
//                 key={place}
//                 className="border border-slate-200 rounded-2xl p-6 text-center hover:border-green-300 hover:bg-green-50 transition-colors"
//               >
//                 <div className="text-xl font-bold text-slate-900 mb-1">{dist}</div>
//                 <div className="text-slate-500 text-sm">{place}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── BROCHURE DOWNLOAD FORM ── */}
//       <section ref={formRef} className="py-20 px-6 bg-slate-50">
//         <div className="max-w-5xl mx-auto">
//           {/* Two-column: image LEFT, form RIGHT — both fixed height so they align */}
//           <div className="grid lg:grid-cols-2 gap-10 items-stretch">

//             {/* Left: stacked heading + image */}
//             <div className="flex flex-col">
//               <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-4">
//                 Get the Full Picture
//               </p>
//               <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
//                 Download the<br />Official Brochure
//               </h2>
//               <p className="text-slate-600 leading-7 text-sm mb-6">
//                 Get access to the master plan, detailed floor plans, pricing, and
//                 everything you need to make the right decision — instantly after
//                 submitting your details.
//               </p>
//               {/* Image fills remaining space */}
//               <div className="relative flex-1 min-h-[260px] rounded-2xl overflow-hidden shadow-lg">
//                 <Image
//                   src="/dharamshala_images (2).webp"
//                   alt="Royal Nest Dharamshala mountain view"
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <div className="absolute bottom-5 left-5 text-white">
//                   <div className="text-base font-semibold">Limited Edition</div>
//                   <div className="text-white/70 text-sm">68 Fully Furnished Apartments</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right: form card — self-stretch so it matches the left column height */}
//             <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm self-stretch">
//               <h3 className="text-xl font-bold text-slate-900 mb-1">Request Brochure</h3>
//               <p className="text-slate-500 text-sm mb-6">
//                 Fill in your details and the brochure will download instantly.
//               </p>

//               {isSubmitted && (
//                 <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 text-sm">
//                   ✓ Thank you! Your brochure is downloading now.
//                 </div>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="firstName">
//                       First Name
//                     </label>
//                     <input
//                       id="firstName"
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                       placeholder="Arjun"
//                     />
//                     {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="lastName">
//                       Last Name
//                     </label>
//                     <input
//                       id="lastName"
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                       placeholder="Sharma"
//                     />
//                     {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="email">
//                     Email Address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                     placeholder="you@example.com"
//                   />
//                   {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="phone">
//                     Phone Number
//                   </label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
//                     placeholder="+91 98765 43210"
//                   />
//                   {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full rounded-xl bg-slate-900 px-5 py-3.5 text-white text-sm font-semibold hover:bg-green-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Sending…" : "Download Brochure →"}
//                 </button>

//                 <p className="text-center text-slate-400 text-xs">
//                   Your details are sent securely to{" "}
//                   <span className="text-slate-600">info@royalnestgroup.com</span>
//                 </p>
//               </form>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER CTA ── */}
//       <section className="py-12 px-6 bg-slate-900 text-white text-center">
//         <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
//           Royal Nest Group
//         </p>
//         <p className="text-slate-300 text-sm">
//           info@royalnestgroup.com · +91 92893 49995
//         </p>
//       </section>
//     </div>
//   );
// }





















"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const brochurePath = "/Brochure Royalnest Forest view Dharamshala.pdf";

const images = [
  "/dharamshala_images (2).webp",
  "/dharamshala_images (3).webp",
  "/dharamshala_images (1).webp",
  "/dharamshala_images (4).webp",
  "/dharamshala_images (5).webp",
];

const IconTree = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M12 22v-7"/><path d="M9 7 3 13h4l-3 4h5v-3h6v3h5l-3-4h4L16 7H8z" strokeWidth="1.5"/>
  </svg>
);
const IconMountain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
  </svg>
);
const IconMeditation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="12" cy="4" r="1.5"/><path d="M8 9h8M7 21c1-4 2-6 5-6s4 2 5 6"/><path d="M5 14c2-1 4-1.5 7-1.5S19 13 21 14"/>
  </svg>
);
const IconParking = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
  </svg>
);
const IconGym = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M6 4v16M18 4v16M4 8h4M16 8h4M4 16h4M16 16h4M8 12h8"/>
  </svg>
);
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);
const IconWifi = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="#06b6d4"/>
  </svg>
);
const IconFire = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-1.12-1-2-2-3.5-.55.9-1.5 1.5-2.5 2-.75.38-1 1-1 1.5z"/><path d="M12 22c4.97 0 9-4.03 9-9 0-2.93-1.4-5.53-3.56-7.19C16.83 7.42 16 9.15 16 11c0-4-2.5-7-6-8-.5 3-2 5-3 6C5.4 10.62 3 13.54 3 17c0 2.76 2.24 5 5 5z"/>
  </svg>
);
const IconCamera = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const amenities = [
  { icon: <IconTree />,       label: "Forest Facing" },
  { icon: <IconMountain />,   label: "Mountain View" },
  { icon: <IconMeditation />, label: "Meditation Garden" },
  { icon: <IconParking />,    label: "Dedicated Parking" },
  { icon: <IconGym />,        label: "Gym & TT Room" },
  { icon: <IconBook />,       label: "Kids' Library" },
  { icon: <IconShield />,     label: "24×7 Security" },
  { icon: <IconBolt />,       label: "Power Backup" },
  { icon: <IconLeaf />,       label: "Landscaped Garden" },
  { icon: <IconWifi />,       label: "WiFi Society" },
  { icon: <IconFire />,       label: "Fire Safety" },
  { icon: <IconCamera />,     label: "CCTV Surveillance" },
];

const greenFeatures = [
  "Earthquake Resistant RCC Structure",
  "Large French Windows for natural ventilation",
  "Solar Panel Integration",
  "Rainwater Harvesting",
  "Sewage Water Treatment",
  "Smart Lights for Energy Saving",
  "Sprinkler / Drip Irrigation",
  "Waste Reduction & Composting",
];

export default function RoyalNestDharamshalaPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroLoaded(true);
    const interval = setInterval(() => setActiveSlide((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const v: Record<string, string> = {};
    if (!formData.firstName.trim()) v.firstName = "First name is required.";
    if (!formData.lastName.trim()) v.lastName = "Last name is required.";
    if (!formData.email.trim()) v.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) v.email = "Enter a valid email.";
    if (!formData.phone.trim()) v.phone = "Phone number is required.";
    else if (!/^[\+]?[0-9]{7,15}$/.test(formData.phone.replace(/\s/g, ""))) v.phone = "Enter a valid phone number.";
    setErrors(v);
    return Object.keys(v).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, city: "Dharamshala" }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      const a = document.createElement("a");
      a.href = encodeURI(brochurePath);
      a.download = "Royalnest_Forest_View_Dharamshala_Brochure.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ── HERO CAROUSEL ── */}
      <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
        {images.map((src, i) => (
          <div key={src} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === activeSlide ? 1 : 0 }}>
            <Image src={src} alt={`Royal Nest Forest View ${i + 1}`} fill className="object-cover" priority={i === 0} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        <div
          className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-4 text-center"
          style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transition: "opacity 1.2s ease, transform 1.2s ease" }}
        >
          <p className="text-white/80 text-[10px] sm:text-sm tracking-[0.25em] uppercase mb-3 drop-shadow-md">
            Himachal TCP Approved · RERA No. HPRERAKAN2023036/P
          </p>
          <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-bold mb-2 leading-tight drop-shadow-lg" style={{ textShadow: "0 3px 24px rgba(0,0,0,0.7)" }}>
            Forest View
          </h1>
          <h2 className="text-[#7ec8e3] text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 drop-shadow-md" style={{ letterSpacing: "0.1em", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
            Apartments
          </h2>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg mb-8 drop-shadow-md">
            Shiv Nagar, Dharamshala, Himachal Pradesh
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
  <button onClick={scrollToForm} className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-slate-900 font-semibold rounded-full hover:bg-slate-100 transition-all duration-200 text-sm tracking-wide shadow-lg">
    Download Brochure
  </button>
</div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} className="transition-all duration-300 rounded-full"
              style={{ width: i === activeSlide ? "20px" : "7px", height: "7px", background: i === activeSlide ? "white" : "rgba(255,255,255,0.4)" }} />
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:py-10 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { val: "68", unit: "Apts", label: "Limited Edition Units" },
            { val: "25+", unit: "Yrs", label: "Developer Experience" },
            { val: "8M+", unit: "sqft", label: "Delivered Projects" },
            { val: "5", unit: "km", label: "From Dharamshala Market" },
          ].map(({ val, unit, label }) => (
            <div key={label}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {val} <span className="text-[#7ec8e3] text-sm sm:text-xl">{unit}</span>
              </div>
              <div className="text-slate-400 text-[10px] sm:text-xs mt-1 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4">About the Project</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5 sm:mb-6">
              Where the Himalayas are your backyard.
            </h2>
            <p className="text-slate-600 leading-7 sm:leading-8 text-sm sm:text-base mb-4 sm:mb-5">
              This limited-edition project consists of <strong>68 fully furnished apartments</strong> nestled next to ancient forest land — home to over 500 species of indigenous trees — offering stunning views of the Dhauladhar Matterhorn mountains.
            </p>
            <p className="text-slate-600 leading-7 sm:leading-8 text-sm sm:text-base mb-6 sm:mb-8">
              Just 5 km from the Dharamshala market and half a kilometre from the renowned herbal cancer hospital, the project provides a peaceful environment, free from tourist congestion.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {["Tower A", "Tower B", "1 BHK · 951 sq.ft.", "2 BHK · 1321 sq.ft."].map((tag) => (
                <span key={tag} className="px-3 sm:px-4 py-1.5 border border-slate-300 text-slate-700 rounded-full text-xs sm:text-sm">{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative mt-6 lg:mt-0 pb-6 sm:pb-8">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/dharamshala_images (3).webp" alt="Aerial view" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 bg-green-700 text-white px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg text-xs">
              <div className="font-bold text-xs sm:text-sm mb-0.5">HP TCP Approved</div>
              <div className="text-green-200 text-[10px] sm:text-xs">RERA: HPRERAKAN2023036/P</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
     <section className="py-4 px-4 sm:py-6 sm:px-6">
  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 max-w-6xl mx-auto">
    {[
      "/dharamshala_images (1).webp",
      "/dharamshala_images (4).webp",
      "/dharamshala_images (5).webp",
      "/IMG-20260601-WA0032.jpg.jpeg",
      "/IMG-20260601-WA0030.jpg.jpeg",
    ].map((src, i) => (
      <div key={i} className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden group">
        <Image src={src} alt={`View ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
    ))}
  </div>
</section>

      {/* ── AMENITIES ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3">Life at Forest View</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">World-Class Amenities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {amenities.map(({ icon, label }) => (
              <div key={label} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-2 sm:mb-3">{icon}</div>
                <div className="text-slate-700 text-xs sm:text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GREEN CONSTRUCTION ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative h-[260px] sm:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-1">
            <Image src="/dharamshala_images (4).webp" alt="Sustainable construction" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <div className="text-base font-bold">Sustainable by Design</div>
              <div className="text-green-200 text-sm">Built for generations</div>
            </div>
          </div>
          <div className="order-2">
            <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-4">Sustainable & Green Construction</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 sm:mb-8">A home that respects nature</h2>
            <ul className="space-y-3">
              {greenFeatures.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                    <IconCheck />
                  </span>
                  <span className="text-slate-600 text-sm">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── UNIT SIZES ── */}
      {/* ── UNIT SIZES ── */}
{/* Tower A + Tower B, each with 1BHK and 2BHK, with floor plan images */}
<section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-900 text-white">
  <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
    <p className="text-[#7ec8e3] text-xs uppercase tracking-[0.3em] mb-3">Floor Plans</p>
    <h2 className="text-3xl sm:text-4xl font-bold">Choose Your Space</h2>
  </div>

  {/* Tower A */}
  <div className="max-w-3xl mx-auto mb-8">
    <p className="text-[#7ec8e3] text-xs uppercase tracking-widest mb-4 text-center">Tower A</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
      {[
        {
          type: "1 BHK", area: "951 sq.ft.", tower: "Tower A",
          floorPlanImage: "/a tower 1bhk.jpeg",
          details: [
            { k: "Covered Area", v: "741.64 sq.ft." },
            { k: "Carpet Area", v: "521.09 sq.ft." },
            { k: "Balcony Area", v: "179.97 sq.ft." },
          ],
        },
        {
          type: "2 BHK", area: "1321 sq.ft.", tower: "Tower A",
          floorPlanImage: "/atower 2bhk.jpeg",
          details: [
            { k: "Covered Area", v: "1056.83 sq.ft." },
            { k: "Carpet Area", v: "775.38 sq.ft." },
            { k: "Balcony Area", v: "216.84 sq.ft." },
          ],
        },
      ].map(({ type, area, tower, floorPlanImage, details }) => (
        <div key={`${tower}-${type}`} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 hover:bg-white/10 transition-colors">
          <div className="text-[#7ec8e3] text-xs uppercase tracking-widest mb-2">{tower}</div>
          <div className="text-2xl sm:text-3xl font-bold mb-1">{type}</div>
          <div className="text-white/60 text-sm mb-4">Super Area: {area}</div>
          {/* Floor plan image */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 bg-white/5">
            <Image src={floorPlanImage} alt={`${tower} ${type} Floor Plan`} fill className="object-contain" />
          </div>
          <div className="space-y-2">
            {details.map(({ k, v }) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-white/50">{k}</span>
                <span className="text-white font-medium">{v}</span>
              </div>
            ))}
          </div>
          <button onClick={scrollToForm} className="mt-5 sm:mt-6 w-full py-2.5 border border-[#7ec8e3] text-[#7ec8e3] rounded-full text-sm hover:bg-[#7ec8e3] hover:text-slate-900 transition-all duration-200">
            Get Price Details
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Tower B */}
  <div className="max-w-3xl mx-auto">
    <p className="text-[#7ec8e3] text-xs uppercase tracking-widest mb-4 text-center">Tower B</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
      {[
        {
          type: "1 BHK", area: "770 sq.ft.", tower: "Tower B",
          floorPlanImage: "/btower 1bhk.jpeg",
          details: [
            { k: "Covered Area", v: "615.92 sq.ft." },
            { k: "Carpet Area",  v: "466.83 sq.ft." },
            { k: "Balcony Area", v: "115.82 sq.ft." },
          ],
        },
        {
          type: "2 BHK", area: "1275 sq.ft.", tower: "Tower B",
          floorPlanImage: "/btower 2bhk.jpeg",
          details: [
            { k: "Covered Area", v: "1014.18 sq.ft." },
            { k: "Carpet Area",  v: "678.13 sq.ft."  },
            { k: "Balcony Area", v: "276.63 sq.ft."  },
          ],
        },
      ].map(({ type, area, tower, floorPlanImage, details }) => (
        <div key={`${tower}-${type}`} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 hover:bg-white/10 transition-colors">
          <div className="text-[#7ec8e3] text-xs uppercase tracking-widest mb-2">{tower}</div>
          <div className="text-2xl sm:text-3xl font-bold mb-1">{type}</div>
          <div className="text-white/60 text-sm mb-4">Super Area: {area}</div>
          <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 bg-white/5">
            <Image src={floorPlanImage} alt={`${tower} ${type} Floor Plan`} fill className="object-contain" />
          </div>
          <div className="space-y-2">
            {details.map(({ k, v }) => (
              <div key={k} className="flex justify-between text-sm">
                <span className="text-white/50">{k}</span>
                <span className="text-white font-medium">{v}</span>
              </div>
            ))}
          </div>
          <button onClick={scrollToForm} className="mt-5 sm:mt-6 w-full py-2.5 border border-[#7ec8e3] text-[#7ec8e3] rounded-full text-sm hover:bg-[#7ec8e3] hover:text-slate-900 transition-all duration-200">
            Get Price Details
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── LOCATION ── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3">Location Advantage</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Shiv Nagar, Dharamshala</h2>
            <p className="text-slate-500 mt-2 text-sm">MDR 45 / Kangra–Pathankot Road</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              { dist: "5 km", place: "Dharamshala Market" },
              { dist: "0.5 km", place: "Herbal Cancer Hospital" },
              { dist: "Next to", place: "500+ Species Forest" },
              { dist: "Views of", place: "Dhauladhar Mountains" },
            ].map(({ dist, place }) => (
              <div key={place} className="border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-green-300 hover:bg-green-50 transition-colors">
                <div className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{dist}</div>
                <div className="text-slate-500 text-xs sm:text-sm">{place}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROCHURE FORM ── */}
      <section ref={formRef} className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

            {/* Left — image stacks on top on mobile */}
            <div className="flex flex-col">
              <p className="text-green-700 text-xs uppercase tracking-[0.3em] mb-3 sm:mb-4">Get the Full Picture</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                Download the Official Brochure
              </h2>
              <p className="text-slate-600 leading-7 text-sm mb-5 sm:mb-6">
                Get access to the master plan, detailed floor plans, pricing, and everything you need to make the right decision — instantly after submitting your details.
              </p>
              {/* Fixed height on mobile, flex-1 on desktop */}
              <div className="relative h-[220px] sm:h-[260px] lg:flex-1 lg:min-h-[260px] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/dharamshala_images (2).webp" alt="Royal Nest Forest View mountain view" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 text-white">
                  <div className="text-sm sm:text-base font-semibold">Limited Edition</div>
                  <div className="text-white/70 text-xs sm:text-sm">68 Fully Furnished Apartments</div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Request Brochure</h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-5 sm:mb-6">Fill in your details and the brochure will download instantly.</p>

              {isSubmitted && (
                <div className="mb-4 sm:mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 sm:p-4 text-emerald-700 text-sm">
                  ✓ Thank you! Your brochure is downloading now.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* FIX: stack name fields on very small screens */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                      placeholder="Arjun" />
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                      placeholder="Sharma" />
                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    placeholder="you@example.com" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5" htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-3 sm:px-3.5 py-2 sm:py-2.5 text-slate-900 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    placeholder="+91 98765 43210" />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full rounded-xl bg-slate-900 px-5 py-3 sm:py-3.5 text-white text-sm font-semibold hover:bg-green-800 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending…" : "Download Brochure →"}
                </button>
                <p className="text-center text-slate-400 text-xs">
                  Your details are sent securely to <span className="text-slate-600 break-all">info@royalnestgroup.com</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-slate-900 text-white text-center">
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">Royal Nest Group</p>
        <p className="text-slate-300 text-sm break-all sm:break-normal">info@royalnestgroup.com · +91 92893 49995</p>
      </section>
    </div>
  );
}