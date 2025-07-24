'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface VerticalCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  index: number;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ title, imageSrc, imageAlt, link }) => {
  return (
    <Link href={link} className="block group h-full">
      <div className="relative h-96 w-64 mx-auto sm:h-80 sm:w-full md:h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 256px, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />
        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide text-center">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

const OurVerticals: React.FC = () => {
  const verticals = [
    {
      title: "Integrated Facility Management",
      description: "Tech-enabled facility management services",
      imageSrc: "/Verticals/facility management cleaning.webp",
      imageAlt: "Integrated Facility Management",
      link: "/infrastructure"
    },
    {
      title: "Health & Fitness",
      description: "Comprehensive health and fitness solutions",
      imageSrc: "/Verticals/gym.jpg",
      imageAlt: "Health & Fitness",
      link: "/infrastructure"
    },
    {
      title: "Agriculture & Food Processing",
      description: "Sustainable agriculture and food processing",
      imageSrc: "/Verticals/Cold-link.jpg",
      imageAlt: "Agriculture & Food Processing",
      link: "/infrastructure"
    },
    {
      title: "Residential Real Estate Development",
      description: "Eco-friendly buildings with green solutions",
      imageSrc: "/Herocarousel/Royal Nest Hill View Parking Area Evening.jpg",
      imageAlt: "Luxury Residences - Fountain Area",
      link: "/residences"
    },
    {
      title: "Hospitality",
      description: "Premium hospitality experience with world-class amenities",
      imageSrc: "/Verticals/hospitality.jpg",
      imageAlt: "Hospitality & Hotels - Pool and Landscape",
      link: "/hospitality"
    },
    {
      title: "Construction Materials",
      description: "Quality materials for robust construction",
      imageSrc: "/Verticals/rmc.jpg",
      imageAlt: "Construction Materials",
      link: "/infrastructure"
    },
    {
      title: "Horticulture",
      description: "Green landscaping and horticulture services",
      imageSrc: "/Verticals/Horticulture.png",
      imageAlt: "Horticulture",
      link: "/infrastructure"
    },
    {
      title: "Food & Catering",
      description: "Quality food and catering solutions",
      imageSrc: "/Verticals/food.jpg",
      imageAlt: "Food & Catering",
      link: "/infrastructure"
    },
  ];

  return (
    <section className="min-h-[70vh] sm:min-h-screen bg-white bg-opacity-80 flex items-center justify-center relative">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-6">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-800 mb-4 sm:mb-6">
            Our Verticals
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our diverse portfolio of excellence across multiple sectors
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {verticals.map((vertical, index) => (
            <Link href={vertical.link} key={index} className="group block rounded-xl overflow-hidden shadow-lg bg-black bg-opacity-60 hover:bg-opacity-80 transition-all duration-300 relative h-72 flex flex-col justify-end">
              <div className="absolute inset-0 z-0">
                <Image
                  src={vertical.imageSrc}
                  alt={vertical.imageAlt}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300" />
              </div>
              <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">{vertical.title}</h2>
                <p className="text-base text-gray-200 font-medium drop-shadow-md">{vertical.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurVerticals;