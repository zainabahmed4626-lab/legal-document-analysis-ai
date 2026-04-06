import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileSearch, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const SAMPLE_TEXT = `ARTICLE 12 - LIABILITY AND INDEMNIFICATION

12.1 The Supplier shall indemnify and hold harmless the Company against all claims, damages, losses and expenses arising from the Supplier's breach of this Agreement or negligence in performing the Services.

12.2 Notwithstanding any other provision, the total aggregate liability of either Party under this Agreement shall not exceed the total fees paid or payable during the twelve (12) month period preceding the claim.

12.3 Neither Party shall be liable for any indirect, incidental, special or consequential damages, including but not limited to loss of profits, revenue, data or business opportunities.

12.4 The Company shall maintain insurance coverage of no less than $5,000,000 per occurrence for the duration of this Agreement. AutoDrive Corp. agrees to notify TechVentures LLC within 30 days of any material change in coverage.`;

interface ClauseResult {
  type: string;
  text: string;
  risk: "high" | "medium" | "low";
  entities: string[];
}

const mockResults: ClauseResult[] = [
  {
    type: "Indemnification",
    text: "The Supplier shall indemnify and hold harmless the Company against all claims, damages, losses...",
    risk: "high",
    entities: ["Supplier", "Company"],
  },
  {
    type: "Liability Cap",
    text: "Total aggregate liability shall not exceed the total fees paid during the twelve (12) month period...",
    risk: "medium",
    entities: ["12-month period"],
  },
  {
    type: "Limitation of Liability",
    text: "Neither Party shall be liable for any indirect, incidental, special or consequential damages...",
    risk: "medium",
    entities: ["indirect damages", "loss of profits"],
  },
  {
    type: "Insurance Obligation",
    text: "The Company shall maintain insurance coverage of no less than $5,000,000 per occurrence...",
    risk: "low",
    entities: ["AutoDrive Corp.", "TechVentures LLC", "$5,000,000", "30 days"],
  },
];

const riskStyles = {
  high: "border-destructive/40 bg-destructive/5 text-destructive",
  medium: "border-warning/40 bg-warning/5 text-warning",
  low: "border-success/40 bg-success/5 text-success",
};

const riskIcons = {
  high: AlertTriangle,
  medium: Clock,
  low: CheckCircle,
};

const DemoSection = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ClauseResult[] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setResults(mockResults);
      setAnalyzing(false);
    }, 1800);
  };

  const loadSample = () => {
    setInput(SAMPLE_TEXT);
    setResults(null);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm">// interactive demo</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Try It Out</h2>
          <p className="text-muted-foreground mt-2">Paste contract text to see clause extraction and risk analysis in action.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono text-muted-foreground">input.txt</span>
              <button
                onClick={loadSample}
                className="text-xs font-mono text-primary hover:text-primary/80 transition-colors"
              >
                Load sample →
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setResults(null);
              }}
              placeholder="Paste contract text here..."
              className="flex-1 min-h-[320px] p-4 rounded-lg bg-card border border-border text-sm font-mono text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 transition-shadow"
              maxLength={5000}
            />
            <button
              onClick={handleAnalyze}
              disabled={!input.trim() || analyzing}
              className="mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {analyzing ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Analysis
                </>
              )}
            </button>
          </motion.div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <FileSearch className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">results.json</span>
            </div>

            <div className="flex-1 min-h-[320px] rounded-lg bg-card border border-border p-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                {!results && !analyzing && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center text-muted-foreground text-sm font-mono"
                  >
                    Awaiting input...
                  </motion.div>
                )}

                {analyzing && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-sm text-muted-foreground font-mono">Running clause extraction pipeline...</span>
                  </motion.div>
                )}

                {results && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {results.length} clauses extracted
                      </span>
                      <span className="text-xs font-mono text-primary">0.34s</span>
                    </div>

                    {results.map((clause, i) => {
                      const RiskIcon = riskIcons[clause.risk];
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.12 }}
                          className={`p-3 rounded-md border ${riskStyles[clause.risk]}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <RiskIcon className="w-3.5 h-3.5" />
                            <span className="text-xs font-mono font-semibold uppercase">{clause.type}</span>
                            <span className="ml-auto text-[10px] font-mono opacity-70">{clause.risk} risk</span>
                          </div>
                          <p className="text-xs text-foreground/70 mb-2 line-clamp-2">{clause.text}</p>
                          <div className="flex flex-wrap gap-1">
                            {clause.entities.map((e) => (
                              <span key={e} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-secondary text-secondary-foreground">
                                {e}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
