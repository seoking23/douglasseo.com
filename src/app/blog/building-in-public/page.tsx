import { BlogPostLayout } from "@/components/blog-post-layout";

export default function BuildingInPublicPage() {
  return (
    <BlogPostLayout
      title="Building in Public: Lessons from Launching Popper"
      date="March 15, 2023"
      readTime="10 min read"
    >
      <p className="lead">
        When I launched Popper last year, I made a commitment to build in
        public. Sharing both successes and failures has been challenging but
        incredibly rewarding. Here&apos;s what I&apos;ve learned from growing
        our user base to 1,100+ users and partnering with 60+ local businesses.
      </p>

      <h2>The Power of Transparency</h2>

      <p>
        Building in public isn&apos;t just about sharing metrics—it&apos;s about
        being honest about the journey. When we hit our first 100 users, I
        shared not just the milestone but the three failed marketing approaches
        that preceded it. That post resonated more than any product announcement
        and led to connections with other founders who became valuable advisors.
      </p>

      <p>
        The real magic happened when I started sharing our technical challenges.
        A post about our Firebase scaling issues caught the attention of an
        engineer who had solved similar problems. That chance connection saved
        us weeks of troubleshooting and led to a 40% improvement in our
        app&apos;s performance.
      </p>

      <h2>Real Metrics Drive Accountability</h2>

      <p>
        When you commit to sharing your numbers publicly, you can&apos;t hide
        from reality. Our monthly updates include:
      </p>

      <ul>
        <li>User growth (currently 1,100+)</li>
        <li>Business partnerships (60+ and growing)</li>
        <li>Engagement metrics (3.2 transactions per user weekly)</li>
        <li>Retention (78% 30-day retention)</li>
      </ul>

      <p>
        This transparency creates accountability that&apos;s impossible to
        achieve when metrics remain private. There were months when growth
        stalled, and knowing I&apos;d have to report those numbers publicly
        pushed me to experiment with new acquisition channels rather than making
        excuses.
      </p>

      <h2>Engineering Trade-offs in the Open</h2>

      <p>
        As a technical founder, I&apos;ve found particular value in discussing
        engineering decisions publicly. When we chose React Native for
        cross-platform development, I wrote about the trade-offs involved. That
        post sparked valuable discussions about performance optimizations we
        hadn&apos;t considered.
      </p>

      <p>
        Similarly, documenting our journey with Firebase—from simple MVP to
        supporting thousands of transactions—has created a record of technical
        decisions that helps us avoid repeating mistakes and provides context
        for new team members.
      </p>

      <p>
        One of our most difficult decisions was whether to rebuild our rewards
        calculation engine for better scalability or optimize the existing
        system. By sharing our analysis publicly, we received feedback that
        ultimately saved us from a premature rewrite, focusing instead on
        targeted optimizations that achieved the same goals with less risk.
      </p>

      <h2>Community as a Competitive Advantage</h2>

      <p>
        The most unexpected benefit of building in public has been the community
        that&apos;s formed around our journey. Our users feel invested in our
        success because they&apos;ve watched us grow from the beginning. When we
        ask for feedback, we get thoughtful responses rather than generic
        suggestions.
      </p>

      <p>
        This community became a genuine competitive advantage when a larger
        competitor entered our market. Our users didn&apos;t just stay
        loyal—they became advocates, bringing friends onto the platform and
        suggesting new businesses for us to partner with. That organic growth
        would have cost thousands in marketing spend to achieve otherwise.
      </p>

      <h2>The Challenges of Public Building</h2>

      <p>
        Building in public isn&apos;t without its challenges. There&apos;s a
        fine line between transparency and oversharing, especially regarding
        financial metrics or strategic plans. We&apos;ve developed a simple
        framework: share freely about the past and present, but be more
        selective about future plans that might change or create competitive
        disadvantages.
      </p>

      <p>
        There&apos;s also the emotional toll of public failure. When our first
        Android release had critical bugs affecting 20% of users, documenting
        that failure publicly was painful but ultimately strengthened trust with
        our community. They saw how quickly we responded and appreciated the
        honest post-mortem.
      </p>

      <h2>Looking Forward</h2>

      <p>
        As we prepare for our next phase of growth, building in public will
        remain central to our approach. The benefits in terms of community
        building, accountability, and unexpected connections far outweigh the
        challenges.
      </p>

      <p>
        If you&apos;re considering building in public, my advice is simple:
        start small, be consistent, and remember that authenticity resonates
        more than perfectly curated updates. The goal isn&apos;t to impress
        people—it&apos;s to bring them along on your journey, both the victories
        and the setbacks.
      </p>

      <p>
        I&apos;d love to hear about your experiences building in public or
        answer any questions about our journey with Popper. Connect with me on{" "}
        <a
          href="https://twitter.com/seoking23"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>{" "}
        or through the contact form on this site.
      </p>
    </BlogPostLayout>
  );
}
