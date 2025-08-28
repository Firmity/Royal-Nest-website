"use client";
import { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const plans = [
  {
    title: "Master Plan",
    images: [
      "/plans/master1.jpg",
      "/plans/master2.jpg",
    ],
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
  {
    title: "Isometric View",
    images: [
      "/plans/iso1.jpg",
      "/plans/iso2.jpg",
    ],
  },
];

export default function PlanSection() {
  const [activeTab, setActiveTab] = useState(plans[0]);
  const [modalImage, setModalImage] = useState<string | null>(null);

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

      {/* Swiper Carousel */}
      <div className="p-6">
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
                onClick={() => setModalImage(img)}
              >
                {/* FIXED SIZE IMAGE CONTAINER */}
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
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!modalImage}
        onRequestClose={() => setModalImage(null)}
        className="flex justify-center items-center h-full w-full"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.7)", zIndex: 50 },
          content: { background: "transparent", border: "none" },
        }}
      >
        {modalImage && (
          <Image
            src={modalImage}
            alt="Zoomed Plan"
            width={1200}
            height={800}
            className="rounded-lg object-contain"
          />
        )}
      </Modal>
    </section>
  );
}
