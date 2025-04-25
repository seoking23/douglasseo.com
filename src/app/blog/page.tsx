import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog-post-card";

export default function BlogPage() {
  const posts = [
    {
      title: "Building Love into Code: How I Made tomylovemiwa.com",
      excerpt:
        "The story of creating a Valentine's Day love game website with 6 interactive games and a surprise Japan trip planner.",
      date: "February 14, 2024",
      readTime: "10 min read",
      slug: "/blog/building-love-into-code",
    },
    {
      title: "Building in Public: Lessons from Launching Popper",
      excerpt:
        "Sharing the challenges and lessons learned while building Popper from the ground up and growing to over 1,000 users.",
      date: "March 15, 2023",
      readTime: "10 min read",
      slug: "/blog/building-in-public",
    },
    {
      title: "Engineering Popper's Infra: Firebase at Scale",
      excerpt:
        "A deep dive into the technical architecture behind Popper, including our approach to scalability and real-time synchronization.",
      date: "February 22, 2023",
      readTime: "12 min read",
      slug: "/blog/engineering-poppers-infrastructure",
    },
    {
      title: "CurlyHair.ai: Building a Domain-Specific AI for Haircare",
      excerpt:
        "The journey of creating an AI platform that helps users understand and care for their curly hair through personalized recommendations and routines.",
      date: "January 10, 2023",
      readTime: "8 min read",
      slug: "/blog/launching-curlyhair-ai",
    },
    {
      title: "From UC Berkeley to Founder: What School Didn't Teach Me",
      excerpt:
        "Reflections on the gap between academic education and the real-world skills needed to build and grow a startup.",
      date: "December 5, 2022",
      readTime: "15 min read",
      slug: "/blog/from-uc-berkeley-to-founder",
    },
    {
      title: "Designing for Delight: What Makes Developer UX Feel Magical",
      excerpt:
        "Breakdown of good developer UX: fast loads, subtle animation, feedback on interaction, component design clarity.",
      date: "November 15, 2022",
      readTime: "10 min read",
      slug: "/blog/designing-for-delight",
    },
  ];

  return (
    <div className="container max-w-5xl py-12">
      <Link href="/#writing">
        <Button variant="ghost" className="mb-8 pl-0 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Button>
      </Link>

      <div className="space-y-2 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Thoughts on software development, startups, and technology
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post, index) => (
          <BlogPostCard
            key={index}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            readTime={post.readTime}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
}
