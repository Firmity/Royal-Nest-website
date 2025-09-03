"use client"
import React, { useState } from "react";
import HeroCarousel from "@/components/herocarousel";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import OurVerticals from "@/components/Ourverticals";
import ContactPage from "@/components/contactpage";
import PopupModal from "@/components/PopupModal";
import { Mail, Phone } from "lucide-react";

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Navbar />
      <HeroCarousel />

      {/* Full-width contact bar */}
      <div
        className="w-full bg-blue-900 text-white flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 py-3 px-2 sm:px-0"
        style={{ margin: 0, borderRadius: 0 }}
      >
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Mail className="w-5 h-5 text-blue-200" />
          <a
            href="mailto:info@royalnestgroup.com"
            className="hover:underline underline-offset-2"
          >
            info@royalnestgroup.com
          </a>
        </div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Phone className="w-5 h-5 text-blue-200" />
          <a
            href="tel:9540009950"
            className="hover:underline underline-offset-2"
          >
            9540009950
          </a>
        </div>
      </div>

      <AboutUs />
      <OurVerticals />
      <ContactPage />
      <PopupModal
        show={showModal}
        onClose={() => setShowModal(false)}
        redirectUrl="/HillViewPage"
        imageUrl="/tallest residential project royalnest group.png"
      />
    </>
  );
}
