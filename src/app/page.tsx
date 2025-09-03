"use client"
import React, { useState} from "react";
import HeroCarousel from "@/components/herocarousel";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import OurVerticals from "@/components/Ourverticals";
import ContactPage from "@/components/contactpage";
import PopupModal from "@/components/PopupModal";

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  // Optionally, make the modal disappear after X seconds:
  // useEffect(() => {
  //   const timer = setTimeout(() => setShowModal(false), 7000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <Navbar />
      <HeroCarousel />
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
