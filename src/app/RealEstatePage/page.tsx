"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const properties = [
  {
    status: "Ongoing",
    image: "/Herocarousel/Royal Nest Hill View  Swimming pool.jpg",
    name: "Royal Nest Hill View",
    price: "₹ 65 Lakhs",
    units: "2 BHK & 3 BHK",
    category: "Residential",
    registration: ["RERA-JK-JMU-1-2025"],
  },
  {
    status: "Ongoing",
    image: "/Herocarousel/front top view_rn forestview.jpg",
    name: "Royal Nest Forest View",
    price: "₹ 45 Lakhs",
    units: "2 BHK & 3 BHK",
    category: "Residential",
    registration: ["HPRERAKAN2023036/P"],
    exploreLink: "https://royalnestdharamshala.com/", // external URL
  }
];

const categories = [
  { label: "All", value: "All" },
  { label: "Residential", value: "Residential" },
  { label: "Construction materials", value: "Construction materials" },
];

export default function RealEstatePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Completed", "New Launch", "Ongoing"];

  const filteredProperties = properties.filter((prop) => {
    const categoryMatch =
      selectedCategory === "All" || prop.category === selectedCategory;
    const statusMatch =
      selectedFilter === "All" || prop.status === selectedFilter;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200">
      <Navbar />

      {/* Header */}
      <header
        className="relative bg-cover bg-center text-center pt-35 pb-40"
        style={{ backgroundImage: "url('/RealEstate/Hero.jpg')" }}
      >
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-md">
          Real Estate Development
        </h1>
      </header>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="bg-white w-full lg:w-[220px] border-r border-blue-800 px-4 py-6">
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li
                key={cat.value}
                id={cat.value === "Residential" ? "residential" : undefined}
                onClick={() => setSelectedCategory(cat.value)}
                className={`cursor-pointer px-4 py-2 rounded-lg transition ${
                  selectedCategory === cat.value
                    ? "bg-blue-100 text-blue-900 font-bold"
                    : "text-blue-700"
                }`}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-10 py-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl mb-6 shadow-sm">
            {filters.map((filter) => (
              <span
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`cursor-pointer pb-1 transition border-b-2 ${
                  selectedFilter === filter
                    ? "border-blue-700 text-blue-700 font-bold"
                    : "border-transparent text-black"
                }`}
              >
                {filter}
              </span>
            ))}
          </div>

          {/* Property Cards */}
          {filteredProperties.length === 0 ? (
            <p className="text-lg text-black">
              No properties found for this category and status.
            </p>
          ) : (
            filteredProperties.map((prop, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row bg-white rounded-3xl shadow-lg mb-8 overflow-hidden"
              >
                <div className="relative w-full md:w-[420px] h-[240px] md:h-[320px]">
                  <Image
                    src={prop.image}
                    alt={prop.name}
                    fill
                    className="object-cover rounded-3xl"
                  />
                  <span className="absolute top-6 left-6 bg-blue-700 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-md">
                    {prop.status}
                  </span>
                </div>

                <div className="flex-1 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-black">
                    {prop.name}
                  </h3>
                  <p className="text-xl text-blue-700 mb-2">
                    Starting at{" "}
                    <span className="font-bold text-2xl">{prop.price}</span>
                  </p>
                  <p className="mb-2 text-black">
                    <strong>Unit:</strong> {prop.units}
                  </p>
                  <div>
                    <strong className="text-black">Registration No:</strong>
                    <ul className="list-disc pl-5 text-black">
                      {prop.registration.map((reg, i) => (
                        <li key={i}>{reg}</li>
                      ))}
                    </ul>
                  </div>
                  {prop.exploreLink ? (
                    <a
                      href={prop.exploreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-6"
                    >
                      <button className="px-6 py-2 border-2 border-blue-700 text-blue-700 bg-blue-50 font-semibold rounded-full text-lg hover:bg-blue-100 transition">
                        Explore
                      </button>
                    </a>
                  ) : (
                    <Link href={`/HillViewPage`} className="inline-block mt-6">
                      <button className="px-6 py-2 border-2 border-blue-700 text-blue-700 bg-blue-50 font-semibold rounded-full text-lg hover:bg-blue-100 transition">
                        Explore
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </main>

        {/* Scroll to Top Button */}
        <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="fixed right-4 bottom-4 w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-800 transition"
  aria-label="Scroll to Top"
>
  ↑
</button>
      </div>
    </div>
  );
}