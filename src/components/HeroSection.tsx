import { motion } from "framer-motion";
import { FileText, Brain, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono">
            AI Engineering Project
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Contract</span>
          <br />
          <span className="gradient-text text-glow">Analysis AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Fine-tuned LLM pipeline for autonomous vehicle firms — extracting clauses,
          recognizing legal entities, and cutting contract review time by{" "}
          <span className="text-primary font-semibold">84%</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {["HuggingFace", "PyTorch", "LangChain", "LoRA", "LLaMA-7B", "PDF Parsing"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-mono border border-border"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: FileText, label: "5,000+", sub: "Legal docs trained on" },
            { icon: Brain, label: "87%", sub: "F1-score on NER" },
            { icon: Zap, label: "2 min", sub: "500-page parsing" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 p-6 rounded-lg bg-card border border-border card-hover"
            >
              <item.icon className="w-5 h-5 text-primary mb-1" />
              <span className="text-3xl font-bold text-foreground font-mono">{item.label}</span>
              <span className="text-sm text-muted-foreground">{item.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
