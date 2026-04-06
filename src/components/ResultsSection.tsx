import { motion } from "framer-motion";

const comparisons = [
  { label: "Legal Entity Recognition", base: 64, fine: 87, unit: "% F1" },
  { label: "Clause Classification", base: 58, fine: 91, unit: "% Acc" },
  { label: "Obligation Detection", base: 52, fine: 83, unit: "% F1" },
  { label: "Risk Flag Precision", base: 45, fine: 79, unit: "% Prec" },
];

const ResultsSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm">// evaluation</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Model Performance</h2>
          <p className="text-muted-foreground mt-2">Base LLaMA-7B vs Fine-tuned (LoRA) on legal benchmark</p>
        </motion.div>

        <div className="space-y-6">
          {comparisons.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-lg bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground font-mono">
                  +{item.fine - item.base} pts
                </span>
              </div>

              {/* Base bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Base</span>
                  <span className="text-xs text-muted-foreground font-mono">{item.base}{item.unit}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.base}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full bg-muted-foreground/30"
                  />
                </div>
              </div>

              {/* Fine-tuned bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-primary">Fine-tuned</span>
                  <span className="text-xs text-primary font-mono font-semibold">{item.fine}{item.unit}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.fine}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
