"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useAnchorScroll = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Handle hash-based navigation
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;

      // Remove the # from the hash
      const targetId = hash.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Get the navbar height for offset
        const navbar = document.querySelector("header");
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;

        // Get the current scroll position
        const currentScroll = window.scrollY;

        // Get the target element's position relative to the viewport
        const targetRect = targetElement.getBoundingClientRect();

        // Calculate the target position relative to the current scroll
        const targetPosition = currentScroll + targetRect.top - navbarHeight;

        // Only scroll if we're not already at the target position
        if (Math.abs(currentScroll - targetPosition) > 1) {
          // Use requestAnimationFrame for smoother scrolling
          requestAnimationFrame(() => {
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          });
        }
      } else {
        console.warn(
          `[useAnchorScroll] Target element with id "${targetId}" not found in ${pathname}`
        );
      }
    };

    // Initial scroll on page load with a small delay to ensure DOM is ready
    const initialScrollTimeout = setTimeout(handleHashScroll, 100);

    // Handle hash changes
    const handleHashChange = () => {
      handleHashScroll();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearTimeout(initialScrollTimeout);
      // Reset scroll behavior
      document.documentElement.style.scrollBehavior = "";
    };
  }, [pathname, searchParams]);
};
