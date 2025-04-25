"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  className?: string;
}

export function BlogPostCard({
  title,
  excerpt,
  date,
  readTime,
  slug,
  className,
}: BlogPostCardProps) {
  return (
    <Card
      className={cn("flex flex-col h-full group blog-post-card", className)}
    >
      <CardContent className="flex-1 p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <time dateTime={date}>{date}</time>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mt-3 line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={slug}
          className="flex items-center gap-1 text-sm font-medium group/link"
        >
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all group-hover/link:after:w-full group-hover/link:text-primary transition-colors">
            Read More
          </span>
          <ArrowRight className="h-4 w-4 transform transition-transform group-hover/link:translate-x-1 group-hover/link:text-primary" />
        </Link>
      </CardFooter>
    </Card>
  );
}
