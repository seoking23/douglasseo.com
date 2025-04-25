"use client";

import { ArrowUpRight, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ScrollEffects } from "@/components/scroll-effects";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  details: string;
}

export function ProjectCard({
  title,
  description,
  imageSrc,
  tags,
  demoUrl,
  repoUrl,
  details,
}: ProjectCardProps) {
  // Convert image path to optimized WebP version
  const optimizedImageSrc = imageSrc
    .replace(/\.[^.]+$/, ".webp")
    .replace("/public/", "/optimized/");

  return (
    <ScrollEffects perspective rotate rotateAmount={5} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={optimizedImageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {details && (
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-background/80 backdrop-blur-sm p-1.5 rounded-full cursor-help">
                      <Info className="h-4 w-4 text-primary" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[250px]">
                    <p>{details}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex gap-4">
            <Link
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View Project
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View Code
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </ScrollEffects>
  );
}
