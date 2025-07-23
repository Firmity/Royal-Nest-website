"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ContactPage from "@/components/contactpage";

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

export default function HillViewPage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-x-hidden">
            <Navbar />
            {/* Top Banner */}
            <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/Aboutus/skyline.png"
                    alt="Project Elevation"
                    fill
                    className="object-cover object-center w-full h-full z-0"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl tracking-wide">
                        Royal Nest Hill View
                    </h1>
                    <p className="text-lg md:text-2xl text-white max-w-2xl mx-auto font-light drop-shadow-2xl">
                        Jammu & Kashmir’s tallest and most premium green residential tower
                    </p>
                </div>
            </section>

            {/* Key Features */}
            <section className="max-w-5xl mx-auto py-12 px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">Key Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-800">
                    {keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">•</span>
                            <span>{feature}</span>
                        </li>
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
                            <div className="relative w-full h-[350px] md:h-[500px] rounded-2xl overflow-hidden">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover object-center w-full h-full"
                                    priority={idx === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Project Location & Map */}
            <section className="max-w-5xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Project Location</h2>
                    <p className="text-lg text-gray-700 mb-2">Royal Nest Hill View, Jammu, Jammu & Kashmir, India</p>
                    <p className="text-base text-gray-600">Near Tawi River, close to city center, excellent connectivity to airport and railway station.</p>
                    <div className="flex-1 w-full mb-8 md:mb-0 mt-4">
                        <a
                            href="/brochures/royal-nest-hill-view-brochure.pdf" // Replace with actual brochure path
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition-colors text-lg"
                        >
                            Download Brochure
                        </a>
                    </div>
                </div>
                <div className="flex-1 w-full h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.123456789!2d74.872264!3d32.726601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e84e2b6b6b6b6%3A0x123456789abcdef!2sJammu%2C%20Jammu%20and%20Kashmir!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Project Location Map"
                    ></iframe>
                </div>
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
