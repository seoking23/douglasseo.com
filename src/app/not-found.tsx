"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Lost in the Digital Void
          </h2>
          <p className="text-lg text-muted-foreground">
            Looks like you've ventured into uncharted territory. While I'm
            passionate about exploring new frontiers in tech, this page isn't
            one of them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Safety
          </Link>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="https://github.com/douglasseo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/douglasseo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:contact@douglasseo.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email Contact"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-8 space-y-4"
        >
          <p className="text-sm text-muted-foreground">
            While you're here, why not check out some of my{" "}
            <Link href="/projects" className="text-primary hover:underline">
              featured projects
            </Link>{" "}
            or read my{" "}
            <Link href="/blog" className="text-primary hover:underline">
              latest blog posts
            </Link>
            ?
          </p>
          <p className="text-sm text-muted-foreground">
            If you believe this page should exist,{" "}
            <Link
              href="mailto:contact@douglasseo.com"
              className="text-primary hover:underline"
            >
              let me know
            </Link>
            . I'm always happy to connect!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
