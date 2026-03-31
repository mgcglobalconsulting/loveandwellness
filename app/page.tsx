import { HeroSection } from "@/components/home/HeroSection";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WebinarCTA } from "@/components/home/WebinarCTA";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FunnelBanner } from "@/components/home/FunnelBanner";
import { NewsletterCapture } from "@/components/home/NewsletterCapture";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FunnelBanner />
      <AboutSnippet />
      <ServicesPreview />
      <WebinarCTA />
      <TestimonialsCarousel />
      <NewsletterCapture />
    </>
  );
}
