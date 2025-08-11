"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Modal from "react-modal";

const galleryTabs = {
  Elevation: [
    "/gallery/elevation1.jpg",
    "/gallery/elevation2.jpg",
    "/gallery/elevation3.jpg",
    "/gallery/elevation4.jpg",
    "/gallery/elevation5.jpg",
    "/gallery/elevation6.jpg",
    "/gallery/elevation7.jpg",
  ],
  Interior: [
    "/gallery/interior1.jpg",
    "/gallery/interior2.jpg",
    "/gallery/interior3.jpg",
    "/gallery/interior4.jpg",
    "/gallery/interior5.jpg",
  ]
} as const;

type GalleryTabKey = keyof typeof galleryTabs;

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<GalleryTabKey>("Elevation");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [visibleCount, setVisibleCount] = useState(5); // show 5 initially

  const openModal = (img: string) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  const handleTabChange = (tab: GalleryTabKey) => {
    setActiveTab(tab);
    setVisibleCount(5); // reset visible count when tab changes
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); // load 5 more each click
  };

  const currentImages = galleryTabs[activeTab].slice(0, visibleCount);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-black">Gallery</h2>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {Object.keys(galleryTabs).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab as GalleryTabKey)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <motion.div
        key={activeTab + visibleCount} // triggers animation when more are loaded
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {currentImages.map((src, index) => (
          <div
            key={index}
            className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
            onClick={() => openModal(src)}
          >
            <Image
              src={src}
              alt={`${activeTab} ${index + 1}`}
              fill
              loading="lazy"
              className="object-cover object-center"
            />
            {/* Zoom icon */}
            <div className="absolute bottom-2 right-2 bg-white/80 p-1 rounded-full">
              🔍
            </div>
          </div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {visibleCount < galleryTabs[activeTab].length && (
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
        className="max-w-4xl mx-auto mt-24 outline-none"
        overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      >
        <div className="relative w-full h-[80vh] bg-white rounded-xl overflow-hidden shadow-lg">
          <Image
            src={selectedImage}
            alt="Zoomed Image"
            fill
            loading="eager"
            className="object-contain"
          />
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full z-50"
          >
            ✕
          </button>
        </div>
      </Modal>
    </section>
  );
}
