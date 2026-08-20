import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Manifesto from "@/components/Manifesto";
import Capabilities from "@/components/Capabilities";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-primary selection:bg-accent-teal/20 selection:text-accent-teal">
      <Preloader />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Work />
        <Manifesto />
        <Capabilities />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
