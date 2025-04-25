"use client";
import React from "react";
import { ScrollEffects } from "@/components/scroll-effects";
import { HeroTitle } from "./HeroTitle";
import { HeroTerminal } from "./HeroTerminal";
import { HeroButtons } from "./HeroButtons";
import { HeroImage } from "./HeroImage";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

export const Hero: React.FC = () => {
  useScrollRestoration();

  return (
    <section
      id="hero-section"
      className="container relative z-10 px-4 md:px-6 py-12 md:py-24 lg:py-32 overflow-visible"
      style={{
        isolation: "isolate",
        transform: "translateZ(0)",
      }}
    >
      <ScrollEffects parallax parallaxSpeed={-0.1} perspective>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <HeroTitle />
            <HeroTerminal />
            <HeroButtons />
          </div>
          <HeroImage />
        </div>
      </ScrollEffects>
    </section>
  );
};
