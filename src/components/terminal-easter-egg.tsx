"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalEntry {
  type: "input" | "output";
  content: string | React.ReactNode;
}

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: "output",
      content:
        "Welcome to Douglas Seo&apos;s terminal. Type &apos;help&apos; for available commands.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+` or Cmd+` to toggle terminal
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      // Escape to close terminal
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    // Add user input to history
    setHistory((h) => [...h, { type: "input", content: `> ${cmd}` }]);

    // Process command
    const command = cmd.trim().toLowerCase();

    if (command === "help") {
      setHistory((h) => [
        ...h,
        {
          type: "output",
          content: (
            <div className="space-y-2">
              <p>Available commands:</p>
              <ul className="list-disc pl-4">
                <li>
                  <span className="text-primary">help</span> - Show this help
                  message
                </li>
                <li>
                  <span className="text-primary">about</span> - Learn about
                  Douglas Seo
                </li>
                <li>
                  <span className="text-primary">projects</span> - View featured
                  projects
                </li>
                <li>
                  <span className="text-primary">contact</span> - Get contact
                  information
                </li>
                <li>
                  <span className="text-primary">skills</span> - List technical
                  skills
                </li>
                <li>
                  <span className="text-primary">clear</span> - Clear terminal
                  history
                </li>
                <li>
                  <span className="text-primary">exit</span> - Close the
                  terminal
                </li>
              </ul>
            </div>
          ),
        },
      ]);
    } else if (command === "about") {
      setHistory((h) => [
        ...h,
        {
          type: "output",
          content: (
            <div className="space-y-2">
              <p>Douglas Seo - Full-Stack Software Engineer & Founder</p>
              <p>
                UC Berkeley EECS grad with a passion for building impactful
                products. Founder of Popper LLC, focusing on real-time
                applications, cloud-native systems, and AI interfaces.
              </p>
              <p>
                Technical expertise spans full-stack development, with a
                particular focus on React, React Native, Node.js, Python, and
                cloud infrastructure.
              </p>
            </div>
          ),
        },
      ]);
    } else if (command === "projects") {
      setHistory((h) => [
        ...h,
        {
          type: "output",
          content: (
            <div className="space-y-2">
              <p>Featured Projects:</p>
              <ul className="list-disc pl-4">
                <li>
                  <span className="text-primary">Popper</span> - Social rewards
                  app built with React Native, Firebase, and GCP. 1.1k+ users,
                  60+ partner businesses.
                </li>
                <li>
                  <span className="text-primary">CurlyHair.ai</span> - AI-driven
                  platform for multilingual speech processing and memory
                  capture. Python, NLP, Firebase, React.
                </li>
                <li>
                  <span className="text-primary">Chirp Microsystems @ TDK</span>{" "}
                  - Internship focused on Python/C++ automation for sensor data
                  processing and analysis.
                </li>
              </ul>
              <p>
                Type &apos;open [project-name]&apos; to learn more about a
                specific project.
              </p>
            </div>
          ),
        },
      ]);
    } else if (command.startsWith("open ")) {
      const projectName = command.substring(5).toLowerCase();
      if (projectName === "popper") {
        setHistory((h) => [
          ...h,
          {
            type: "output",
            content: (
              <div className="space-y-2">
                <p className="text-primary font-bold">Popper</p>
                <p>
                  A social rewards app connecting users with local businesses.
                  Built with React Native, Firebase, and GCP. Features include
                  QR-based rewards, geolocation, and real-time synchronization.
                </p>
                <p>
                  Currently serving 1,100+ users and 60+ partner businesses in
                  San Francisco.
                </p>
                <p>
                  <a
                    href="https://github.com/seoking23"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </p>
              </div>
            ),
          },
        ]);
      } else if (
        projectName === "curlyhair.ai" ||
        projectName === "curlyhair"
      ) {
        setHistory((h) => [
          ...h,
          {
            type: "output",
            content: (
              <div className="space-y-2">
                <p className="text-primary font-bold">CurlyHair.ai</p>
                <p>
                  An AI platform that preserves family stories through
                  multilingual speech processing. Built with Python, React, and
                  Firebase.
                </p>
                <p>
                  Features include speech recognition optimized for elderly
                  speakers, natural language understanding, and a knowledge
                  graph connecting related memories.
                </p>
                <p>
                  <a
                    href="https://github.com/seoking23"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </p>
              </div>
            ),
          },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          {
            type: "output",
            content: (
              <div className="space-y-2">
                <p>
                  Project &quot;{command.substring(5)}&quot; not found. Type
                  &apos;projects&apos; to see available projects.
                </p>
              </div>
            ),
          },
        ]);
      }
    } else if (command === "contact") {
      setHistory((h) => [
        ...h,
        {
          type: "output",
          content: (
            <div className="space-y-2">
              <p>Contact Information:</p>
              <ul className="list-disc pl-4">
                <li>Email: douglasseo.business@gmail.com</li>
                <li>Location: San Francisco, CA</li>
                <li>
                  GitHub:{" "}
                  <a
                    href="https://github.com/seoking23"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @seoking23
                  </a>
                </li>
                <li>
                  Twitter:{" "}
                  <a
                    href="https://twitter.com/seoking23"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @seoking23
                  </a>
                </li>
                <li>
                  LinkedIn:{" "}
                  <a
                    href="https://linkedin.com/in/douglas-seo-337133186/"
                    className="text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    douglas-seo-337133186
                  </a>
                </li>
              </ul>
            </div>
          ),
        },
      ]);
    } else if (command === "skills") {
      setHistory((h) => [
        ...h,
        {
          type: "output",
          content: (
            <div className="space-y-2">
              <p>Technical Skills:</p>
              <ul className="list-disc pl-4">
                <li>Languages: JavaScript, TypeScript, Python, C++, Go</li>
                <li>
                  Frontend: React, React Native, Next.js, HTML/CSS, Tailwind
                </li>
                <li>Backend: Node.js, Express, GraphQL, REST APIs</li>
                <li>Cloud: Firebase, GCP, AWS, Serverless</li>
                <li>Data: SQL, NoSQL, Redis, Data Processing</li>
                <li>AI/ML: NLP, TensorFlow, PyTorch</li>
                <li>DevOps: Git, CI/CD, Docker, Kubernetes</li>
              </ul>
            </div>
          ),
        },
      ]);
    } else if (command === "clear") {
      setHistory([]);
    } else if (command === "exit") {
      setIsOpen(false);
    } else if (command === "") {
      // Do nothing for empty command
    } else {
      setHistory((h) => [
        ...h,
        {
          type: "output",
          content: `Command not found: ${cmd}. Type &apos;help&apos; for available commands.`,
        },
      ]);
    }

    // Clear input
    setInput("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        aria-label="Open terminal"
      >
        <Command className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-black rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-gray-900">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full bg-red-500"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-400">douglasseo.dev ~ terminal</div>
          <div className="w-12"></div>
        </div>
        <div
          className="p-4 h-[60vh] overflow-y-auto font-mono text-sm"
          ref={historyRef}
        >
          {history.map((entry, i) => (
            <div
              key={i}
              className={cn("mb-2", {
                "text-green-400": entry.type === "input",
                "text-gray-300": entry.type === "output",
              })}
            >
              {entry.content}
            </div>
          ))}
          <div className="flex items-center text-green-400">
            <span>{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommand(input);
                }
              }}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 ml-2"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
