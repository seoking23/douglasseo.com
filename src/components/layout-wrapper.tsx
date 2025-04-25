"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { TimeThemeProvider } from "@/components/time-theme-provider";
import { BackgroundAnimation } from "@/components/background-animation";
import { TerminalEasterEgg } from "@/components/terminal-easter-egg";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="douglasseo-theme">
      <TimeThemeProvider>
        <BackgroundAnimation />
        <TerminalEasterEgg />
        {children}
      </TimeThemeProvider>
    </ThemeProvider>
  );
};
