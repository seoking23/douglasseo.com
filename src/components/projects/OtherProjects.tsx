import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card3D } from "@/components/card-3d";
import { ProjectCard } from "@/components/project-card";

export const OtherProjects: React.FC = () => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold tracking-tight text-muted-foreground">
        Other Projects
      </h3>
      <div className="grid gap-8 md:grid-cols-2">
        <Card3D depth={30} rotateIntensity={5}>
          <div className="relative">
            <ProjectCard
              title="CurlyHair.ai"
              description="AI-powered assistant trained to recommend personalized curly hair care routines based on texture, porosity, and lifestyle. Built with Python, OpenAI APIs, and a React frontend."
              imageSrc="/HazeIcon.png?height=300&width=600"
              tags={["AI", "Personalized", "React", "Python", "Haircare"]}
              demoUrl="https://curly-hair-ai.com"
              repoUrl="https://github.com/seoking23"
              details="CurlyHair.ai helps users understand curl types, suggest routines, and recommend products in a conversational flow."
            />
            <div className="absolute bottom-6 right-6">
              <Link
                href="/blog/launching-curlyhair-ai"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                Read More
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card3D>
        <Card3D depth={30} rotateIntensity={5}>
          <div className="relative">
            <ProjectCard
              title="Chirp Microsystems @ TDK"
              description="Internship focused on Python/C++ automation for sensor data processing and analysis."
              imageSrc="/chirp-microsystems.jpg?height=300&width=600"
              tags={["Python", "C++", "Automation", "Sensors"]}
              demoUrl="https://invensense.tdk.com/smartsonic/"
              repoUrl="https://github.com/seoking23"
              details="Developed automation tools for ultrasonic sensor testing and data analysis, improving testing efficiency by 40%."
            />
          </div>
        </Card3D>
        <Card3D depth={30} rotateIntensity={5}>
          <div className="relative">
            <ProjectCard
              title="tomylovemiwa.com"
              description="A Valentine's Day love game website featuring 6 love-themed games, each unlocking a personal love letter. Includes a custom-built Japan trip itinerary with maps and budget planning."
              imageSrc="/tomylovemiwa-icon.png?height=300&width=600"
              tags={[
                "React",
                "Supabase",
                "Google Maps",
                "Valentine's Day",
                "Personal Project",
              ]}
              demoUrl="https://tomylovemiwa.com"
              repoUrl="https://github.com/seoking23"
              details="A romantic Valentine's Day gift featuring interactive games, love letters, and a surprise Japan trip planner. Built with React and Supabase for game progression and photo uploads."
            />
            <div className="absolute bottom-6 right-6">
              <Link
                href="/blog/building-love-into-code"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                Read More
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card3D>
        <Card3D depth={30} rotateIntensity={5}>
          <div className="relative">
            <ProjectCard
              title="Personal Portfolio"
              description="This website! Built with Next.js, Tailwind CSS, and modern web technologies."
              imageSrc="/doug_grad_with_bear.JPG?height=300&width=600"
              tags={["Next.js", "Tailwind CSS", "React"]}
              demoUrl="#"
              repoUrl="https://github.com/seoking23"
              details="A responsive personal website showcasing my projects, skills, and writing. Features modern UI/UX with animations and interactive elements."
            />
          </div>
        </Card3D>
      </div>
    </div>
  );
};
