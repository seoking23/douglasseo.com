import { Metadata } from "next";
import { PageTransition } from "@/components/page-transition";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Building Love into Code: How I Made tomylovemiwa.com",
  description:
    "The story of creating a Valentine's Day love game website with 6 interactive games and a surprise Japan trip planner.",
};

export default function BuildingLoveIntoCodePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-1">
          <article className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Building Love into Code: How I Made tomylovemiwa.com
              </h1>
              <div className="mt-4 flex items-center gap-4 text-muted-foreground">
                <time dateTime="2024-02-14">February 14, 2024</time>
                <span>•</span>
                <span>10 min read</span>
              </div>
              <div className="mt-8 prose prose-lg dark:prose-invert">
                <h2>The Inspiration</h2>
                <p>
                  Valentine&apos;s Day has always been special for me and Miwa.
                  This year, I wanted to create something unique that would
                  combine my love for coding with my love for her. The idea of
                  tomylovemiwa.com was born: a website featuring six love-themed
                  games, each unlocking a personal love letter, culminating in a
                  surprise Japan trip planner.
                </p>

                <h2>The Games: A Journey of Love</h2>
                <p>
                  Each game was designed to represent a different aspect of our
                  relationship:
                </p>
                <ul>
                  <li>
                    <strong>Memory Match:</strong> A card-matching game
                    featuring photos of our favorite moments together,
                    symbolizing how we&apos;ve grown to know each other&apos;s
                    hearts.
                  </li>
                  <li>
                    <strong>Love Letter Puzzle:</strong> A word puzzle where
                    solving it reveals a hidden message, representing the joy of
                    discovering new things about each other.
                  </li>
                  <li>
                    <strong>Heart Rhythm:</strong> A rhythm game where players
                    tap to the beat of our favorite songs, celebrating our
                    shared love for music.
                  </li>
                  <li>
                    <strong>Photo Gallery Quest:</strong> An interactive photo
                    gallery where finding hidden hearts reveals new memories,
                    symbolizing our journey together.
                  </li>
                  <li>
                    <strong>Love Quiz:</strong> A personalized quiz about our
                    relationship, testing how well we know each other&apos;s
                    preferences and dreams.
                  </li>
                  <li>
                    <strong>Message in a Bottle:</strong> A virtual message
                    bottle that reveals a special love letter when found,
                    representing the surprises we bring to each other&apos;s
                    lives.
                  </li>
                </ul>

                <h2>Technical Implementation</h2>
                <p>
                  The website was built with React for the frontend, providing a
                  smooth and interactive user experience. Supabase was chosen
                  for the backend to handle:
                </p>
                <ul>
                  <li>Game progression tracking</li>
                  <li>Photo upload and storage</li>
                  <li>User authentication (for Miwa&apos;s personal access)</li>
                  <li>Love letter content management</li>
                </ul>

                <h2>The Final Surprise: Japan Trip Planner</h2>
                <p>
                  After completing all six games, the final reward was a
                  custom-built Japan trip planner featuring:
                </p>
                <ul>
                  <li>Google Maps integration for exploring destinations</li>
                  <li>Interactive calendar for planning daily activities</li>
                  <li>Budget calculator with accurate cost estimates</li>
                  <li>Personalized recommendations based on our interests</li>
                </ul>

                <h2>Design and User Experience</h2>
                <p>
                  The website&apos;s design was carefully crafted to create a
                  warm, romantic atmosphere:
                </p>
                <ul>
                  <li>Soft color palette with light pinks and warm tones</li>
                  <li>Handwritten-style typography for a personal touch</li>
                  <li>Subtle animations and transitions for a magical feel</li>
                  <li>
                    Responsive design for seamless experience across devices
                  </li>
                </ul>

                <h2>Reflections on Building with Love</h2>
                <p>
                  Creating tomylovemiwa.com taught me that code can be more than
                  just functional—it can be a medium for expressing love and
                  creating meaningful experiences. The technical challenges were
                  balanced by the joy of seeing Miwa&apos;s reactions as she
                  discovered each new game and love letter.
                </p>
                <p>
                  The project reinforced my belief that technology can be used
                  to create emotional connections and lasting memories.
                  It&apos;s not just about the code we write, but the love and
                  intention we put into it.
                </p>

                <h2>Looking Forward</h2>
                <p>
                  This project has inspired me to think about how we can use
                  technology to create more meaningful, emotional experiences.
                  Whether it&apos;s for love, friendship, or family,
                  there&apos;s always room to infuse our code with heart and
                  purpose.
                </p>
                <p>
                  I&apos;d love to hear about your experiences building projects
                  with emotional significance. Connect with me on{" "}
                  <a
                    href="https://twitter.com/seoking23"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>{" "}
                  to share your stories.
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
