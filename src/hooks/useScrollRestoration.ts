"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useScrollRestoration = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0);

    // Force a reflow to ensure proper layout calculation
    document.body.style.display = "none";
    void document.body.offsetHeight; // Force reflow
    document.body.style.display = "";

    // Ensure hero section is visible
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.style.opacity = "1";
      heroSection.style.visibility = "visible";
      heroSection.style.transform = "translateY(0)";
    }
  }, [pathname, searchParams]);
};
