"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "swiper/css";
import "swiper/css/navigation";
import ContactPage from "@/components/contactpage";
import { motion, useScroll, useTransform } from "framer-motion";
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

const baseButtonClass =
  "px-5 py-2 rounded-lg font-semibold text-white shadow-md transition duration-300 ease-in-out select-none";

const blueGradientButtonClass =
  "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300";

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

export default function HillViewPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 80]);

  // Track which pop-up is open & the slide index inside the open popup
  const [activePopup, setActivePopup] = useState<
    "shopping" | "hospitals" | "schools" | "banks" | "popular" | null
  >("shopping");
  const [slideIdx, setSlideIdx] = useState(0);

  // Reset slide index on popup change
  React.useEffect(() => {
    setSlideIdx(0);
  }, [activePopup]);

  function handlePrev() {
    if (!activePopup) return;
    setSlideIdx((prev) =>
      prev === 0 ? locationsData[activePopup].length - 1 : prev - 1
    );
  }

  function handleNext() {
    if (!activePopup) return;
    setSlideIdx((prev) =>
      prev === locationsData[activePopup].length - 1 ? 0 : prev + 1
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <FaLeaf className="text-green-600 w-6 h-6" />,
              text: "IGBC Gold Certified Green Building – eco-friendly & energy-efficient design",
            },
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
            {
              icon: <FaShieldAlt className="text-indigo-600 w-6 h-6" />,
              text: "Strategically located: 30 min to Airport, 20 min to Railway Station",
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

      {/* Specifications */}
      {project.specifications?.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold text-center mb-8 text-black">
            Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            {project.specifications.map((spec, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <p className="font-semibold">{spec.label}</p>
                <p className="text-sm">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Google Map Embed */}
      <section className="max-w-6xl mx-auto px-4 py-12 relative">
        <h2 className="text-3xl font-semibold text-center mb-8 text-black border-b-2 border-green-600 pb-2">
          Nearby Options
        </h2>

        {/* Location Buttons */}
        <div className="flex flex-wrap justify-center mb-2 gap-4">
          <button
            className={`${baseButtonClass} ${
              activePopup === "shopping"
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-300"
                : blueGradientButtonClass
            }`}
            onClick={() => {
              setActivePopup((prev) =>
                prev === "shopping" ? null : "shopping"
              );
            }}
          >
            Shopping &amp; Restaurants Location
          </button>
          <button
            className={`${baseButtonClass} ${
              activePopup === "banks"
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-300"
                : blueGradientButtonClass
            }`}
            onClick={() => {
              setActivePopup((prev) => (prev === "banks" ? null : "banks"));
            }}
          >
            Banks
          </button>
          <button
            className={`${baseButtonClass} ${
              activePopup === "hospitals"
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-300"
                : blueGradientButtonClass
            }`}
            onClick={() => {
              setActivePopup((prev) =>
                prev === "hospitals" ? null : "hospitals"
              );
            }}
          >
            Hospitals &amp; Clinics
          </button>
          <button
            className={`${baseButtonClass} ${
              activePopup === "schools"
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-300"
                : blueGradientButtonClass
            }`}
            onClick={() => {
              setActivePopup((prev) => (prev === "schools" ? null : "schools"));
            }}
          >
            Schools
          </button>
          <button
            className={`${baseButtonClass} ${
              activePopup === "popular"
                ? "bg-green-600 hover:bg-green-700 focus:ring-green-300"
                : blueGradientButtonClass
            }`}
            onClick={() => {
              setActivePopup((prev) => (prev === "popular" ? null : "popular"));
            }}
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
              className={`absolute bottom-2 left-16 
      backdrop-blur-md bg-white/50 border border-green-400 
      rounded-3xl shadow-2xl z-20 p-4 flex flex-col items-center
      w-[250px] h-[215px] transition-all duration-300 animate-fade-in`}
              style={{
                boxShadow:
                  "0 6px 48px 0 rgba(52,199,89,0.18), 0 2px 4px 0 rgba(0,0,0,0.12)",
                background:
                  "linear-gradient(120deg, rgba(163,250,210,0.68) 0%, rgba(28,199,149,0.12) 100%)",
                minWidth: "250px",
                minHeight: "215px",
                maxWidth: "250px",
                maxHeight: "215px",
              }}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <button
                  className="p-2 rounded-full bg-green-100 hover:bg-green-500 transition-all duration-200"
                  title="Previous"
                  onClick={handlePrev}
                >
                  <FaArrowLeft className="text-green-600 w-5 h-5" />
                </button>
                <span
                  className="flex-1 mx-2 font-bold text-lg border border-green-300 shadow bg-green-500/20 rounded-xl px-3 py-1 text-green-900 text-center break-words"
                  style={{
                    minHeight: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.05rem",
                    lineHeight: 1.2,
                  }}
                >
                  {locationsData[activePopup][slideIdx].name}
                </span>
                <button
                  className="p-2 rounded-full bg-green-100 hover:bg-green-500 transition-all duration-200"
                  title="Next"
                  onClick={handleNext}
                >
                  <FaArrowRight className="text-green-600 w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center items-center w-full mb-3 h-[90px]">
                <div className="bg-white/70 rounded-2xl shadow-lg border-2 border-green-200 p-1 flex items-center justify-center w-[85px] h-[85px]">
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
                      i === slideIdx ? "bg-green-600 scale-125" : "bg-green-300"
                    } transition-all`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <ContactPage />
      </section>
    </div>
  );
}
