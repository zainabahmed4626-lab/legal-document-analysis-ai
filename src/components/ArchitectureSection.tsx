import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "PDF Ingestion",
    desc: "Multi-format document parsing using pdfplumber and PyMuPDF. OCR fallback for scanned contracts via Tesseract.",
    tech: ["pdfplumber", "PyMuPDF", "Tesseract"],
  },
  {
    num: "02",
    title: "Chunking & Preprocessing",
    desc: "Recursive text splitting with 512-token chunks and 50-token overlap. Metadata-aware sectioning for clause boundaries.",
    tech: ["LangChain", "tiktoken", "regex"],
  },
  {
    num: "03",
    title: "Fine-tuned LLM Inference",
    desc: "LoRA-adapted LLaMA-7B for clause classification and entity extraction. 4-bit quantized for efficient GPU inference.",
    tech: ["LLaMA-7B", "LoRA", "bitsandbytes"],
  },
  {
    num: "04",
    title: "NER & Clause Extraction",
    desc: "Custom legal NER model identifying parties, dates, obligations, and liability clauses with 87% F1-score.",
    tech: ["PyTorch", "HuggingFace", "spaCy"],
  },
  {
    num: "05",
    title: "Risk Analysis & Output",
    desc: "Structured JSON output with risk scores, flagged clauses, and summary reports for legal review teams.",
    tech: ["LangChain", "Pydantic", "FastAPI"],
  },
];

const ArchitectureSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm">// architecture</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Pipeline Architecture</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
                  <span className="text-primary font-mono font-bold text-sm">{step.num}</span>
                </div>
                <div className="flex-1 p-5 rounded-lg bg-card border border-border card-hover">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded text-xs font-mono bg-secondary text-secondary-foreground border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
