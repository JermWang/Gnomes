import Hero from "@/components/Hero";
import FieldObservations from "@/components/EvidenceBoard";
import AnatomyOfAGnome from "@/components/AnatomyOfAGnome";
import HumanEncounters from "@/components/HumanEncounters";
import LatestSightings from "@/components/LatestSightings";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <FieldObservations />
      <AnatomyOfAGnome />
      <HumanEncounters />
      <LatestSightings />
      <Footer />
    </main>
  );
}
