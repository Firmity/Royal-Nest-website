import HeroCarousel from "@/components/herocarousel";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import OurVerticals from "@/components/Ourverticals";
import ContactPage from "@/components/contactpage";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <AboutUs />
      <OurVerticals />
      <ContactPage />
    </>
  );
}
