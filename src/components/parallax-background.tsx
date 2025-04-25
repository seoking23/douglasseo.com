"use client"

import { useEffect, useRef } from "react"

interface ParallaxBackgroundProps {
  className?: string
}

export function ParallaxBackground({ className = "" }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const element = ref.current
      if (element) {
        // Move the background slower than the scroll speed
        element.style.transform = `translateY(${scrollY * 0.5}px)`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      className={`absolute inset-0 z-[-1] overflow-hidden ${className}`}
      style={{ willChange: "transform" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/0 dark:from-primary/10 dark:to-background/0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
    </div>
  )
}
