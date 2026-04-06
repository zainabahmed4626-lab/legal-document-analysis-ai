import { motion } from "framer-motion";

const codeSnippets = [
  {
    title: "model/fine_tune.py",
    language: "python",
    code: `from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model, TaskType
import torch

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    load_in_4bit=True,
    device_map="auto",
    torch_dtype=torch.float16
)

lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"]
)

model = get_peft_model(model, lora_config)
print(f"Trainable params: {model.print_trainable_parameters()}")`,
  },
  {
    title: "pipeline/extract_clauses.py",
    language: "python",
    code: `from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyMuPDFLoader
from typing import List, Dict

def extract_clauses(pdf_path: str) -> List[Dict]:
    loader = PyMuPDFLoader(pdf_path)
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=512,
        chunk_overlap=50,
        separators=["\\nArticle", "\\nSection", "\\n\\n", "\\n"]
    )
    chunks = splitter.split_documents(documents)

    clauses = []
    for chunk in chunks:
        result = model.predict(chunk.page_content)
        clauses.append({
            "text": chunk.page_content,
            "type": result.clause_type,
            "risk_score": result.risk_score,
            "entities": result.entities
        })
    return clauses`,
  },
];

const CodeSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-primary font-mono text-sm">// implementation</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Core Implementation</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {codeSnippets.map((snippet, i) => (
            <motion.div
              key={snippet.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="code-block overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">{snippet.title}</span>
              </div>
              <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-secondary-foreground font-mono">{snippet.code}</code>
              </pre>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
