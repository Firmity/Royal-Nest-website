"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ContactPage from "@/components/contactpage";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaLeaf, FaSun, FaWind, FaShieldAlt, FaSwimmingPool, FaBolt } from "react-icons/fa";

const projectImages = [
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
];

const keyFeatures = [
    "Tallest premium green residential tower in J&K",
    "Glass façade, French windows, energy-efficient homes",
    "Ample natural light and ventilation",
    "IGBC green building compliant",
    "Modern amenities: pool, gym, clubhouse, gardens",
    "24x7 security & power backup",
];

const featureIcons = [
  <FaLeaf className="text-green-600 w-6 h-6" />,
  <FaSun className="text-yellow-500 w-6 h-6" />,
  <FaWind className="text-blue-400 w-6 h-6" />,
  <FaLeaf className="text-green-400 w-6 h-6" />,
  <FaSwimmingPool className="text-cyan-600 w-6 h-6" />,
  <FaShieldAlt className="text-gray-700 w-6 h-6" />,
];

export default function HillViewPage() {
    // Parallax effect for hero
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 80]);
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-x-hidden">
            <Navbar />
            {/* Top Banner */}
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <Image
                        src="/Herocarousel/Royal Nest Hill View Pool to Landscape Area.jpg"
                        alt="Project Elevation"
                        fill
                        className="object-cover object-center w-full h-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />
                </motion.div>
                <motion.div
                    className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl tracking-wide"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Royal Nest Hill View
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-2xl text-white max-w-2xl mx-auto font-light drop-shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Jammu & Kashmir’s tallest and most premium green residential tower
                    </motion.p>
                </motion.div>
            </section>
            {/* Key Features */}
            <section className="max-w-5xl mx-auto py-12 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-800">
                    {keyFeatures.map((feature, idx) => (
                        <motion.li
                            key={idx}
                            className="flex items-start gap-3 bg-white/80 rounded-xl shadow-md p-4 hover:scale-[1.03] hover:shadow-lg transition-transform duration-200"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                        >
                            <span>{featureIcons[idx]}</span>
                            <span>{feature}</span>
                        </motion.li>
                    ))}
                </ul>
            </section>
            {/* 3D Image Gallery/Slider */}
            <section className="max-w-5xl mx-auto py-12 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">Project Elevation & 3D Layout Gallery</h2>
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation
                    loop
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    className="w-full rounded-2xl shadow-lg"
                >
                    {projectImages.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <motion.div
                                className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    priority={idx === 0}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    {img.alt}
                                </motion.div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
            {/* Project Location & Map */}
            <section className="max-w-5xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 flex items-center gap-2">
                        <FaLeaf className="text-green-600 w-7 h-7" /> Project Location
                    </h2>
                    <p className="text-lg text-gray-700 mb-2">Royal Nest Hill View, Jammu, Jammu & Kashmir, India</p>
                    <p className="text-base text-gray-600">Near Tawi River, close to city center, excellent connectivity to airport and railway station.</p>
                    <div className="flex-1 w-full mb-8 md:mb-0 mt-4">
                        <a
                            href="/brochures/royal-nest-hill-view-brochure.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition-colors text-lg animate-pulse hover:animate-none"
                        >
                            <FaLeaf className="w-5 h-5" /> Download Brochure
                        </a>
                    </div>
                </div>
                <motion.div
                    className="flex-1 w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg backdrop-blur-md bg-white/40 border border-white/30 relative"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.292261421136!2d74.91956981006979!3d32.67827297359536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e9d457db987e7%3A0x50d0229c93f9f5ae!2sRoyal%20Nest%20Hill%20View!5e0!3m2!1sen!2sin!4v1753344228472!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </motion.div>
            </section>
            {/* Brochure Link & CTA */}
            <section className="max-w-5xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="flex-1 w-full">
                    <ContactPage />
                </div>
            </section>
        </div>
    );
}