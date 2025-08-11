"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import "swiper/css";
import "swiper/css/navigation";
import ContactPage from "@/components/contactpage";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaLeaf, FaSun, FaWind, FaShieldAlt, FaSwimmingPool } from "react-icons/fa";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/Amenities";
import PlanSection from "@/components/Plans";

const project = {
    name: "Royal Nest Hill View",
    location: "Jammu, Jammu & Kashmir, India",
    description: "Jammu & Kashmir’s tallest and most premium green residential tower",
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
        { label: "Flooring", value: "Premium vitrified tiles in living/dining & bedrooms" },
        { label: "Bathrooms", value: "Anti-skid ceramic tiles with modern CP fittings" },
        { label: "Doors", value: "Engineered wooden doors with branded locks" },
        { label: "Windows", value: "UPVC sliding windows with mosquito mesh" },
        { label: "Paint", value: "Acrylic emulsion paint on interior walls" },
        { label: "Kitchen", value: "Granite countertop with stainless steel sink" },
        { label: "Balcony", value: "Weather-proof tiles with safety railings" },
    ],
    mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.292261421136!2d74.91956981006979!3d32.67827297359536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e9d457db987e7%3A0x50d0229c93f9f5ae!2sRoyal%20Nest%20Hill%20View!5e0!3m2!1sen!2sin!4v1753344228472!5m2!1sen!2sin",
};


export default function HillViewPage() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 80]);

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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.name}</h1>
                    <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
                        {project.description}
                    </p>
                </div>
            </section>

            {/* About Royal Nest Hill View Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
                {/* Left: Project Visual (Replace with actual image or video thumbnail) */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src="/Herocarousel/Royal Nest Hill View Fountain Area.jpg"
                        alt="Royal Nest Hill View"
                        fill
                        className="object-cover object-center"
                    />
                </div>

                {/* Right: About Text */}
                <div className="text-gray-800">
                    <h2 className="text-3xl font-bold mb-4 text-black border-b-2 inline-block border-gray-300 pb-1">
                        About Royal Nest Hill View
                    </h2>
                    <p className="mb-4">
                        <strong>Royal Nest Hill View</strong> is the tallest residential tower in Jammu & Kashmir—an IGBC Gold Certified green building development by Omkar Nests (P) Ltd, part of the Royal Nest Group. With 25+ years of experience and over 7 million sq. ft. delivered, the group has delivered landmark residential and commercial projects across North India.
                    </p>
                    <p className="mb-4">
                        This iconic project offers 75% open green area, smart floor plans, green features like solar lighting, rainwater harvesting, and a state-of-the-art sewage treatment plant—redefining luxury and sustainability in the heart of Jammu.
                    </p>
                    <p className="mb-6">
                        Hill View features 2 BHK, 3 BHK, and luxury terrace apartments with designer interiors, branded fittings, clubhouse, pool, gym, indoor games, and excellent connectivity to airport, railway station, schools, hospitals, and shopping hubs.
                    </p>

                    {/* Property Highlights */}
                    <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>Property Type:</strong> Apartment</p>
                        <p><strong>Price:</strong> ₹ 65 Lakh Onward</p>
                        <p><strong>Units:</strong> 2 BHK, 3 BHK, Fully Furnished & Semi-Furnished Options</p>
                        <p><strong>RERA Registration No:</strong> RERA-JK-JMU-1-2025</p>
                        <p><strong>Project Address:</strong> Royal Nest Hill View, Sector-D, Sainik Colony Ext., Chowadi Road, Jammu, J&K - 180011</p>
                    </div>
                </div>
            </section>

            {/* Project Highlights */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-10 text-black">Project Highlights</h2>
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

            {/* Image Gallery */}
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
                    <h2 className="text-3xl font-semibold text-center mb-8 text-black">Specifications</h2>
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

            {/* Location & Brochure */}
            <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">
                <div>
                    <h2 className="text-3xl font-semibold mb-4 text-black">Location</h2>
                    <p className="text-lg text-gray-700 mb-2">{project.location}</p>
                    <p className="text-gray-600 mb-6">
                        Near Tawi River, close to city center, excellent connectivity to airport and railway station.
                    </p>
                    <a
                        href={project.brochureUrl}
                        target="_blank"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
                        rel="noopener noreferrer"
                    >
                        📄 Download Brochure
                    </a>
                </div>
                <motion.div
                    className="rounded-2xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <iframe
                        src={project.mapEmbedUrl}
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>
            </section>

            {/* Contact Form */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <ContactPage />
            </section>
        </div>
    );
}
