import { motion } from "framer-motion";

const metrics = [
  {
    title: "Analysis Time Reduction",
    value: "40%",
    description: "Fine-tuned LLaMA-7B using LoRA adapters on 5,000+ annotated legal documents",
    detail: "LoRA rank-16 on attention layers, 4-bit quantization via bitsandbytes",
    color: "primary",
  },
  {
    title: "Contract Parsing Speed",
    value: "2 min",
    description: "End-to-end pipeline parsing 500-page contracts with clause extraction",
    detail: "Chunked processing with overlap, parallel PDF page extraction",
    color: "accent",
  },
  {
    title: "Legal NER F1-Score",
    value: "87%",
    description: "+23 points improvement over base model on legal entity recognition",
    detail: "Custom NER head trained on party names, dates, obligations, clauses",
    color: "success",
  },
  {
    title: "Review Time Savings",
    value: "84%",
    description: "Deployed for autonomous vehicle firms to accelerate contract review",
    detail: "From ~6 hours manual review to under 1 hour with AI-assisted analysis",
    color: "warning",
  },
];

const colorMap: Record<string, string> = {
  primary: "text-primary border-primary/20 bg-primary/5",
  accent: "text-accent border-accent/20 bg-accent/5",
  success: "text-success border-success/20 bg-success/5",
  warning: "text-warning border-warning/20 bg-warning/5",
};

const MetricsSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm">// performance</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Key Results</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg bg-card border border-border card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </h3>
                <span className={`text-3xl font-bold font-mono ${colorMap[metric.color]?.split(' ')[0]}`}>
                  {metric.value}
                </span>
              </div>
              <p className="text-foreground text-sm mb-3">{metric.description}</p>
              <p className="text-xs text-muted-foreground font-mono">{metric.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
