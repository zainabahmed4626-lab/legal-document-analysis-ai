import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileSearch, AlertTriangle, CheckCircle, Clock, ChevronDown } from "lucide-react";

interface ClauseResult {
  type: string;
  text: string;
  risk: "high" | "medium" | "low";
  entities: string[];
}

interface SampleContract {
  label: string;
  category: string;
  text: string;
  results: ClauseResult[];
  processingTime: string;
}

const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    label: "SaaS Master Agreement",
    category: "Technology",
    text: `ARTICLE 12 - LIABILITY AND INDEMNIFICATION

12.1 The Supplier shall indemnify and hold harmless the Company against all claims, damages, losses and expenses arising from the Supplier's breach of this Agreement or negligence in performing the Services.

12.2 Notwithstanding any other provision, the total aggregate liability of either Party under this Agreement shall not exceed the total fees paid or payable during the twelve (12) month period preceding the claim.

12.3 Neither Party shall be liable for any indirect, incidental, special or consequential damages, including but not limited to loss of profits, revenue, data or business opportunities.

12.4 The Company shall maintain insurance coverage of no less than $5,000,000 per occurrence for the duration of this Agreement. AutoDrive Corp. agrees to notify TechVentures LLC within 30 days of any material change in coverage.`,
    results: [
      { type: "Indemnification", text: "The Supplier shall indemnify and hold harmless the Company against all claims, damages, losses...", risk: "high", entities: ["Supplier", "Company"] },
      { type: "Liability Cap", text: "Total aggregate liability shall not exceed the total fees paid during the twelve (12) month period...", risk: "medium", entities: ["12-month period"] },
      { type: "Limitation of Liability", text: "Neither Party shall be liable for any indirect, incidental, special or consequential damages...", risk: "medium", entities: ["indirect damages", "loss of profits"] },
      { type: "Insurance Obligation", text: "The Company shall maintain insurance coverage of no less than $5,000,000 per occurrence...", risk: "low", entities: ["AutoDrive Corp.", "TechVentures LLC", "$5,000,000", "30 days"] },
    ],
    processingTime: "0.34s",
  },
  {
    label: "NDA – Mutual",
    category: "Confidentiality",
    text: `MUTUAL NON-DISCLOSURE AGREEMENT

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means any data or information, oral or written, disclosed by either Party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information. This includes, without limitation, trade secrets, algorithms, source code, customer lists, financial projections, and business strategies.

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party shall hold and maintain the Confidential Information in strict confidence for the sole benefit of the Disclosing Party. The Receiving Party shall not, without the prior written approval of the Disclosing Party, use, publish, or otherwise disclose the Confidential Information to any third party.

3. TERM AND DURATION
This Agreement shall remain in effect for three (3) years from the Effective Date. The confidentiality obligations shall survive for five (5) years following any disclosure of Confidential Information.

4. REMEDIES
Both parties acknowledge that any breach may cause irreparable harm and that monetary damages may be insufficient. NovaTech Inc. and Apex Dynamics LLC agree that injunctive relief shall be available in addition to any other remedies at law or in equity.`,
    results: [
      { type: "Scope Definition", text: "Confidential Information means any data or information, oral or written, designated as confidential...", risk: "medium", entities: ["trade secrets", "algorithms", "source code", "customer lists"] },
      { type: "Non-Disclosure Obligation", text: "The Receiving Party shall hold and maintain the Confidential Information in strict confidence...", risk: "low", entities: ["Receiving Party", "Disclosing Party"] },
      { type: "Duration Clause", text: "Agreement shall remain in effect for three (3) years. Confidentiality obligations survive for five (5) years...", risk: "medium", entities: ["3 years", "5 years", "Effective Date"] },
      { type: "Injunctive Relief", text: "Any breach may cause irreparable harm and monetary damages may be insufficient...", risk: "high", entities: ["NovaTech Inc.", "Apex Dynamics LLC", "injunctive relief"] },
    ],
    processingTime: "0.28s",
  },
  {
    label: "Employment Agreement",
    category: "HR / Labor",
    text: `EMPLOYMENT AGREEMENT – SENIOR ENGINEER

5. NON-COMPETE AND NON-SOLICITATION
5.1 During the term of employment and for a period of eighteen (18) months following termination, Employee agrees not to engage in any business that competes directly with Employer within a 50-mile radius of any Employer office location.

5.2 Employee shall not, for a period of twelve (12) months after termination, directly or indirectly solicit, hire, or attempt to hire any employee, contractor, or consultant of Employer.

6. INTELLECTUAL PROPERTY ASSIGNMENT
All inventions, discoveries, designs, and works of authorship made by Employee during the term of employment and related to the Employer's business shall be the sole and exclusive property of Waypoint Robotics Inc.

7. SEVERANCE
Upon involuntary termination without cause, Employee shall receive six (6) months of base salary ($185,000 annually) as severance, subject to execution of a general release of claims. Health insurance coverage under COBRA shall be subsidized for 90 days.

8. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California. Any disputes shall be resolved through binding arbitration in San Francisco, CA.`,
    results: [
      { type: "Non-Compete", text: "For 18 months following termination, Employee agrees not to engage in any competing business within 50-mile radius...", risk: "high", entities: ["18 months", "50-mile radius", "Employee", "Employer"] },
      { type: "Non-Solicitation", text: "For 12 months after termination, shall not solicit, hire, or attempt to hire any employee or contractor...", risk: "high", entities: ["12 months", "employees", "contractors", "consultants"] },
      { type: "IP Assignment", text: "All inventions, discoveries, designs made during employment shall be exclusive property of Employer...", risk: "medium", entities: ["Waypoint Robotics Inc.", "inventions", "works of authorship"] },
      { type: "Severance Terms", text: "Six months base salary ($185,000) as severance upon involuntary termination without cause...", risk: "low", entities: ["$185,000", "6 months", "COBRA", "90 days"] },
      { type: "Arbitration Clause", text: "Disputes resolved through binding arbitration in San Francisco, CA under California law...", risk: "medium", entities: ["California", "San Francisco", "binding arbitration"] },
    ],
    processingTime: "0.41s",
  },
  {
    label: "Vendor Supply Contract",
    category: "Procurement",
    text: `SUPPLY AGREEMENT – AUTOMOTIVE COMPONENTS

ARTICLE 8 – WARRANTIES AND QUALITY
8.1 Vendor warrants that all Products shall conform to the specifications set forth in Exhibit A and shall be free from defects in material and workmanship for a period of thirty-six (36) months from delivery.

8.2 Vendor shall maintain ISO 9001:2015 certification and IATF 16949 compliance throughout the term. Failure to maintain certifications constitutes a material breach.

ARTICLE 9 – DELIVERY AND PENALTIES
9.1 Products shall be delivered FOB Destination to Buyer's facilities in Detroit, MI and Austin, TX. Lead time shall not exceed fourteen (14) calendar days from purchase order receipt.

9.2 Late deliveries exceeding 5 business days shall incur a penalty of 2% of the order value per day, capped at 15% of total order value. Three consecutive late deliveries entitle Meridian Motors to terminate without penalty.

ARTICLE 10 – FORCE MAJEURE
Neither party shall be liable for delays caused by events beyond reasonable control including natural disasters, pandemics, government actions, or supply chain disruptions lasting more than 60 days.`,
    results: [
      { type: "Product Warranty", text: "All Products shall conform to specifications and be free from defects for 36 months from delivery...", risk: "low", entities: ["36 months", "Exhibit A", "material", "workmanship"] },
      { type: "Compliance Requirement", text: "Vendor shall maintain ISO 9001:2015 and IATF 16949 compliance. Failure constitutes material breach...", risk: "high", entities: ["ISO 9001:2015", "IATF 16949", "material breach"] },
      { type: "Delivery Penalty", text: "Late deliveries exceeding 5 days incur 2% penalty per day, capped at 15%. Three late deliveries allow termination...", risk: "high", entities: ["2%/day", "15% cap", "Meridian Motors", "14 days lead time"] },
      { type: "Force Majeure", text: "Not liable for delays from natural disasters, pandemics, government actions, or supply chain disruptions >60 days...", risk: "medium", entities: ["60 days", "pandemics", "supply chain disruptions"] },
    ],
    processingTime: "0.37s",
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
  const [processingTime, setProcessingTime] = useState("0.34s");
  const [sampleMenuOpen, setSampleMenuOpen] = useState(false);

  const handleAnalyze = (customResults?: ClauseResult[], time?: string) => {
    if (!input.trim() && !customResults) return;
    setAnalyzing(true);
    setResults(null);
    setTimeout(() => {
      setResults(customResults || SAMPLE_CONTRACTS[0].results);
      setProcessingTime(time || "0.34s");
      setAnalyzing(false);
    }, 1800);
  };

  const loadSample = (contract: SampleContract) => {
    setInput(contract.text);
    setResults(null);
    setSampleMenuOpen(false);
    // Auto-run analysis after loading
    setTimeout(() => {
      setAnalyzing(true);
      setTimeout(() => {
        setResults(contract.results);
        setProcessingTime(contract.processingTime);
        setAnalyzing(false);
      }, 1800);
    }, 300);
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
          <p className="text-muted-foreground mt-2">Paste contract text or load a sample to see clause extraction and risk analysis in action.</p>
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
              <div className="relative">
                <button
                  onClick={() => setSampleMenuOpen(!sampleMenuOpen)}
                  className="flex items-center gap-1 text-xs font-mono text-primary hover:text-primary/80 transition-colors"
                >
                  Load sample <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {sampleMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute right-0 top-full mt-1 w-64 rounded-lg bg-card border border-border shadow-lg z-20 overflow-hidden"
                    >
                      {SAMPLE_CONTRACTS.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => loadSample(c)}
                          className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border last:border-0"
                        >
                          <span className="text-sm text-foreground font-medium block">{c.label}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{c.category} · {c.results.length} clauses</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
              onClick={() => handleAnalyze()}
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
                      <span className="text-xs font-mono text-primary">{processingTime}</span>
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
