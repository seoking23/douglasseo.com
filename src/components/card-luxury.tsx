"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardLuxuryProps {
  children: React.ReactNode;
  className?: string;
  hoverIntensity?: number;
  glowIntensity?: number;
  borderGradient?: boolean;
  shimmerEffect?: boolean;
}

export function CardLuxury({
  children,
  className = "",
  hoverIntensity = 0.02,
  glowIntensity = 0.5,
  borderGradient = true,
  shimmerEffect = true,
}: CardLuxuryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for subtle parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth movement
  const translateX = useSpring(
    useTransform(x, [-0.5, 0.5], [-hoverIntensity * 100, hoverIntensity * 100]),
    {
      stiffness: 150,
      damping: 20,
      mass: 1.2,
    }
  );

  const translateY = useSpring(
    useTransform(y, [-0.5, 0.5], [-hoverIntensity * 100, hoverIntensity * 100]),
    {
      stiffness: 150,
      damping: 20,
      mass: 1.2,
    }
  );

  // Scale spring for hover effect
  const scale = useSpring(1, {
    stiffness: 150,
    damping: 20,
    mass: 1.2,
  });

  // Glow effect spring
  const glow = useSpring(0, {
    stiffness: 150,
    damping: 20,
    mass: 1.2,
  });

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  }

  function onMouseEnter() {
    setIsHovered(true);
    scale.set(1.02);
    glow.set(glowIntensity);
  }

  function onMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
    glow.set(0);
  }

  // Scroll animation variants
  const scrollVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative group",
        "transition-all duration-500 ease-out",
        "before:absolute before:inset-0 before:rounded-xl before:transition-opacity before:duration-500",
        borderGradient &&
          "before:bg-gradient-to-r before:from-primary/20 before:via-primary/10 before:to-primary/20 before:opacity-0 hover:before:opacity-100",
        shimmerEffect &&
          "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:ease-in-out",
        className
      )}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollVariants}
      style={{
        boxShadow: useTransform(
          glow,
          (value) =>
            `0 0 ${value * 20}px ${value * 10}px rgba(var(--primary), ${
              value * 0.1
            })`
        ),
      }}
    >
      <motion.div
        style={{
          x: translateX,
          y: translateY,
          scale,
        }}
        className={cn(
          "relative z-10 h-full w-full rounded-xl",
          "bg-card/95 backdrop-blur-sm",
          "border border-border/50",
          "transition-colors duration-300",
          "hover:border-primary/30",
          "overflow-hidden"
        )}
      >
        <div className="relative h-full w-full">{children}</div>
      </motion.div>
    </motion.div>
  );
}
