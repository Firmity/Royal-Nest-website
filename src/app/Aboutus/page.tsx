"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import ContactPage from "@/components/contactpage";
import Image from "next/image";

// --- DATA ARRAYS ---
const milestones = [
  { year: "1999", title: "First Residential Complex", description: "Launch of first residential complex under Nest Apartments, sold out during the construction phase.", img: "/Herocarousel/Royal Nest Hill View Fountain Area.jpg" },
  { year: "2000", title: "Formal Incorporation", description: "Formal incorporation of Omkar Nest (P) Ltd under the companies Act, 1956 with the registrar of the companies, NCT of Delhi and Haryana, established on 05-10-2000.", img: "/Herocarousel/Royal Nest Hill View Penthouse Terrace.jpg" },
  { year: "2007", title: "Expansion to J&K", description: "Entered State of Jammu & Kashmir with landmark group housing projects.", img: "/Herocarousel/Royal Nest Hill View Pool to Landscape Area.jpg" },
  { year: "2008", title: "NCR Projects Delivered", description: "Successfully delivered over 15 low-rise residential projects in Delhi NCR.", img: "/Herocarousel/Royal Nest Hill View Fountain Area.jpg" },
  { year: "2010", title: "Green Building Launch", description: "Launched first gold-standard, IGBC-compliant group housing project with 1000+ apartments and commercial complex in Delhi NCR.", img: "/Herocarousel/Royal Nest Hill View Penthouse Terrace.jpg" },
  { year: "2016", title: "Facility Management", description: "Entered professional estate service & facility management sector with Ufirm.in.", img: "/Herocarousel/Royal Nest Hill View Pool to Landscape Area.jpg" },
  { year: "2018", title: "INR 100 Cr Turnover", description: "Crossed the INR 100 Cr turnover milestone.", img: "/Herocarousel/Royal Nest Hill View Fountain Area.jpg" },
  { year: "2020", title: "Hospitality Expansion", description: "Expanded into hospitality with a Radisson Group partnership.", img: "/Herocarousel/Royal Nest Hill View Penthouse Terrace.jpg" },
  { year: "2022", title: "Dharamshala Entry", description: "Entered Dharamshala, Himachal Pradesh with green building-holiday apartment and boutique hotels with RoyalNestDharamshala.com.", img: "/Herocarousel/Royal Nest Hill View Pool to Landscape Area.jpg" },
  { year: "2023", title: "Health & Fitness", description: "Partnered with Gold’s Gym and Cult-Fit to enter the health & fitness industry.", img: "/Herocarousel/Royal Nest Hill View Fountain Area.jpg" },
  { year: "2025", title: "Royal Nest Hill View", description: "Royal Nest Hill View – Jammu & Kashmir’s tallest and most premium green residential tower, featuring a glass façade, French windows, and energy-efficient homes with ample natural light and ventilation.", img: "/Herocarousel/Royal Nest Hill View Penthouse Terrace.jpg" },
];
const businessAreas = [
  { icon: "fa-building", title: "Residential Real Estate Development", desc: "Premium homes and communities across India." },
  { icon: "fa-city", title: "Commercial & Mixed-Use Developments", desc: "Modern commercial and mixed-use spaces." },
  { icon: "fa-hotel", title: "Hospitality", desc: "In partnership with Radisson Hotel & Boutique Hotel." },
  { icon: "fa-tools", title: "Integrated Facility Management", desc: "Via Ufirm.in, managing 12+ million sq. ft. across India." },
  { icon: "fa-cubes", title: "Construction Materials", desc: "Via Atal Concrete, Kapsha Royal Nest Construction Co." },
  { icon: "fa-dumbbell", title: "Health & Fitness", desc: "In collaboration with Gold’s Gym and Cult-Fit." },
  { icon: "fa-seedling", title: "Agriculture & Food Processing", desc: "In partnership with Adani Group, 5,000 MT CA stores." },
];
const projects = [
  { name: "Royal Nest Saffron", location: "Katra (Jammu)", soon: false },
  { name: "Royal Nest Green", location: "GK (Jammu)", soon: false },
  { name: "Srinagar", location: "", soon: true },
  { name: "Delhi NCR", location: "", soon: true },
];
const trustedBy = [
  "IOCL", "GAIL", "Indian Army", "Ministry of Defence", "TCS", "IBM", "SBI", "Fortis Hospital"
];
const certifications = [
  { icon: "fa-certificate", title: "ISO Certified", desc: "International Standards" },
  { icon: "fa-leaf", title: "IGBC Certified", desc: "Green Building Council" },
];
const partners = [
  { name: "Radisson Group", icon: "fa-hotel" },
  { name: "Adani Group", icon: "fa-industry" },
  { name: "Gold’s Gym", icon: "fa-dumbbell" },
  { name: "Cult-Fit", icon: "fa-heart-pulse" },
];

// --- REUSABLE COMPONENTS ---
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.section
    className={"w-full py-16 px-4 " + className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.section>
);
const Card = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <motion.div
    className="flex items-start gap-4 bg-blue-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-100"
    whileHover={{ scale: 1.04 }}
  >
    <span className="text-blue-600 text-3xl"><i className={`fa-solid ${icon}`}></i></span>
    <div>
      <h3 className="font-semibold text-lg text-black">{title}</h3>
      <p className="text-black text-sm">{desc}</p>
    </div>
  </motion.div>
);
const Badge = ({ text }: { text: string }) => (
  <motion.div
    className="rounded-full px-6 py-3 font-semibold shadow bg-blue-100 text-black text-lg border border-blue-200 hover:scale-105 hover:shadow-lg transition-all cursor-pointer"
    whileHover={{ scale: 1.08 }}
  >
    {text}
  </motion.div>
);
const CertCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <motion.div
    className="flex flex-col items-center bg-blue-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-100"
    whileHover={{ scale: 1.04 }}
  >
    <span className="text-4xl text-blue-600 mb-2"><i className={`fa-solid ${icon}`}></i></span>
    <span className="font-bold text-black">{title}</span>
    <span className="text-xs text-black group-hover:text-blue-700 transition-colors">{desc}</span>
  </motion.div>
);
const PartnerCard = ({ icon, name }: { icon: string; name: string }) => (
  <motion.div
    className="flex flex-col items-center bg-blue-100 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-200"
    whileHover={{ scale: 1.04 }}
  >
    <span className="text-4xl mb-2 text-blue-700"><i className={`fa-solid ${icon}`}></i></span>
    <span className="font-bold text-black">{name}</span>
  </motion.div>
);

// Animated Counter component
const AnimatedNumber = ({ to }: { to: number }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  useEffect(() => {
    if (!inView) return;
    const start = 0;
    const duration = 1500;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * to));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [inView, to]);

  return (
    <span ref={ref} style={{ display: "inline-block" }}>{value}</span>
  );
};


export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-x-hidden">
      <Navbar />
      {/* Hero Section with animated overlay */}
      <section className="relative flex items-center justify-center min-h-[80vh] w-full overflow-hidden">
        <Image
          src="/Aboutus/about.webp"
          alt="Hero"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
        />
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl tracking-wide"
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            ABOUT ROYAL NEST GROUP
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white max-w-2xl mx-auto font-light drop-shadow-2xl"
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Building sustainable luxury and vibrant communities across India since 1999
          </motion.p>
        </div>
      </section>

      {/* Experience & Stats Section */}
      <Section className="bg-[#faf6ee] relative">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <p className="text-lg text-black mb-4 text-center">
            Royal Nest Group, the flagship brand of Omkar Nest (P) Limited, is a name synonymous with quality, structural integrity, and sustainability in the Indian real estate and infrastructure sector. Founded by visionaries—Late Shri Omkar Nath Shastri, Mr. Kamal Krishan, and current Managing Director Mr. Vimal Kumar—the group has built a legacy rooted in strong foundations, certified green construction, and a commitment to delivering buildings that inspire trust and long-term value.
          </p>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mt-6">
            {[
              { num: 100, label: "Projects", suffix: "+" },
              { num: 25, label: "Years of experience", suffix: "+" },
              { num: 7, label: "million sq. m. delivered", suffix: "+" },
            ].map((stat, i) => (
              <motion.div key={i} className="flex flex-col items-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.2 }}>
                <span className="text-6xl font-light text-black">
                  <AnimatedNumber to={stat.num} />{stat.suffix}
                </span>
                <span className="text-gray-400 text-lg mt-2">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Green Building Commitment Section */}
      <Section className="bg-blue-50 border-b border-blue-100 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center tracking-tight drop-shadow-sm">Our Green Building Commitment</h2>
          <p className="text-lg text-black text-center">
            Since 2010, Royal Nest Group has pledged to construct only green building norm-compliant structures, integrating sustainable practices into every aspect of development. Our projects emphasize natural ventilation, energy efficiency, and the well-being of residents, in alignment with Indian Green Building Council (IGBC) standards.
          </p>
        </div>
      </Section>

      {/* Core Business Areas Section */}
      <Section className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center tracking-tight drop-shadow-sm">Core Business Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {businessAreas.map((area, i) => <Card key={i} {...area} />)}
          </div>
        </div>
      </Section>

      {/* Our Vision & Aim Section */}
      <Section className="bg-blue-50 border-b border-blue-100 flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md"
          >
            <Image
              src="/Aboutus/Vision.jpg"
              alt="Our Vision"
              width={600}
              height={400}
              className="object-cover w-full h-72 md:h-96 hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            <h2 className="text-3xl font-extrabold mb-6 text-black text-center md:text-left tracking-tight drop-shadow-sm">Our Vision</h2>
            <p className="text-lg text-black mb-8 text-center md:text-left">
              To be India’s most respected and environmentally committed real estate group, known for delivering green-certified, quality-driven, and future-ready buildings that enhance lives, communities, and the planet.
            </p>
            <h2 className="text-2xl font-bold mb-4 text-black text-center md:text-left tracking-tight">Our Aim</h2>
            <p className="text-lg text-black text-center md:text-left">Building sustainable luxury within reach.</p>
          </motion.div>
        </div>
      </Section>

      {/* Key Milestones Section (Horizontal Scroll Cards) */}
      <Section className="bg-white border-b border-blue-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center tracking-tight drop-shadow-sm">Key Milestones of Royal Nest Group</h2>
          <div className="w-full overflow-x-auto custom-scrollbar">
            <div className="relative inline-block ">
              <div className="flex gap-10 px-10">
                {milestones.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="w-[300px] shrink-0 bg-blue-50 rounded-xl shadow-md p-6 border border-blue-100 flex flex-col gap-2 hover:shadow-lg transition-shadow"

                  >
                    <img src={item.img} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                    <span className="text-xs text-white font-bold bg-blue-500 px-2 py-1 rounded uppercase self-start">{item.title}</span>
                    <h3 className="text-xl text-black font-bold mt-2">{item.year}</h3>
                    <p className="text-black mt-2 h-20 overflow-y-auto pr-1">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Upcoming Projects Section */}
      <Section className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center tracking-tight drop-shadow-sm">Upcoming Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                className="group bg-blue-50 rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300 cursor-pointer relative overflow-hidden border border-blue-100"
                whileHover={{ scale: 1.04 }}
              >
                <span className="text-4xl mb-3 text-blue-600"><i className="fa-solid fa-building-flag"></i></span>
                <h3 className="font-bold text-lg text-black mb-1">{project.name}</h3>
                <p className="text-black text-sm mb-2">{project.location}</p>
                {project.soon && (
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold animate-pulse">Coming Soon!</span>
                )}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Trusted By Section */}
      <Section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center tracking-tight drop-shadow-sm">Trusted by India’s Leading Institutions</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {trustedBy.map((name, idx) => <Badge key={idx} text={name} />)}
          </div>
          <p className="text-md text-black text-center mt-8">...and many more.</p>
        </div>
      </Section>

      {/* Certified Excellence Section */}
      <Section className="bg-white border-b border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center tracking-tight drop-shadow-sm">Certified Excellence</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {certifications.map((cert, idx) => <CertCard key={idx} {...cert} />)}
          </div>
        </div>
      </Section>

      {/* Strategic Partnerships Section */}
      <Section className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-10 text-black text-center tracking-tight drop-shadow-sm">Strategic Partnerships</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, idx) => <PartnerCard key={idx} {...partner} />)}
          </div>
        </div>
      </Section>
      <ContactPage />
    </div>
  );
}