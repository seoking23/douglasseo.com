"use client";

import { ArrowUpRight, FileDown } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPostCard } from "@/components/blog-post-card";
import { ResumeViewer } from "@/components/resume-viewer";
import { PageTransition } from "@/components/page-transition";
import { TechStack } from "@/components/tech-stack";
import { ScrollEffects } from "@/components/scroll-effects";
import { Card3D } from "@/components/card-3d";
import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/projects/Projects";
import { useAnchorScroll } from "@/hooks/useAnchorScroll";

export function HomeContent() {
  useAnchorScroll();

  return (
    <PageTransition>
      <main className="flex-1">
        <Hero />

        {/* About Section */}
        <section
          id="about"
          className="container px-4 md:px-6 py-16 md:py-24 lg:py-32 bg-muted/50 scroll-mt-16"
        >
          <div className="mx-auto grid max-w-5xl gap-12 lg:gap-16">
            <ScrollEffects perspective>
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  About Me
                </h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  UC Berkeley EECS grad with a passion for building impactful
                  products
                </p>
              </div>
            </ScrollEffects>
            <ScrollEffects delay={0.2} perspective>
              <div className="space-y-6 md:space-y-8">
                <p className="text-lg leading-relaxed">
                  I&apos;m a creative, impact-driven engineer with startup grit.
                  As the founder of Popper LLC, I focus on building real-time
                  applications, cloud-native systems, and AI interfaces that
                  bridge digital and real-world value.
                </p>
                <p className="text-lg leading-relaxed">
                  My technical expertise spans full-stack development, with a
                  particular focus on React, React Native, Node.js, Python, and
                  cloud infrastructure. I&apos;m passionate about creating
                  software that solves real problems and delivers tangible value
                  to users.
                </p>
                <p className="text-lg leading-relaxed">
                  When I&apos;m not coding, you can find me exploring new
                  technologies, mentoring aspiring developers, or enjoying the
                  vibrant tech scene in San Francisco. I&apos;m always open to
                  discussing new ideas and potential collaborations.
                </p>
              </div>
            </ScrollEffects>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section
          id="tech-stack"
          className="container px-4 md:px-6 py-16 md:py-24 lg:py-32 scroll-mt-16"
        >
          <div className="mx-auto grid max-w-5xl gap-12 lg:gap-16">
            <ScrollEffects perspective>
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Tech Stack
                </h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  Technologies and tools I work with
                </p>
              </div>
            </ScrollEffects>
            <TechStack />
          </div>
        </section>

        <Projects />

        {/* Writing Section */}
        <section
          id="writing"
          className="container px-4 md:px-6 py-16 md:py-24 lg:py-32 bg-muted/50 scroll-mt-16"
        >
          <div className="mx-auto grid max-w-5xl gap-12 lg:gap-16">
            <ScrollEffects perspective>
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Writing
                </h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  Technical articles, tutorials, and thoughts on software
                  development
                </p>
              </div>
            </ScrollEffects>
            <div className="grid gap-8 md:grid-cols-2">
              <Card3D depth={20} rotateIntensity={3}>
                <BlogPostCard
                  title="Building in Public: The Popper Journey"
                  excerpt="Sharing the challenges and lessons learned while building Popper from the ground up and growing to over 1,000 users."
                  date="March 15, 2023"
                  readTime="10 min read"
                  slug="/blog/building-in-public"
                />
              </Card3D>
              <Card3D depth={20} rotateIntensity={3}>
                <BlogPostCard
                  title="Engineering Popper's Infrastructure"
                  excerpt="A deep dive into the technical architecture behind Popper, including our approach to scalability and real-time synchronization."
                  date="February 22, 2023"
                  readTime="12 min read"
                  slug="/blog/engineering-poppers-infrastructure"
                />
              </Card3D>
              <Card3D depth={20} rotateIntensity={3}>
                <BlogPostCard
                  title="CurlyHair.ai: Building a Domain-Specific AI for Haircare"
                  excerpt="The journey of creating an AI platform that helps users understand and care for their curly hair through personalized recommendations and routines."
                  date="January 10, 2023"
                  readTime="8 min read"
                  slug="/blog/launching-curlyhair-ai"
                />
              </Card3D>
              <Card3D depth={20} rotateIntensity={3}>
                <BlogPostCard
                  title="Optimizing React Native for Performance"
                  excerpt="Practical techniques for improving the performance of React Native applications based on lessons learned from Popper."
                  date="December 5, 2022"
                  readTime="15 min read"
                  slug="/blog/react-native-performance"
                />
              </Card3D>
            </div>
            <ScrollEffects>
              <div className="flex justify-center pt-8">
                <Link href="/blog">
                  <Button
                    variant="outline"
                    className="gap-2 group px-6 py-2.5 text-base"
                  >
                    Read All Articles
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </div>
            </ScrollEffects>
          </div>
        </section>

        {/* Resume Section */}
        <section
          id="resume"
          className="container px-4 md:px-6 py-16 md:py-24 lg:py-32 scroll-mt-16"
        >
          <div className="mx-auto grid max-w-5xl gap-12 lg:gap-16">
            <ScrollEffects perspective>
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Resume
                </h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  My professional experience and education
                </p>
              </div>
            </ScrollEffects>
            <ScrollEffects delay={0.2} perspective>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-6">
                    Experience
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">
                          Co-Founder at Bashnota
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2024 - Present
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        Co-founded and developing the world&apos;s best tool for
                        computational research, combining Jupyter notebooks with
                        a Notion-style UI/UX and built-in AI agents. Building a
                        revolutionary platform for researchers and data
                        scientists.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">
                          Software Engineer (Employee #1) at Werkflow
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2024 - Present
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        Leading the development of an all-in-one software
                        platform for dancers, helping them manage their
                        community, finances, and turn their passion into a
                        career. Building core infrastructure and features as the
                        first engineering hire.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">
                          Founder & CEO at Popper LLC
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2022 - 2024
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        Founded and developed a social rewards app with 1.1k+
                        users and 60+ partner businesses. Built with React
                        Native, Firebase, and GCP.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">
                          Freelance Developer
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2022 - 2024
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        Worked on various web and mobile development projects
                        for clients across different industries. Specialized in
                        React and Node.js applications.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">
                          Software Engineering Intern at Chirp Microsystems
                          (TDK)
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2019 - 2019
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        Developed Python/C++ automation tools for sensor data
                        processing and analysis. Improved testing efficiency by
                        40%.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-6">
                    Education
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold">
                          B.S. in Electrical Engineering and Computer Science
                          (EECS)
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2018 - 2022
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        University of California, Berkeley
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight mb-6">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>JavaScript</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>React</Badge>
                    <Badge>React Native</Badge>
                    <Badge>Node.js</Badge>
                    <Badge>Python</Badge>
                    <Badge>Firebase</Badge>
                    <Badge>GCP</Badge>
                    <Badge>AWS</Badge>
                    <Badge>C++</Badge>
                    <Badge>GraphQL</Badge>
                    <Badge>REST APIs</Badge>
                    <Badge>Git</Badge>
                    <Badge>CI/CD</Badge>
                    <Badge>Machine Learning</Badge>
                    <Badge>NLP</Badge>
                  </div>
                </div>
              </div>
            </ScrollEffects>
            <ScrollEffects delay={0.3} perspective>
              <div className="mt-12">
                <ResumeViewer />
              </div>
            </ScrollEffects>
            <ScrollEffects delay={0.4}>
              <div className="flex justify-center pt-8">
                <Link
                  href="/DouglasSeo_FullStackSoftwareEngineer.pdf"
                  target="_blank"
                  download
                >
                  <Button
                    variant="outline"
                    className="gap-2 group px-6 py-2.5 text-base"
                  >
                    Download Full Resume
                    <FileDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  </Button>
                </Link>
              </div>
            </ScrollEffects>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="container px-4 md:px-6 py-16 md:py-24 lg:py-32 bg-muted/50 scroll-mt-16"
        >
          <div className="mx-auto grid max-w-5xl gap-12 lg:gap-16">
            <ScrollEffects perspective>
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Contact
                </h2>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  Get in touch for opportunities or just to say hello
                </p>
              </div>
            </ScrollEffects>
            <div className="grid gap-8 lg:grid-cols-2">
              <Card3D depth={20} rotateIntensity={3}>
                <Card className="shadow-md h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send a Message</CardTitle>
                    <CardDescription className="text-lg">
                      Fill out the form below and I&apos;ll get back to you as
                      soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="grid gap-6">
                      <div className="grid gap-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium leading-none"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your message"
                        />
                      </div>
                      <Button type="submit" className="w-full py-2.5 text-base">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </Card3D>
              <Card3D depth={20} rotateIntensity={3}>
                <Card className="shadow-md h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Alternative ways to get in touch with me
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-lg text-muted-foreground">
                        douglasseo.business@gmail.com
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-lg text-muted-foreground">
                        San Francisco, CA
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Social Media</div>
                      <div className="flex gap-6">
                        <Link
                          href="https://github.com/seoking23"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                        >
                          GitHub
                        </Link>
                        <Link
                          href="https://twitter.com/seoking23"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Twitter
                        </Link>
                        <Link
                          href="https://instagram.com/douglas_seo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Instagram
                        </Link>
                        <Link
                          href="https://linkedin.com/in/douglas-seo-337133186/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                        >
                          LinkedIn
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-lg text-muted-foreground">
                      I&apos;m currently open to freelance opportunities and
                      interesting projects
                    </p>
                  </CardFooter>
                </Card>
              </Card3D>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
