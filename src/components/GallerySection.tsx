"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Modal from "react-modal";
import {
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const galleryTabs = {
  Elevation: [
    "/Gallery/Royal Nest Hill View  Swimming pool.jpg",
    "/Gallery/Royal Nest Hill View  TOWER C NIGHT.jpg",
    "/Gallery/Royal Nest Hill View  TOWER C.jpg",
    "/Gallery/Royal Nest Hill View Aerial View.jpg",
    "/Gallery/Royal Nest Hill View Fountain Area.jpg",
    "/Gallery/Royal Nest Hill View Parking Area Evening.jpg",
    "/Gallery/Royal Nest Hill View Penthouse Terrace.jpg",
    "/Gallery/Royal Nest Hill View Pool to Landscape Area.jpg",
  ],
} as const;

export default function GallerySection() {
  const images = galleryTabs.Elevation;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setZoomLevel(1);
    setIsFullScreen(false);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setZoomLevel(1);
    setIsFullScreen(false);
  };

  const gotoNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setZoomLevel(1);
  };

  const gotoPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

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
  }, [currentIndex, isModalOpen]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, images.length));
  };

  const currentImages = images.slice(0, visibleCount);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-black">Gallery</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentImages.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image
              src={src}
              alt={`Elevation ${index + 1}`}
              fill
              loading="lazy"
              className="object-cover object-center"
            />
            <div className="absolute bottom-2 right-2 bg-white/80 p-1 rounded-full">
              🔍
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < images.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
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
            src={images[currentIndex]}
            alt={`Gallery Image ${currentIndex + 1}`}
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

          {/* Left/Right Arrows */}
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
          <div className="absolute bottom-4 w-full text-center text-white font-bold tracking-widest z-50 shadow-lg drop-shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </Modal>
    </section>
  );
}
