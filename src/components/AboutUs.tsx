'use client';

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import InfiniteNumbers from './ui/InfiniteNumbers';

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
    <section className="relative bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight">
              Reimagining Real<br />
              Estate, One<br />
              Community at a<br />
              Time
            </h1>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-base text-black leading-relaxed">
                From the historic BPTP bridge over the Agra Canal to the streets of Greater Faridabad and the vast townships in Gurugram, our journey has been one of transformation—turning untapped landscapes into bustling, thriving communities.
              </p>
              
              <p className="text-base text-black leading-relaxed">
                Over 24,500 units delivered, 50 million square feet crafted, but our proudest achievement?
              </p>
              
              <p className="text-base text-black leading-relaxed">
                Building places that feel like home.
              </p>
            </div>

            {/* Know More Button */}
            <button className="group bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors duration-300">
              <span className="text-base font-medium">Know More</span>
              <div className="w-2 h-2 bg-white rounded-full group-hover:scale-110 transition-all duration-300 group-hover:rotate-45 group-hover:rounded-none group-hover:w-3 group-hover:h-3 group-hover:bg-transparent group-hover:border-r-2 group-hover:border-t-2 group-hover:border-white"></div>
            </button>
          </div>
        </div>
        
      </div>
      
      {/* Infinite Numbers Section with Images */}
      <div className="relative mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Image */}
          <motion.div 
            className="hidden lg:block w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="/Herocarousel/Royal Nest Hill View Fountain Area.jpg" 
                alt="Fountain area with modern architecture" 
                className="w-full h-96 object-cover"
              />
            </div>
          </motion.div>
          
          {/* Right Side - Infinite Numbers and Bottom Image */}
          <div className="flex flex-col space-y-8 items-start">
            {/* Infinite Numbers */}
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <InfiniteNumbers 
                numbers={[
                  { value: "00+", label: "ACRES IN NCR" },
                  { value: "50", label: "GLOBALLY INSPIRED PROJECTS" },
                  { value: "2", label: "MILLION SQ FT" },
                  { value: "24,500+", label: "UNITS DELIVERED" }
                ]}
                speed="fast"
              />
            </motion.div>
            
            {/* Bottom Image */}
            <motion.div 
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img 
                  src="/Herocarousel/Royal Nest Hill View Fountain Area.jpg" 
                  alt="Luxury residential complex with modern design" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;