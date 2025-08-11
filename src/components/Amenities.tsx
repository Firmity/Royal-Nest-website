"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Amenity = { icon: string; label: string };
type AmenityCategory = "Rooftop Amenities" | "Podium Amenities" | "Ground Amenities";

const amenities: Record<AmenityCategory, Amenity[]> = {
  "Rooftop Amenities": [
    { icon: "🛋️", label: "Work/Study Pods with Wi-Fi" },
    { icon: "🌿", label: "Sky Jog with Nature" },
    { icon: "🌌", label: "Star Gazing Deck" },
    { icon: "🎗️", label: "Red Ribbon Feature Structure" },
    { icon: "🪴", label: "Planters and Landscaping" },
    { icon: "💧", label: "Water Body" },
    { icon: "🔥", label: "Barbecue with Sitting Area" },
    { icon: "⛱️", label: "Gazebo" },
  ],
  "Podium Amenities": [
    { icon: "🏊", label: "Swimming Pool" },
    { icon: "🏋️", label: "Fitness Gym" },
    { icon: "🧘", label: "Yoga Room" },
    { icon: "🎮", label: "Indoor Games" },
    { icon: "🏢", label: "Community Hall" },
    { icon: "🎉", label: "Banquet Lounge" },
    { icon: "📚", label: "Library Corner" },
    { icon: "🏠", label: "Clubhouse & Recreational Zone" },
  ],
  "Ground Amenities": [
    { icon: "🚶", label: "Jogging & Cycling Tracks" },
    { icon: "👧", label: "Children’s Play Zones" },
    { icon: "🪑", label: "Sit-out Areas" },
    { icon: "🍔", label: "Food Court" },
    { icon: "🛍️", label: "Shopping Complex" },
    { icon: "🌱", label: "Designated Green Walkways" },
    { icon: "🌼", label: "Expert Horticulture Landscaping" },
    { icon: "🚗", label: "Parking Area" },
  ],
};

export default function AmenitiesSection() {
  const [activeTab, setActiveTab] = useState<AmenityCategory>("Rooftop Amenities");
  const tabs: AmenityCategory[] = Object.keys(amenities) as AmenityCategory[];

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold text-center mb-6 text-black">Amenities</h2>

      {/* Tabs with animated underline */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 right-0 bottom-0 h-[3px] bg-blue-600 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid with fade/slide transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {amenities[activeTab].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-blue-400 to-blue-500 text-white p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-lg cursor-pointer"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-4xl mb-3"
              >
                {item.icon}
              </motion.div>
              <p className="font-semibold">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
