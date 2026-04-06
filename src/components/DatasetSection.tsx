import { motion } from "framer-motion";
import { Database, FileText, Scale, Building2, Users, Car } from "lucide-react";

const datasetStats = [
  { label: "Total Documents", value: "5,247", icon: FileText },
  { label: "Clause Annotations", value: "148K", icon: Database },
  { label: "Unique Entities", value: "32K", icon: Users },
  { label: "Contract Types", value: "14", icon: Scale },
];

const contractTypes = [
  { type: "Master Service Agreements", count: 1240, pct: 24, industry: "Technology" },
  { type: "Supply & Procurement", count: 890, pct: 17, industry: "Automotive" },
  { type: "Non-Disclosure Agreements", count: 780, pct: 15, industry: "Cross-industry" },
  { type: "Employment Contracts", count: 650, pct: 12, industry: "HR / Legal" },
  { type: "Licensing Agreements", count: 520, pct: 10, industry: "IP / Software" },
  { type: "Joint Venture & Partnership", count: 410, pct: 8, industry: "Autonomous Vehicles" },
  { type: "Insurance & Indemnity", count: 380, pct: 7, industry: "Finance" },
  { type: "Other (Lease, M&A, etc.)", count: 377, pct: 7, industry: "Mixed" },
];

const sampleEntities = [
  { entity: "AutoDrive Corp.", type: "ORG", frequency: 342 },
  { entity: "TechVentures LLC", type: "ORG", frequency: 289 },
  { entity: "Waypoint Robotics Inc.", type: "ORG", frequency: 256 },
  { entity: "Meridian Motors", type: "ORG", frequency: 198 },
  { entity: "§7.2(a) Limitation", type: "CLAUSE_REF", frequency: 1847 },
  { entity: "12 months", type: "DURATION", frequency: 3210 },
  { entity: "$5,000,000", type: "MONETARY", frequency: 891 },
  { entity: "State of Delaware", type: "JURISDICTION", frequency: 1542 },
];

const DatasetSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm">// training data</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Dataset Overview</h2>
          <p className="text-muted-foreground mt-2">Curated corpus of real-world legal contracts from autonomous vehicle and technology sectors.</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {datasetStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-lg bg-card border border-border text-center card-hover"
            >
              <stat.icon className="w-4 h-4 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold font-mono text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Contract type breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 rounded-lg bg-card border border-border"
          >
            <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">Contract Type Distribution</h3>
            <div className="space-y-3">
              {contractTypes.map((ct, i) => (
                <motion.div
                  key={ct.type}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground">{ct.type}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{ct.count} docs · {ct.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ct.pct * 4}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                      className="h-full rounded-full bg-primary/70"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Entity samples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-lg bg-card border border-border"
          >
            <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">Top Extracted Entities</h3>
            <div className="space-y-2">
              {sampleEntities.map((ent, i) => (
                <motion.div
                  key={ent.entity}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-2 px-3 rounded-md bg-secondary/30 border border-border/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-foreground">{ent.entity}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-primary/10 text-primary border border-primary/20">
                      {ent.type}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{ent.frequency.toLocaleString()}×</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DatasetSection;
