import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card3D } from "@/components/card-3d";
import { ProjectCard } from "@/components/project-card";

export const FeaturedProject: React.FC = () => {
  return (
    <div className="w-full">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight text-muted-foreground">
          Featured Project
        </h3>
        <Card3D depth={40} rotateIntensity={8} className="w-full">
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                Read More
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog/engineering-poppers-infrastructure"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                Technical Deep Dive
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
};
