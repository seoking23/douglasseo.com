import { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "CurlyHair.ai: Building a Domain-Specific AI for Haircare",
  description:
    "The journey of creating an AI platform that helps users understand and care for their curly hair through personalized recommendations and routines.",
};

export default function CurlyHairAIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <article className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                CurlyHair.ai: Building a Domain-Specific AI for Haircare
              </h1>
              <div className="mt-4 flex items-center gap-4 text-muted-foreground">
                <time dateTime="2023-01-10">January 10, 2023</time>
                <span>•</span>
                <span>8 min read</span>
              </div>
              <div className="mt-8 prose prose-lg dark:prose-invert">
                <h2>A Dream of Generational Care</h2>
                <p>
                  The journey of CurlyHair.ai began with a dream. In it, I saw
                  my curly-haired daughter being gently cared for by her Korean
                  grandmother, who looked up and asked, &ldquo;Where&apos;s the
                  app to help me care for her hair?&rdquo; This dream
                  wasn&apos;t just a random occurrence — it was born from a
                  deeply personal reality.
                </p>
                <p>
                  My girlfriend, who is Black and Japanese, experienced
                  firsthand the challenges of cross-cultural hair care. Her
                  Japanese mother, despite her love and best intentions, never
                  learned how to care for her daughter&apos;s textured hair.
                  This knowledge gap led to over a decade of damage and
                  emotional pain — a story that&apos;s all too common in
                  multicultural families.
                </p>
                <h2>Building a Bridge Between Generations</h2>
                <p>
                  CurlyHair.ai was born from this intersection of love, cultural
                  understanding, and technological possibility. It&apos;s not
                  just an app — it&apos;s a bridge between generations, a tool
                  of compassion and care that helps families navigate the
                  complex world of textured hair care.
                </p>
                <h2>Understanding the Problem</h2>
                <p>
                  Curly hair care is complex and highly individualized,
                  especially in multicultural contexts. Factors like curl
                  pattern, porosity, density, and lifestyle all play crucial
                  roles in determining the right care routine. Traditional
                  resources often fail to account for these nuances, leading to
                  frustration and suboptimal results for many users.
                </p>
                <h2>The Solution: AI-Powered Personalization</h2>
                <p>
                  CurlyHair.ai was built to understand these complexities and
                  provide truly personalized recommendations. By leveraging
                  OpenAI&apos;s APIs and building a sophisticated recommendation
                  engine, we created a platform that could:
                </p>
                <ul>
                  <li>Analyze hair characteristics through user input</li>
                  <li>Consider lifestyle factors and constraints</li>
                  <li>Provide personalized routine recommendations</li>
                  <li>Suggest suitable products based on individual needs</li>
                  <li>Adapt recommendations over time based on results</li>
                </ul>
                <h2>Technical Implementation</h2>
                <p>The platform was built using a modern tech stack:</p>
                <ul>
                  <li>Python backend for the AI recommendation engine</li>
                  <li>OpenAI APIs for natural language processing</li>
                  <li>React frontend for an intuitive user interface</li>
                  <li>Firebase for user data management</li>
                </ul>
                <h2>Challenges and Learnings</h2>
                <p>Building CurlyHair.ai presented several challenges:</p>
                <ul>
                  <li>Creating an accurate hair analysis system</li>
                  <li>Balancing AI recommendations with human expertise</li>
                  <li>Ensuring product recommendations were unbiased</li>
                  <li>Building trust with users in a sensitive domain</li>
                </ul>
                <h2>Results and Impact</h2>
                <p>
                  After six months of development and iteration, CurlyHair.ai
                  has helped thousands of users better understand and care for
                  their curly hair. The platform has received positive feedback
                  for its personalized approach and user-friendly interface, but
                  more importantly, it&apos;s helping to heal the generational
                  gaps in hair care knowledge.
                </p>
                <h2>Future Directions</h2>
                <p>We&apos;re continuing to improve CurlyHair.ai with:</p>
                <ul>
                  <li>Enhanced AI models for better personalization</li>
                  <li>Integration with smart hair care devices</li>
                  <li>Community features for user support</li>
                  <li>Expansion to other hair types and concerns</li>
                </ul>
                <h2>A Message of Hope</h2>
                <p>
                  CurlyHair.ai is more than just a technological solution —
                  it&apos;s a testament to the power of understanding and care
                  across generations. By combining AI technology with cultural
                  sensitivity, we&apos;re creating a future where no one has to
                  struggle with hair care knowledge gaps. It&apos;s a tool built
                  out of love, designed to help families navigate the beautiful
                  complexity of textured hair care together.
                </p>
              </div>
            </div>
          </article>
        </main>
      </PageTransition>
      <Footer />
    </div>
  );
}
