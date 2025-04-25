import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BerkeleyToFounderPage() {
  return (
    <div className="container max-w-4xl py-12">
      <Link href="/blog">
        <Button variant="ghost" className="mb-8 pl-0 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Button>
      </Link>

      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          From UC Berkeley to Founder: What School Didn&apos;t Teach Me
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <time dateTime="2022-12-05">December 5, 2022</time>
          <span>•</span>
          <span>6 min read</span>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="lead">
          Berkeley&apos;s EECS program gave me a world-class technical
          education, but the journey from classroom to founding Popper revealed
          significant gaps between academic excellence and startup success.
          Here&apos;s what I wish I&apos;d known.
        </p>

        <h2>The Academic Foundation</h2>

        <p>
          Let me be clear: my Berkeley education was invaluable. I learned to
          design efficient algorithms, build complex systems, and approach
          problems with analytical rigor. The technical foundation gave me
          confidence to tackle challenging engineering problems and speak the
          language of technology with precision.
        </p>

        <p>
          Courses like CS 162 (Operating Systems) taught me how complex systems
          interact, while CS 170 (Algorithms) gave me tools to optimize for
          efficiency. These fundamentals serve me daily as I architect solutions
          for Popper.
        </p>

        <p>
          But as I transitioned from engineer to founder, I discovered that
          technical excellence was necessary but far from sufficient for startup
          success.
        </p>

        <h2>The Missing Curriculum</h2>

        <h3>1. Product Thinking vs. Engineering Thinking</h3>

        <p>
          In school, problems are well-defined with clear evaluation criteria.
          In startups, you&apos;re simultaneously defining the problem and
          creating the solution. This requires a fundamentally different
          mindset.
        </p>

        <p>
          I spent three weeks optimizing our reward calculation algorithm to
          handle theoretical scale before realizing I hadn&apos;t validated
          whether users even valued the feature. Academic training taught me to
          perfect solutions; startup reality taught me to question whether I was
          solving the right problem.
        </p>

        <h3>2. User Psychology</h3>

        <p>
          Berkeley taught me how computers think. It didn&apos;t teach me how
          humans think. Understanding user psychology—their motivations, mental
          models, and decision-making processes—proved far more challenging than
          any technical problem.
        </p>

        <p>
          My first user interviews were embarrassingly ineffective. I asked
          leading questions, focused on features instead of problems, and
          interpreted responses through my own biased lens. Learning to truly
          understand users required unlearning the solution-first mindset that
          had served me well in engineering courses.
        </p>

        <h3>3. Decision-Making Under Uncertainty</h3>

        <p>
          Academic problems have correct answers. Startup problems rarely do.
          Learning to make good decisions with incomplete information—and to
          adjust quickly when those decisions prove wrong—was a painful
          adjustment.
        </p>

        <p>
          In our first year, we faced a critical decision: focus on user
          acquisition or business partnerships? With limited resources, we
          couldn&apos;t effectively do both. No algorithm could provide the
          answer; we had to make a bet based on limited data and be prepared to
          pivot if necessary.
        </p>

        <h2>The Real-World Education</h2>

        <p>
          So how did I fill these knowledge gaps? Through what I now call my
          &quot;second education&quot;:
        </p>

        <h3>1. Learning from Users</h3>

        <p>
          Nothing accelerated my learning like direct user interaction. Watching
          people use our product, observing their confusion and delight,
          provided insights no textbook could offer. I now consider user
          research as fundamental to product development as code itself.
        </p>

        <h3>2. Building a Diverse Network</h3>

        <p>
          My Berkeley network was predominantly technical. Building Popper
          required expanding beyond that comfort zone to include designers,
          marketers, business strategists, and industry experts. These diverse
          perspectives helped me see blind spots my technical training had
          created.
        </p>

        <h3>3. Embracing Failure as Education</h3>

        <p>
          In academia, failure often carries significant penalties. In startups,
          it&apos;s an essential learning tool. Our first pricing model failed
          spectacularly, but the insights from that failure informed a revised
          approach that&apos;s now core to our business success.
        </p>

        <h2>Bridging the Gap</h2>

        <p>
          For current students or recent graduates considering entrepreneurship,
          here&apos;s how I&apos;d recommend bridging the gap between academic
          knowledge and startup reality:
        </p>

        <ol>
          <li>
            <strong>Build something real users will use</strong> - Not just for
            a class project, but something people actually need. The feedback
            loop from real users is invaluable.
          </li>
          <li>
            <strong>Seek mentorship from founders</strong> - Theory and practice
            often diverge; learn from those who&apos;ve navigated the path
            before you.
          </li>
          <li>
            <strong>Embrace cross-disciplinary learning</strong> - Take courses
            outside your technical comfort zone in design, psychology, or
            business.
          </li>
          <li>
            <strong>Practice explaining complex ideas simply</strong> -
            Technical brilliance means little if you can&apos;t communicate your
            vision to non-technical stakeholders.
          </li>
        </ol>

        <h2>The Ongoing Education</h2>

        <p>
          Three years into building Popper, I&apos;ve come to see that my
          education didn&apos;t end when I received my degree—it had barely
          begun. The most valuable skills I&apos;ve developed as a founder have
          come from embracing challenges outside my comfort zone, making
          mistakes, and being willing to learn from anyone and everyone.
        </p>

        <p>
          Berkeley gave me an excellent foundation, but building a successful
          company has required continuous learning across disciplines I never
          studied formally. That&apos;s both the challenge and the thrill of the
          founder journey—you&apos;re always a student, and the curriculum is
          constantly evolving.
        </p>

        <p>
          I&apos;d love to hear from other technical founders about their
          experiences bridging the academic-startup gap. What lessons did your
          formal education miss? How have you filled those knowledge gaps?
          Connect with me on{" "}
          <a
            href="https://twitter.com/seoking23"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          to continue the conversation.
        </p>
      </div>
    </div>
  );
}
