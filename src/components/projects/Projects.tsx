import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollEffects } from "@/components/scroll-effects";
import { FeaturedProject } from "./FeaturedProject";
import { OtherProjects } from "./OtherProjects";

export const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="container px-4 md:px-6 py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-5xl gap-12 lg:gap-16">
        <ScrollEffects perspective>
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Featured Projects
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              A selection of my recent work and personal projects
            </p>
          </div>
        </ScrollEffects>

        <div className="space-y-16">
          <FeaturedProject />
          <OtherProjects />
        </div>

        <ScrollEffects>
          <div className="flex justify-center pt-8">
            <Link
              href="https://github.com/seoking23"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="gap-2 group px-6 py-2.5 text-base"
              >
                View All Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </ScrollEffects>
      </div>
    </section>
  );
};
