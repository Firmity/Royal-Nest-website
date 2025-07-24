"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/Herocarousel/Royal Nest Hill View Pool to Landscape Area.jpg",
    title: "Royal Nest Hill View | Sainik Colony Extension | Jammu",
    link: "/HillViewPage"
  },
  {
    image: "/Herocarousel/Royal Nest Hill View  Swimming pool.jpg",
    title: "Royal Nest Hill View | Sainik Colony Extension | Jammu",
    link: "/HillViewPage"
  },
  {
    image: "/Herocarousel/front top view_rn forestview.jpg",
    title: "Royalnest Forest View | Dharamshala | Himachal Pradesh",
    link: "#"
  },
  {
    image: "/Herocarousel/ROYAL-SAFIRE-ROAD-17-01-20-HIRES.tif",
    title: "Royal Nest Sapphire | Kunjwani Bypass | Jammu",
    link: "#"
  },
  {
    image: "/Herocarousel/Royal Nest, GNW.jpg",
    title: "Royal Nest | Greater Noida West | Uttar Pradesh",
    link: "#"
  }
];

const ARROW_ANIM_DURATION = 0.7;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [arrowAnim, setArrowAnim] = useState("");
  const [showArrow, setShowArrow] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % slides.length);
          setIsTransitioning(false);
        }, 600);
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

  // Manual navigation with fade transitions
  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 600);
  };

  // Dot styles with enhanced animations
  const dotSize = 12;
  const dotActiveSize = 20;
  const dotGap = 16;

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="herocarousel-container"
      >
        {slides.map((slide, idx) => (
          <Image
            key={`${slide.image}-${idx}`}
            src={slide.image}
            alt={slide.title}
            fill
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: idx === current ? 1 : 0,
              transition: "opacity 0.6s ease-in-out, transform 6s ease-in-out",
              zIndex: idx === current ? 1 : 0,
              transform: idx === current ? undefined : "scale(1)",
            }}
            className={idx === current ? "zoom-in-out" : ""}
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
            className="herocarousel-title"
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
              className={(idx === current ? "pulse " : "") + "herocarousel-dot"}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 600px) {
          .herocarousel-container {
            height: 60vh !important;
            min-height: 320px !important;
            padding: 0 8px !important;
          }
          .zoom-in-out {
            animation: zoomInOutMobile 6s ease-in-out infinite;
          }
          .pulse {
            animation: pulseMobile 3s ease-in-out infinite;
          }
          .float {
            width: 44px !important;
            height: 44px !important;
            margin-left: 8px !important;
            margin-right: 8px !important;
          }
          .arrow-anim-up, .arrow-anim-down {
            font-size: 22px !important;
          }
          .herocarousel-title {
            font-size: 15px !important;
            margin-right: 8px !important;
            max-width: 60vw !important;
            white-space: normal !important;
            line-height: 1.2 !important;
          }
          .herocarousel-dot {
            width: 12px !important;
            height: 12px !important;
            min-width: 12px !important;
            min-height: 12px !important;
          }
          .herocarousel-dot.pulse {
            box-shadow: 0 2px 6px rgba(255,255,255,0.2) !important;
          }
          .herocarousel-dot {
            margin: 0 2px !important;
          }
          .herocarousel-container > div[style*='bottom: 90px'] {
            bottom: 60px !important;
          }
          .herocarousel-container > div[style*='bottom: 32px'] {
            bottom: 12px !important;
          }
        }
        @keyframes zoomInOutMobile {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes pulseMobile {
          0%, 100% { box-shadow: 0 2px 6px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 4px 12px rgba(255,255,255,0.3); }
        }
      `}</style>
    </>
  );
}