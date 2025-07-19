'use client';

import * as React from "react";
import { cn } from "@/utils/cn";

interface InfiniteNumbersProps {
  numbers: Array<{
    value: string;
    label: string;
    speed?: number;
  }>;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteNumbers({
  numbers,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = "",
}: InfiniteNumbersProps) {
  const baseSpeed = {
    slow: "80s",
    normal: "40s",
    fast: "20s",
  }[speed];

  const animationClass =
    direction === "right" ? "marquee-reverse" : "marquee";

  return (
    <div className={cn("overflow-hidden relative w-full py-8 bg-white", className)}>
      <div
        className={cn(
          "flex w-max gap-8 whitespace-nowrap",
          animationClass,
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: baseSpeed,
        }}
      >
        {/* Repeat items twice using CSS animation only */}
        {[...numbers, ...numbers].map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 flex-shrink-0"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-6xl font-bold text-black">
                {item.value}
              </div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600 mt-2">
                {item.label}
              </div>
            </div>
            <div className="w-px h-8 md:h-12 bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteNumbers; 