"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }

    // Get the hash from the href
    const hash = e.currentTarget.hash;
    if (!hash) return;

    // Prevent default behavior
    e.preventDefault();

    // Get the target element
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
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }

      // Update the URL without triggering a page reload
      window.history.pushState(null, "", hash);
    } else {
      console.warn(`[Navbar] Target element with id "${targetId}" not found`);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <motion.span
            className="text-primary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Douglas Seo
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            {["about", "projects", "writing", "resume", "contact"].map(
              (item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={`/#${item}`}
                    className="text-sm font-medium relative group"
                    onClick={handleNavItemClick}
                  >
                    <span className="relative">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </span>
                  </Link>
                </motion.div>
              )
            )}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b"
          >
            <nav className="container flex flex-col gap-6 p-6">
              {["about", "projects", "writing", "resume", "contact"].map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/#${item}`}
                      className="text-lg font-medium hover:text-primary transition-colors py-2 border-b flex items-center justify-between"
                      onClick={handleNavItemClick}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
