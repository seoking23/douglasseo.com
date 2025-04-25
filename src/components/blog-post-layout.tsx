"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  title: string;
  date: string;
  readTime: string;
  className?: string;
}

export function BlogPostLayout({
  children,
  title,
  date,
  readTime,
  className,
}: BlogPostLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn("container max-w-3xl py-12 md:py-24 lg:py-32", className)}
    >
      <Link href="/blog">
        <Button
          variant="ghost"
          className="mb-8 pl-0 flex items-center gap-2 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all posts
        </Button>
      </Link>

      <article className="relative">
        <header className="space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif">
            {title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time dateTime={date}>{date}</time>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {children}
        </div>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </article>
    </div>
  );
}
