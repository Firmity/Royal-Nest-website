"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import "swiper/css";
import "swiper/css/navigation";
import ContactPage from "@/components/contactpage";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaLeaf,
  FaSun,
  FaWind,
  FaShieldAlt,
  FaSwimmingPool,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/Amenities";
import PlanSection from "@/components/Plans";

const project = {
  name: "Royal Nest Hill View",
  location: "Jammu, Jammu & Kashmir, India",
  description:
    "Jammu & Kashmir’s tallest and most premium green residential tower",
  brochureUrl: "/Brochure Royalnest Hill View.pdf",
  images: [
    {
      src: "/Herocarousel/Royal Nest Hill View Fountain Area.jpg",
      alt: "Hill View Fountain Area",
    },
    {
      src: "/Herocarousel/Royal Nest Hill View Penthouse Terrace.jpg",
      alt: "Hill View Penthouse Terrace",
    },
    {
      src: "/Herocarousel/Royal Nest Hill View Pool to Landscape Area.jpg",
      alt: "Hill View Pool to Landscape Area",
    },
  ],
  floorPlans: [
    {
      src: "/floorplans/2bhk-layout.jpg",
      name: "2 BHK Floor Plan",
    },
    {
      src: "/floorplans/3bhk-layout.jpg",
      name: "3 BHK Floor Plan",
    },
    {
      src: "/floorplans/penthouse-layout.jpg",
      name: "Penthouse Floor Plan",
    },
  ],
  specifications: [
    { label: "Structure", value: "Earthquake-resistant RCC structure" },
    {
      label: "Flooring",
      value: "Premium vitrified tiles in living/dining & bedrooms",
    },
    {
      label: "Bathrooms",
      value: "Anti-skid ceramic tiles with modern CP fittings",
    },
    { label: "Doors", value: "Engineered wooden doors with branded locks" },
    { label: "Windows", value: "UPVC sliding windows with mosquito mesh" },
    { label: "Paint", value: "Acrylic emulsion paint on interior walls" },
    { label: "Kitchen", value: "Granite countertop with stainless steel sink" },
    { label: "Balcony", value: "Weather-proof tiles with safety railings" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.292261421136!2d74.91956981006979!3d32.67827297359536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e9d457db987e7%3A0x50d0229c93f9f5ae!2sRoyal%20Nest%20Hill%20View!5e0!3m2!1sen!2sin!4v1753344228472!5m2!1sen!2sin",
};

type Destination = {
  name: string;
  images: { src: string; alt: string }[];
};

const locationsData: Record<string, Destination[]> = {
  shopping: [
    {
      name: "Wave Mall Jammu",
      images: [{ src: "/popup/mallu.png", alt: "Wave Mall Jammu Image 1" }],
    },
    {
      name: "Bahu Plaza",
      images: [{ src: "/popup/plazu.png", alt: "Bahu Plaza Image 1" }],
    },
    {
      name: "Jewel Chowk",
      images: [{ src: "/popup/chowk.png", alt: "Jewel Chowk Image 1" }],
    },
  ],
  hospitals: [
    {
      name: "Medical College Jammu",
      images: [
        {
          src: "/popup/medicalcollege.png",
          alt: "Gov. Medical College Image 1",
        },
      ],
    },
    {
      name: "Dr K-D Eye Hospital",
      images: [
        { src: "/popup/eyehospital.png", alt: "Dr K-D Eye Hospital Image 1" },
      ],
    },
    {
      name: "Ankur Maitrika",
      images: [{ src: "/popup/realclinic.png", alt: "Ankur Maitrika Image 1" }],
    },
  ],
  schools: [
    {
      name: "British International School",
      images: [
        {
          src: "/popup/british.png",
          alt: "British International School Image 1",
        },
      ],
    },
    {
      name: "Heritage School",
      images: [{ src: "/popup/heritage.png", alt: "Heritage School Image 1" }],
    },
    {
      name: "DOON International School",
      images: [
        { src: "/popup/doon.png", alt: "DOON International School Image 1" },
      ],
    },
  ],
  banks: [
    {
      name: "HDFC Bank – Sainik Colony",
      images: [{ src: "/popup/hdfc.png", alt: "HDFC Bank Image 1" }],
    },
    {
      name: "ICICI Bank – Sainik Colony",
      images: [{ src: "/popup/icici.png", alt: "ICICI Bank Image 1" }],
    },
    {
      name: "Axis Bank – Chowadi",
      images: [{ src: "/popup/axis.png", alt: "Axis Bank Image 1" }],
    },
  ],
  popular: [
    {
      name: "Bahu Fort & Bagh-e-Bahu",
      images: [{ src: "/popup/fort.png", alt: "Bahu Fort Image 1" }],
    },
    {
      name: "Raghunath Bazaar",
      images: [{ src: "/popup/bazaar.png", alt: "Raghunath Bazaar Image 1" }],
    },
    {
      name: "Amar Mahal Palace",
      images: [{ src: "/popup/mahal.png", alt: "Amar Mahal Palace Image 1" }],
    },
  ],
};

// Advanced spec icons (replace "/spec-icons/..." with your actual icons)
const specIcons: Record<string, string> = {
  Structure: "/specification/structure.jpeg",
  Flooring: "/specification/flooring.png",
  Bathrooms: "/specification/bathroom.png",
  Doors: "/specification/doors.png",
  Windows: "/specification/windows.jpeg",
  Paint: "/specification/paint.png",
  Kitchen: "/specification/kitchen.png",
  Balcony: "/specification/balcony.jpeg",
};

const CARD_WIDTH = 125;

const VISIBLE_COUNT = 5;

export default function HillViewPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 80]);

  // For location popup slider
  const [activePopup, setActivePopup] = useState<
    "shopping" | "hospitals" | "schools" | "banks" | "popular" | null
  >("shopping");
  const [slideIdx, setSlideIdx] = useState(0);

  // Specification carousel state
  const [centerIdx, setCenterIdx] = useState(2);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Carousel wrap helper
  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const positions = Array(VISIBLE_COUNT)
    .fill(0)
    .map((_, i) => mod(centerIdx - 2 + i, project.specifications.length));

  // Carousel nav

  const next = () =>
    setCenterIdx((c) => mod(c + 1, project.specifications.length));

  // Location popup slider nav
  React.useEffect(() => {
    setSlideIdx(0);
  }, [activePopup]);

  const handlePrev = () => {
    if (!activePopup) return;
    setSlideIdx((prev) =>
      prev === 0 ? locationsData[activePopup].length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!activePopup) return;
    setSlideIdx((prev) =>
      prev === locationsData[activePopup].length - 1 ? 0 : prev + 1
    );
  };

  // Dots
  const goTo = (i: number) => setCenterIdx(i);

  // Optional autoplay for specs
  useEffect(() => {
    const id = setInterval(() => next(), 4500);
    return () => clearInterval(id);
  }, [next]);


  return (
    <div className="w-full min-h-screen bg-white relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
            src={project.images[2].src}
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </motion.div>
        <div className="relative z-20 text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {project.name}
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>
      </section>

      {/* About Royal Nest Hill View Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/Herocarousel/Royal Nest Hill View Fountain Area.jpg"
            alt="Royal Nest Hill View"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="text-gray-800">
          <h2 className="text-3xl font-bold mb-4 text-black border-b-2 inline-block border-gray-300 pb-1">
            About Royal Nest Hill View
          </h2>
          <p className="mb-4">
            <strong>Royal Nest Hill View</strong> is the tallest residential
            tower in Jammu & Kashmir—an IGBC Gold Certified green building
            development by Omkar Nests (P) Ltd, part of the Royal Nest Group.
            With 25+ years of experience and over 7 million sq. ft. delivered,
            the group has delivered landmark residential and commercial projects
            across North India.
          </p>
          <p className="mb-4">
            This iconic project offers 75% open green area, smart floor plans,
            green features like solar lighting, rainwater harvesting, and a
            state-of-the-art sewage treatment plant—redefining luxury and
            sustainability in the heart of Jammu.
          </p>
          <p className="mb-6">
            Hill View features 2 BHK, 3 BHK, and luxury terrace apartments with
            designer interiors, branded fittings, clubhouse, pool, gym, indoor
            games, and excellent connectivity to airport, railway station,
            schools, hospitals, and shopping hubs.
          </p>

          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Property Type:</strong> Apartment
            </p>
            <p>
              <strong>Price:</strong> ₹ 65 Lakh Onward
            </p>
            <p>
              <strong>Units:</strong> 2 BHK, 3 BHK, Fully Furnished &
              Semi-Furnished Options
            </p>
            <p>
              <strong>RERA Registration No:</strong> RERA-JK-JMU-1-2025
            </p>
            <p>
              <strong>Project Address:</strong> Royal Nest Hill View, Sector-D,
              Sainik Colony Ext., Chowadi Road, Jammu, J&K - 180011
            </p>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          Project Highlights
        </h2>
        {/* Grid for first 6 items with 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <FaSun className="text-yellow-500 w-6 h-6" />,
              text: "75% Open Green Landscape Area with curated biodiversity and jogging tracks",
            },
            {
              icon: <FaWind className="text-blue-500 w-6 h-6" />,
              text: "Natural daylight-optimized homes with excellent cross ventilation",
            },
            {
              icon: <FaShieldAlt className="text-gray-800 w-6 h-6" />,
              text: "Earthquake-resistant RCC structure with wide staircases and modern lifts",
            },
            {
              icon: <FaSwimmingPool className="text-cyan-600 w-6 h-6" />,
              text: "Clubhouse with pool, gym, banquet, indoor games, yoga & library",
            },
            {
              icon: <FaLeaf className="text-green-500 w-6 h-6" />,
              text: "Solar lighting, rainwater harvesting & on-site sewage treatment plant",
            },
            {
              icon: <FaSun className="text-orange-400 w-6 h-6" />,
              text: "Glass façade balconies & French windows for panoramic views",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <p className="text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* The 7th item centered below */}
        <div className="flex justify-center mt-6">
          <motion.div
            className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex-shrink-0">
              <FaShieldAlt className="text-indigo-600 w-6 h-6" />
            </div>
            <p className="text-gray-700">
              Strategically located: 30 min to Airport, 20 min to Railway
              Station
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <GallerySection />
      </section>

      {/* Amenities Section */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <AmenitiesSection />
      </section>

      {/* Floor Plans */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <PlanSection />
      </section>

      {/* Specifications section with advanced glorious slider */}
      <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-center mb-4 text-black">
          Specification
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-lg font-medium">
          “We see technology not just as a tool, but as a way to simplify life
          and make everyday experiences better.”
        </p>
        <div
          className="flex items-center w-full justify-center relative"
          style={{ minHeight: 200 }}
        >
          {/* Arrow Nav */}
          <button
            onClick={() =>
              setCenterIdx(mod(centerIdx - 1, project.specifications.length))
            }
            className="absolute left-0 z-20 p-0.5 rounded-full text-green-500 hover:bg-green-100 transition-all disabled:opacity-50"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                d="M15 19l-7-7 7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Cards */}
          <div className="flex relative gap-[18px] justify-center items-center w-[720px] overflow-visible">
            {positions.map((idx, slot) => {
              const spec = project.specifications[idx];
              const isHover = hoverIdx === idx;
              return (
                <motion.div
                  key={idx}
                  className={`relative flex flex-col items-center cursor-pointer`}
                  style={{
                    width: CARD_WIDTH,
                    zIndex: isHover ? 50 : 10 + slot * 2,
                  }}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                  whileHover={{ y: -15, scale: 1.13 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-md"
                    style={{
                      boxShadow: isHover
                        ? "0 8px 40px 0 #22c55e55, 0 1.5px 5px #2221"
                        : "0 1px 8px #0001",
                    }}
                    animate={{
                      background: isHover
                        ? "linear-gradient(135deg,#22c55e22,#abffc822)"
                        : "#fff",
                    }}
                  >
                    <Image
                      src={specIcons[spec.label] || "/spec-icons/default.png"}
                      alt={spec.label}
                      width={48}
                      height={48}
                      className="object-contain select-none"
                    />
                  </motion.div>
                  <span
                    className={`mt-2 text-sm font-bold ${
                      isHover ? "text-green-600" : ""
                    }`}
                  >
                    {spec.label}
                  </span>
                  <AnimatePresence>
                    {isHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{
                          opacity: 1,
                          y: -65,
                          scale: 1.03,
                          boxShadow:
                            "0 6px 34px 0 #22c55e70, 0 1.5px 5px #2222",
                        }}
                        exit={{ opacity: 0, y: 8, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 w-56 bg-green-500 text-white rounded-xl px-5 py-4 text-center text-base shadow-2xl pointer-events-none"
                        style={{
                          fontWeight: 500,
                          lineHeight: 1.45,
                          top: "-52px",
                          border: "2.5px solid #28e696",
                        }}
                      >
                        <span style={{ fontFamily: "'Inter',sans-serif" }}>
                          {spec.value}
                        </span>
                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-green-500 rotate-45 border-b-2 border-r-2 border-green-200" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Arrow Nav */}
          <button
            onClick={() =>
              setCenterIdx(mod(centerIdx + 1, project.specifications.length))
            }
            className="absolute right-0 z-20 p-0.5 rounded-full text-green-500 hover:bg-green-100 transition-all disabled:opacity-50"
            aria-label="Next"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-6 mt-7">
          {project.specifications.map((_, i) => (
            <button
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                i === centerIdx
                  ? "bg-green-600 scale-125 shadow-lg"
                  : "bg-green-300"
              } `}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="max-w-6xl mx-auto px-4 py-12 relative">
        <h2 className="text-3xl font-semibold text-center mb-8 text-black border-b-2 border-green-600 pb-2">
          Nearby Options
        </h2>

        <div className="flex flex-wrap justify-center mb-2 gap-4">
          <button
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transform transition
      hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4
      focus-visible:ring-green-400 focus-visible:ring-offset-2 select-none ${
        activePopup === "shopping"
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white ring-0"
          : "bg-gray-100 text-green-900 border border-green-200 shadow-sm"
      }`}
            onClick={() => {
              setActivePopup((prev) =>
                prev === "shopping" ? null : "shopping"
              );
            }}
            aria-pressed={activePopup === "shopping"}
          >
            Shopping &amp; Restaurants
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transform transition
      hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4
      focus-visible:ring-green-400 focus-visible:ring-offset-2 select-none ${
        activePopup === "banks"
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white ring-0"
          : "bg-gray-100 text-green-900 border border-green-200 shadow-sm"
      }`}
            onClick={() => {
              setActivePopup((prev) => (prev === "banks" ? null : "banks"));
            }}
            aria-pressed={activePopup === "banks"}
          >
            Banks
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transform transition
      hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4
      focus-visible:ring-green-400 focus-visible:ring-offset-2 select-none ${
        activePopup === "hospitals"
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white ring-0"
          : "bg-gray-100 text-green-900 border border-green-200 shadow-sm"
      }`}
            onClick={() => {
              setActivePopup((prev) =>
                prev === "hospitals" ? null : "hospitals"
              );
            }}
            aria-pressed={activePopup === "hospitals"}
          >
            Hospitals &amp; Clinics
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transform transition
      hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4
      focus-visible:ring-green-400 focus-visible:ring-offset-2 select-none ${
        activePopup === "schools"
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white ring-0"
          : "bg-gray-100 text-green-900 border border-green-200 shadow-sm"
      }`}
            onClick={() => {
              setActivePopup((prev) => (prev === "schools" ? null : "schools"));
            }}
            aria-pressed={activePopup === "schools"}
          >
            Schools
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm font-semibold shadow-md transform transition
      hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4
      focus-visible:ring-green-400 focus-visible:ring-offset-2 select-none ${
        activePopup === "popular"
          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white ring-0"
          : "bg-gray-100 text-green-900 border border-green-200 shadow-sm"
      }`}
            onClick={() => {
              setActivePopup((prev) => (prev === "popular" ? null : "popular"));
            }}
            aria-pressed={activePopup === "popular"}
          >
            Popular Places
          </button>
        </div>

        {/* Distance info text */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center justify-center text-sm italic text-green-700 bg-green-100 bg-opacity-40 px-3 py-1 rounded-md select-none">
            <svg
              className="w-4 h-4 mr-1 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01"
              ></path>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            Within 1-8 km
          </span>
        </div>

        {/* Map iframe */}
        <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
          <iframe
            src={project.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Royal Nest Hill View Location"
          ></iframe>

          {/* Popup slider content */}
          {activePopup && (
            <div
              className="absolute bottom-3 left-2 z-20 transition-all duration-300 animate-fade-in"
              style={{
                width: "305px",
                height: "214px",
                // keep pointer events for inner content
                pointerEvents: "auto",
              }}
            >
              {/* BACKGROUND SHAPE: single SVG path for continuous border + fill */}
              <svg
                viewBox="0 0 305 214"
                preserveAspectRatio="none"
                className="absolute inset-0 w-[305px] h-[214px] -z-10"
                style={{ left: 0, top: 0 }}
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id="popupGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#A3FAD2" stopOpacity="0.68" />
                    <stop
                      offset="100%"
                      stopColor="#1CC795"
                      stopOpacity="0.12"
                    />
                  </linearGradient>
                </defs>
                {/* single continuous path that matches the notch shape — stroke = border */}
                <path
                  d="M6 6 H298 A6 6 0 0 1 304 12 V209 A6 6 0 0 1 298 215 H47 V170 H6 Z"
                  fill="url(#popupGrad)"
                  stroke="#28e696"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* optional subtle inner outline to match original look */}
                <path
                  d="M6 6 H298 A6 6 0 0 1 304 12 V209 A6 6 0 0 1 298 215 H47 V170 H6 Z"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.06"
                  strokeWidth="1"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>

              {/* CONTENT: keep the original layout inside, but without the clipped polygon */}
              <div
                className="relative z-10 border-transparent rounded-3xl p-4 flex flex-col items-center"
                style={{
                  width: "304px",
                  height: "215px",
                  // give inner padding so content doesn't overlap stroke visually
                  boxSizing: "border-box",
                }}
              >
                <div className="flex items-center justify-between w-full mb-3 pr-2">
                  <button
                    className="p-2 rounded-full bg-white/80 hover:bg-green-50 transition-all duration-200 shadow-sm"
                    title="Previous"
                    onClick={handlePrev}
                    aria-label="Previous location"
                  >
                    <FaArrowLeft className="text-green-600 w-5 h-5" />
                  </button>
                  <span
                    className="flex-1 mx-2 font-bold text-lg border border-green-300 shadow bg-green-500/10 rounded-xl px-3 py-1 text-green-900 text-center break-words"
                    style={{
                      minHeight: 38,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.05rem",
                      lineHeight: 1.2,
                      backgroundClip: "padding-box",
                    }}
                  >
                    {locationsData[activePopup][slideIdx].name}
                  </span>
                  <button
                    className="p-2 rounded-full bg-white/80 hover:bg-green-50 transition-all duration-200 shadow-sm"
                    title="Next"
                    onClick={handleNext}
                    aria-label="Next location"
                  >
                    <FaArrowRight className="text-green-600 w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-center items-center w-full mb-3 h-[90px]">
                  <div className="bg-white/90 rounded-2xl shadow-lg border-2 border-green-200 p-1 flex items-center justify-center w-[85px] h-[85px]">
                    <Image
                      src={locationsData[activePopup][slideIdx].images[0].src}
                      alt={locationsData[activePopup][slideIdx].images[0].alt}
                      width={70}
                      height={70}
                      className="object-contain rounded-xl drop-shadow-lg"
                      style={{
                        background:
                          "linear-gradient(140deg, #C9FFC6 50%, #F6FFFB 100%)",
                        width: "70px",
                        height: "70px",
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {locationsData[activePopup].map((_, i) => (
                    <span
                      key={i}
                      className={`block w-2 h-2 rounded-full ${
                        i === slideIdx
                          ? "bg-green-600 scale-125"
                          : "bg-green-300"
                      } transition-all`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <ContactPage />
      </section>

      {/* Popup animation style */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.26s cubic-bezier(0.2, 0.9, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
