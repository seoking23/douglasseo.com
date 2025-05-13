import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CardLuxury } from "@/components/card-luxury";
import { ProjectCard } from "@/components/project-card";

// Custom CSS class for bubble cursor using emoji

export const FeaturedProject: React.FC = () => {
  return (
    <div className="w-full">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight text-muted-foreground">
          Featured Projects
        </h3>
        <div className="space-y-8">
          <CardLuxury
            hoverIntensity={0.015}
            glowIntensity={0.4}
            className="w-full"
          >
            <div className="relative">
              <div className="w-full">
                <ProjectCard
                  title="Bashnota"
                  description="The world's best tool for computational research, combining Jupyter notebooks with a Notion-style UI/UX and built-in AI agents. A revolutionary platform for researchers and data scientists."
                  imageSrc="/bashnota-logo.svg?height=400&width=800"
                  tags={[
                    "AI",
                    "Research",
                    "Startup",
                    "Computational",
                    "Notion-style",
                  ]}
                  demoUrl="https://bashnota.com"
                  repoUrl="https://github.com/bashnota"
                  details="Bashnota revolutionizes computational research by combining the power of Jupyter notebooks with an intuitive Notion-style interface and built-in AI agents. The platform enables researchers to work offline while maintaining a beautiful, collaborative environment for their work."
                />
              </div>
              <div className="absolute bottom-6 right-6 flex gap-6">
                <Link
                  href="/blog/collaborating-with-bashnota"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                >
                  Read More
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </CardLuxury>
          <CardLuxury
            hoverIntensity={0.015}
            glowIntensity={0.4}
            className={`w-full`}
          >
            <div className="relative">
              <div className="w-full">
                <ProjectCard
                  title="Popper"
                  description="Social rewards app built with React Native, Firebase, and GCP. 1.1k+ users, 60+ partner businesses. Native modules, QR, geolocation, real-time sync."
                  imageSrc="/popper-logo.png?height=400&width=800"
                  tags={[
                    "Mobile",
                    "Startup",
                    "Cloud",
                    "React Native",
                    "Firebase",
                  ]}
                  demoUrl="https://popper.social"
                  repoUrl="https://github.com/Popper-Social"
                  details="Popper connects users with local businesses through a rewards platform. Users earn points with purchases and redeem them for exclusive rewards."
                />
              </div>
              <div className="absolute bottom-6 right-6 flex gap-6">
                <Link
                  href="/blog/building-in-public"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                >
                  Read More
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/blog/engineering-poppers-infrastructure"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
                >
                  Technical Deep Dive
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </CardLuxury>
        </div>
      </div>
    </div>
  );
};
