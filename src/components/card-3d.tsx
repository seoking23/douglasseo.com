"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  rotateIntensity?: number;
  scaleOnHover?: boolean;
}

export function Card3D({
  children,
  className = "",
  depth = 50,
  rotateIntensity = 10,
  scaleOnHover = true,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smoother movement
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [rotateIntensity, -rotateIntensity]),
    {
      stiffness: 300,
      damping: 30,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-rotateIntensity, rotateIntensity]),
    {
      stiffness: 300,
      damping: 30,
    }
  );

  const scale = useSpring(1, {
    stiffness: 300,
    damping: 30,
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
    if (scaleOnHover) {
      scale.set(1.05);
    }
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  // Scroll-based animation
  const scrollVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 5 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("perspective-container", className)}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={scrollVariants}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          transformPerspective: "1000px",
        }}
        className="w-full h-full"
      >
        <motion.div
          style={{
            transform: `translateZ(${-depth}px)`,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
