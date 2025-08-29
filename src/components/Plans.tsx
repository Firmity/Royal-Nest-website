"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const plans = [
  {
    title: "Master Plan",
    images: ["/plans/10-10-2023 HILL VIEW SITE PLAN (master).png"],
  },
  {
    title: "Floor Plan",
    images: [
      "/plans/TOWER-C UNIT 1,3,4 & 5_page-0001.jpg",
      "/plans/TOWER-C UNIT- 2_page-0001.jpg",
      "/plans/UNIT 3.jpg",
      "/plans/TOWER A GROUND FLOOR  UNIT 3_page-0001.jpg",
      "/plans/TOWER B - GROUND FLOOR  UNIT 1_page-0001.jpg",
      "/plans/TOWER B - GROUND FLOOR  UNIT 4_page-0001.jpg",
      "/plans/UNIT 1.jpg",
    ],
  },
];

export default function PlanSection() {
  const [activeTab, setActiveTab] = useState(plans[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  // Modal handlers
  const openModal = (index: number) => {
    setModalIndex(index);
    setZoomLevel(1);
    setIsFullScreen(false);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setZoomLevel(1);
    setIsFullScreen(false);
  };

  const gotoNext = () => {
    setModalIndex((prev) =>
      (prev + 1) % activeTab.images.length
    );
    setZoomLevel(1);
  };

  const gotoPrev = () => {
    setModalIndex((prev) =>
      prev === 0 ? activeTab.images.length - 1 : prev - 1
    );
    setZoomLevel(1);
  };

  // Zoom / Fullscreen
  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      imageWrapperRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    setZoomLevel(1);
    setIsFullScreen(false);
  }, [modalIndex, modalOpen]);

  return (
    <section className="bg-gray-50 py-10">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-4">
        Plan
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {plans.map((plan) => (
          <button
            key={plan.title}
            onClick={() => setActiveTab(plan)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300
              ${
                activeTab.title === plan.title
                  ? "bg-gradient-to-r from-blue-700 to-blue-400 text-white shadow-md"
                  : "text-blue-700 hover:text-blue-600 border border-blue-500"
              }`}
          >
            {plan.title}
          </button>
        ))}
      </div>

      {/* Blue header bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-400 py-3 text-center font-semibold text-white text-lg">
        {activeTab.title}
      </div>

      {/* Responsive Image Display */}
      <div className="p-6">
        {activeTab.title === "Master Plan" ? (
          <div className="flex justify-center">
            <div
              className="border-4 border-blue-500 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 bg-white"
              style={{ maxWidth: "900px", width: "100%" }}
              onClick={() => openModal(0)}
            >
              <div className="relative w-full" style={{ height: "480px" }}>
                <Image
                  src={activeTab.images[0]}
                  alt="Master Plan"
                  fill
                  className="object-contain"
                  style={{ background: "#fff" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
          >
            {activeTab.images.map((img, i) => (
              <SwiperSlide key={i}>
                <div
                  className="border-4 border-blue-500 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => openModal(i)}
                >
                  <div className="w-full h-64 md:h-80 relative">
                    <Image
                      src={img}
                      alt={`${activeTab.title} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black/90 m-0 p-0 outline-none"
        overlayClassName="fixed inset-0 bg-black/90 z-50"
      >
        <div
          ref={imageWrapperRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{ cursor: zoomLevel > 1 ? "grab" : "auto" }}
        >
          <Image
            src={activeTab.images[modalIndex]}
            alt={`Plan Image ${modalIndex + 1}`}
            fill
            className="object-contain w-full h-full transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
            priority
          />

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-8 right-10 z-50 bg-white/85 hover:bg-red-500 hover:text-white transition-colors rounded-full p-3 shadow-xl"
            aria-label="Close"
            style={{ fontSize: 28 }}
          >
            <FaTimes />
          </button>

          {/* Prev/Next only for multiple images */}
          {activeTab.images.length > 1 && (
            <>
              <button
                onClick={gotoPrev}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-50 bg-white/85 hover:bg-blue-600 hover:text-white transition-colors rounded-full p-3 shadow-xl"
                aria-label="Previous"
                style={{ fontSize: 32 }}
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={gotoNext}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-50 bg-white/85 hover:bg-blue-600 hover:text-white transition-colors rounded-full p-3 shadow-xl"
                aria-label="Next"
                style={{ fontSize: 32 }}
              >
                <FaArrowRight />
              </button>
            </>
          )}

          {/* Zoom & Full Screen Controls */}
          <div className="absolute bottom-10 right-12 z-50 flex flex-col gap-4">
            <button
              onClick={zoomIn}
              className="bg-white/85 hover:bg-blue-600 hover:text-white transition-colors rounded-full p-3 shadow-xl mb-2"
              aria-label="Zoom in"
              style={{ fontSize: 25 }}
            >
              <FaSearchPlus />
            </button>
            <button
              onClick={zoomOut}
              className="bg-white/85 hover:bg-blue-600 hover:text-white transition-colors rounded-full p-3 shadow-xl mb-2"
              aria-label="Zoom out"
              style={{ fontSize: 25 }}
            >
              <FaSearchMinus />
            </button>
            <button
              onClick={toggleFullScreen}
              className="bg-white/85 hover:bg-blue-600 hover:text-white transition-colors rounded-full p-3 shadow-xl"
              aria-label="Toggle full screen"
              style={{ fontSize: 25 }}
            >
              {isFullScreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>

          {/* Image Position Counter */}
          <div className="absolute bottom-4 w-full text-center text-black font-bold tracking-widest z-50 shadow-lg drop-shadow-lg">
            {modalIndex + 1} / {activeTab.images.length}
          </div>
        </div>
      </Modal>
    </section>
  );
}
