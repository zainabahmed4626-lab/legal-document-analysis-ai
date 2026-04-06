import HeroSection from "@/components/HeroSection";
import MetricsSection from "@/components/MetricsSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import CodeSection from "@/components/CodeSection";
import ResultsSection from "@/components/ResultsSection";
import DemoSection from "@/components/DemoSection";
import DatasetSection from "@/components/DatasetSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MetricsSection />
      <DatasetSection />
      <ArchitectureSection />
      <CodeSection />
      <DemoSection />
      <ResultsSection />

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-muted-foreground font-mono">
            Built with PyTorch · HuggingFace · LangChain · LoRA
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
