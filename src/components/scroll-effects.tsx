"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface ScrollEffectsProps {
  children: React.ReactNode;
  className?: string;
  perspective?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
  rotate?: boolean;
  rotateAmount?: number;
  scale?: boolean;
  scaleAmount?: number;
  delay?: number;
}

export function ScrollEffects({
  children,
  className = "",
  perspective = true,
  parallax = false,
  parallaxSpeed = 0.5,
  rotate = false,
  rotateAmount = 5,
}: ScrollEffectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    const scrollThreshold = 2; // Increased threshold to prevent micro-movements
    const timeThreshold = 16; // ~60fps

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const currentTime = performance.now();
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        const timeDelta = currentTime - lastTime;

        // Only update if scroll delta is significant enough and enough time has passed
        if (Math.abs(delta) > scrollThreshold && timeDelta > timeThreshold) {
          // Apply easing to the scroll delta
          const easedDelta = delta * Math.min(1, timeDelta / 32);
          setScrollY((prev) => prev + easedDelta * parallaxSpeed);
          lastScrollY = currentScrollY;
          lastTime = currentTime;
        }
      });
    };

    if (parallax) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (parallax) {
        window.removeEventListener("scroll", handleScroll);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [parallax, parallaxSpeed]);

  const getTransform = () => {
    const transforms = [];

    if (perspective) {
      transforms.push("perspective(1000px)");
    }

    if (parallax) {
      transforms.push(`translateY(${scrollY}px)`);
    }

    if (rotate && isInView) {
      transforms.push(`rotateX(${rotateAmount}deg)`);
    }

    return transforms.join(" ");
  };

  const getTransition = () => {
    const transitions = ["transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"];
    return transitions.join(", ");
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: getTransform(),
        transition: getTransition(),
        willChange: "transform",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
