"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/Herocarousel/banner1.webp",
    title: "Amstoria | Sector 102, Gurugram",
    link: "#"
  },
  {
    image: "/Herocarousel/banner1.webp",
    title: "Another Property | Location",
    link: "#"
  },
  {
    image: "/Herocarousel/banner1.webp",
    title: "Sample Project | City",
    link: "#"
  }
];

const ARROW_ANIM_DURATION = 0.7;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [arrowAnim, setArrowAnim] = useState("");
  const [showArrow, setShowArrow] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setSlideDirection("right");
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % slides.length);
          setIsTransitioning(false);
          setSlideDirection(null);
        }, 400);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  if (!slides.length || !slides[current]) return null;

  // Enhanced arrow animation handler
  const handleArrowAnim = (direction: "up" | "down") => {
    setArrowAnim(direction);
    setTimeout(() => {
      setShowArrow(false);
      setTimeout(() => {
        setArrowAnim("");
        setShowArrow(true);
      }, 100);
    }, ARROW_ANIM_DURATION * 1000);
  };

  // Manual navigation with smooth transitions
  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;
    
    const direction = index > current ? "right" : "left";
    setSlideDirection(direction);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
      setSlideDirection(null);
    }, 400);
  };

  // Dot styles with enhanced animations
  const dotSize = 12;
  const dotActiveSize = 20;
  const dotGap = 16;

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {slides.map((slide, idx) => (
          <img
            key={`${slide.image}-${idx}`}
            src={slide.image}
            alt={slide.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              opacity: idx === current ? 1 : 0,
              transform: idx === current ? "scale(1)" : "scale(1.05)",
              transition: "opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              zIndex: idx === current ? 1 : 0,
            }}
            className={
              idx === current && slideDirection
                ? slideDirection === "right"
                  ? "slide-in-right"
                  : "slide-in-left"
                : ""
            }
          />
        ))}
        
        {/* Enhanced bottom border with animation */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 90,
            height: 2,
            background: "linear-gradient(90deg, transparent, #fff, transparent)",
            opacity: 0.7,
            zIndex: 2,
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        
        {/* Enhanced bottom left overlay */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 32,
            display: "flex",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <a
            href={slides[current].link}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fff, #f8f9fa)",
              marginLeft: 32,
              marginRight: 24,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              textDecoration: "none",
              cursor: "pointer",
              overflow: "hidden",
              transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            className="float"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => handleArrowAnim("up")}
            onMouseLeave={() => handleArrowAnim("down")}
          >
            {showArrow && (
              <span
                className={
                  arrowAnim === "up"
                    ? "arrow-anim-up"
                    : arrowAnim === "down"
                    ? "arrow-anim-down"
                    : ""
                }
                style={{ 
                  fontSize: 28, 
                  color: "#222", 
                  display: "inline-block",
                  transition: "transform 0.3s ease"
                }}
              >
                ↗
              </span>
            )}
          </a>
          <div
            style={{
              color: "#fff",
              fontSize: 36,
              fontWeight: 500,
              textShadow: "0 2px 8px rgba(0,0,0,0.32)",
              marginRight: 32,
              opacity: 0,
              animation: "fadeInScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards",
            }}
          >
            {slides[current].title}
          </div>
        </div>
        
        {/* Enhanced dots with click functionality */}
        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: 32,
            display: "flex",
            alignItems: "center",
            gap: dotGap,
            zIndex: 4,
          }}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: idx === current ? dotActiveSize : dotSize,
                height: idx === current ? dotActiveSize : dotSize,
                borderRadius: "50%",
                border: idx === current ? "3px solid #fff" : "2px solid rgba(255,255,255,0.5)",
                background: idx === current 
                  ? "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))" 
                  : "rgba(255,255,255,0.8)",
                opacity: idx === current ? 1 : 0.7,
                transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
                transform: idx === current ? "scale(1.1)" : "scale(1)",
                boxShadow: idx === current 
                  ? "0 4px 12px rgba(255,255,255,0.3)" 
                  : "0 2px 6px rgba(255,255,255,0.2)",
              }}
              className={idx === current ? "pulse" : ""}
            />
          ))}
        </div>
      </div>
    </>
  );
}