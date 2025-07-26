'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import InfiniteNumbers from './ui/InfiniteNumbers';
import Link from 'next/link';
// import Image from 'next/image';

const AboutUs: React.FC = () => {
  // Simple animation variants for images and numbers
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easeOut
      }
    }
  };

  return (
    <section className="relative bg-white py-10 px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left Side - Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl xl:text-5xl font-bold text-black leading-tight">
              Reimagining Real Estate,<br />
              One Community at a Time
            </h1>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-black leading-relaxed">
                Royal Nest Group, the flagship of Omkar Nest (P) Ltd., has delivered 7+ million sq. ft. over 25+ years across Delhi NCR, J&K, and beyond. Founded on values of quality, sustainability, and trust, we’ve built 24,500+ homes and vibrant communities.<br /> <br />
                More than buildings — we create homes.
              </p>
            </div>

            {/* Know More Button */}
            <Link href="/Aboutus"><button className="group bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300">
              <span className="text-base font-medium">Know More</span>
              <div className="w-2 h-2 bg-white rounded-full group-hover:scale-110 transition-all duration-300 group-hover:rotate-45 group-hover:rounded-none group-hover:w-3 group-hover:h-3 group-hover:bg-transparent group-hover:border-r-2 group-hover:border-t-2 group-hover:border-white"></div>
            </button>
            </Link>
          </div>
        </div>

      </div>

      {/* Infinite Numbers Section with Images */}
      <div className="relative mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Image
          <motion.div
            className="hidden lg:block w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[34/33]">
              <Image
                src="/Royal Nest Hill View  TOWER C NIGHT.jpg"
                alt="Fountain area with modern architecture"
                fill
                className="object-cover"
              />
            </div>
          </motion.div> */}

          {/* Right Side - Infinite Numbers and Bottom Image */}
          <div className="flex flex-col space-y-8 items-start">
            {/* Infinite Numbers */}
            <motion.div
              className="w-full"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <InfiniteNumbers
                numbers={[
                  { value: "30+", label: "PROJECTS COMPLETED" },
                  { value: "25", label: "YEAR OF EXPERINECE" },
                  { value: "7", label: "MILLION SQ FT" }
                ]}
                speed="fast"
              />
            </motion.div>

            {/* Bottom Image */}
            {/* <motion.div
              className="w-full"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/Herocarousel/front ground_level_rn_forestview.jpg"
                  alt="Luxury residential complex with modern design"
                  width={1200}
                  height={600}
                  className="object-cover"
                />
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;