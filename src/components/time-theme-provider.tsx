"use client";

import { createContext, useContext, useEffect, useState } from "react";

type TimeTheme = "day" | "night";

interface TimeThemeContextType {
  timeTheme: TimeTheme;
}

const TimeThemeContext = createContext<TimeThemeContextType>({
  timeTheme: "day",
});

export function useTimeTheme() {
  return useContext(TimeThemeContext);
}

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
  const [timeTheme, setTimeTheme] = useState<TimeTheme>("day");

  useEffect(() => {
    const updateTimeTheme = () => {
      const hour = new Date().getHours();
      setTimeTheme(hour >= 6 && hour < 18 ? "day" : "night");
    };

    // Initial update
    updateTimeTheme();

    // Update every minute
    const interval = setInterval(updateTimeTheme, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimeThemeContext.Provider value={{ timeTheme }}>
      {children}
    </TimeThemeContext.Provider>
  );
}
