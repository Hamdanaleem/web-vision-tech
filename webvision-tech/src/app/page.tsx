import HeroSlider from "@/components/HeroSlider";
import ClientTicker from "@/components/ClientTicker";
import ServicesBento from "@/components/ServicesBento";
import WhyChooseUs from "@/components/WhyChooseUs"; // Import this

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <ClientTicker />
      <ServicesBento />
      <WhyChooseUs /> {/* Add this here */}
    </main>
  );
}