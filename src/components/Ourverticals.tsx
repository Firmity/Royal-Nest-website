'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface VerticalCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  index: number;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ title, imageSrc, imageAlt, link, index }) => {
  return (
    <Link href={link} className="block group">
      <div className="relative h-96 lg:h-[500px] bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl w-full">
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-fill transition-transform duration-500 group-hover:scale-110"
            priority={index < 2}
          />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center p-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 transition-colors duration-300">
            {title}
          </h2>
          <div className="mt-8">
            <span className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300">
              Learn More
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const OurVerticals: React.FC = () => {
  const verticals = [
    {
      title: "Luxury Residences",
      imageSrc: "/verticals.jpg",
      imageAlt: "Luxury Residences - Fountain Area",
      link: "/residences"
    },
    {
      title: "Commercial Spaces",
      imageSrc: "/verticals.jpg",
      imageAlt: "Commercial Spaces - Penthouse Terrace",
      link: "/commercial"
    },
    {
      title: "Hospitality & Hotels",
      imageSrc: "/verticals.jpg",
      imageAlt: "Hospitality & Hotels - Pool and Landscape",
      link: "/hospitality"
    },
    {
      title: "Infrastructure Development",
      imageSrc: "/verticals.jpg",
      imageAlt: "Infrastructure Development - Modern Architecture",
      link: "/infrastructure"
    }
  ];

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Our Verticals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our diverse portfolio of excellence across multiple sectors
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {verticals.map((vertical, index) => (
            <VerticalCard
              key={index}
              title={vertical.title}
              imageSrc={vertical.imageSrc}
              imageAlt={vertical.imageAlt}
              link={vertical.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurVerticals;