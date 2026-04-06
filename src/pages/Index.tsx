import Navbar from "@/components/Navbar";
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
      <Navbar />
      <div id="hero"><HeroSection /></div>
      <div id="metrics"><MetricsSection /></div>
      <div id="dataset"><DatasetSection /></div>
      <div id="architecture"><ArchitectureSection /></div>
      <div id="code"><CodeSection /></div>
      <div id="demo"><DemoSection /></div>
      <div id="performance"><ResultsSection /></div>

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
