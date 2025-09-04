'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

export default function Loader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.overlay}></div>
      <Image
        src="/Royalnest.png"
        alt="Royal Nest Logo"
        width={180}
        height={180}
        className={styles.logo}
        priority
      />
    </div>
  );
}