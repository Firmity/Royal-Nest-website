"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Show loader on route (pathname) change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {children}
      <Footer />
    </>
  );
} 