import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HomeContent } from "@/components/home-content";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  );
}
