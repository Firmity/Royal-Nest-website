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
      title: "Residential Real Estate Development",
      imageSrc: "/Herocarousel/Royal Nest Hill View Parking Area Evening.jpg",
      imageAlt: "Luxury Residences - Fountain Area",
      link: "/residences"
    },
    {
      title: "Hospitality",
      imageSrc: "/Verticals/hospitality.jpg",
      imageAlt: "Hospitality & Hotels - Pool and Landscape",
      link: "/hospitality"
    },
    {
      title: "Integrated Facility Management",
      imageSrc: "/Verticals/facility management cleaning.webp",
      imageAlt: "Integrated Facility Management",
      link: "/infrastructure"
    },
    {
      title: "Construction Materials",
      imageSrc: "/Verticals/rmc.jpg",
      imageAlt: "Construction Materials",
      link: "/infrastructure"
    },
    {
      title: "Health & Fitness",
      imageSrc: "/Verticals/gym.jpg",
      imageAlt: "Health & Fitness",
      link: "/infrastructure"
    },
    {
      title: "Agriculture & Food Processing",
      imageSrc: "/Verticals/Cold-link.jpg",
      imageAlt: "Agriculture & Food Processing",
      link: "/infrastructure"
    }
  ];

  return (
    <section className="min-h-[70vh] sm:min-h-screen bg-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-6">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-800 mb-4 sm:mb-6">
            Our Verticals
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our diverse portfolio of excellence across multiple sectors
          </p>
        </div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="w-full"
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 12 },
            640: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
        >
          {verticals.map((vertical, index) => (
            <SwiperSlide key={index} className="flex h-96 w-64 mx-auto sm:h-80 sm:w-full md:h-96 lg:h-[500px] shadow-lg">
              <VerticalCard
                title={vertical.title}
                imageSrc={vertical.imageSrc}
                imageAlt={vertical.imageAlt}
                link={vertical.link}
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurVerticals;