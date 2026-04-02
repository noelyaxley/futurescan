import { Navigation } from "@/components/ui/navigation";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ScanExperience } from "@/components/sections/scan-experience";
import { Pricing } from "@/components/sections/pricing";
import { Trust } from "@/components/sections/trust";
import { BookCta } from "@/components/sections/book-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <ScanExperience />
        <Pricing />
        <Trust />
        <BookCta />
      </main>
      <Footer />
    </>
  );
}
