"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechItem {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export function TechStack() {
  const techItems: TechItem[] = [
    {
      name: "JavaScript",
      icon: "JS",
      color: "bg-yellow-400",
      description:
        "Core language for web development, used across frontend and backend systems.",
    },
    {
      name: "TypeScript",
      icon: "TS",
      color: "bg-blue-500",
      description:
        "Strongly typed programming language that builds on JavaScript for safer code.",
    },
    {
      name: "React",
      icon: "⚛️",
      color: "bg-cyan-400",
      description:
        "Library for building user interfaces with component-based architecture.",
    },
    {
      name: "React Native",
      icon: "📱",
      color: "bg-blue-400",
      description:
        "Framework for building native mobile applications using React.",
    },
    {
      name: "Node.js",
      icon: "🟢",
      color: "bg-green-500",
      description:
        "JavaScript runtime for server-side and networking applications.",
    },
    {
      name: "Firebase",
      icon: "🔥",
      color: "bg-amber-500",
      description:
        "Platform for building web and mobile applications without server-side code.",
    },
    {
      name: "GCP",
      icon: "☁️",
      color: "bg-blue-600",
      description:
        "Suite of cloud computing services for building and deploying applications.",
    },
    {
      name: "Python",
      icon: "🐍",
      color: "bg-blue-500",
      description:
        "General-purpose language used for data science, AI, and backend services.",
    },
    {
      name: "Golang",
      icon: "Go",
      color: "bg-cyan-500",
      description:
        "Open source programming language designed for simplicity and efficiency.",
    },
    {
      name: "NLP",
      icon: "🗣️",
      color: "bg-purple-500",
      description:
        "Field of AI focused on interactions between computers and human language.",
    },
    {
      name: "AWS",
      icon: "☁️",
      color: "bg-orange-500",
      description:
        "Comprehensive cloud platform offering over 200 fully featured services.",
    },
    {
      name: "GraphQL",
      icon: "◢",
      color: "bg-pink-600",
      description:
        "Query language for APIs and runtime for executing those queries.",
    },
  ];

  return (
    <ScrollReveal>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <motion.div
                  className="relative flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:shadow-md transition-all cursor-pointer"
                  whileHover={{ y: -5, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-3`}
                  >
                    <span className="text-white font-bold text-lg">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-center">
                    {item.name}
                  </h3>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px] text-center">
                <p>{item.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </ScrollReveal>
  );
}
