import Hero from "@/components/Hero";
import EvidenceBoard from "@/components/EvidenceBoard";
import RedactedFiles from "@/components/RedactedFiles";
import Gnomeland from "@/components/Gnomeland";
import Disclaimer from "@/components/Disclaimer";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Page sections */}
      <Hero />
      <EvidenceBoard />
      <RedactedFiles />
      <Gnomeland />
      <Disclaimer />
      <Footer />
    </main>
  );
}
