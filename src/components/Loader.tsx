import Image from "next/image";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
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
