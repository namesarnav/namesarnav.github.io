export type SkillLevel = "green" | "blue" | "gray";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  index: string;
  label: string;
  items: Skill[];
}

export interface Project {
  index: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  demo: string | null;
  code: string | null;
  pending?: boolean;
}

export interface Post {
  status: string;
  title: string;
  topic: string;
}

export interface Course {
  name: string;
  grade: string;
}

export interface Education {
  name: string;
  degree: string;
  period: string;
  meta: string;
  affiliations: string[] | null;
  awards: string[] | null;
  coursework: Course[];
}

export interface Social {
  label: string;
  color: string;
  /** Override color for light mode, for brand colors (near-white/pale) that lose contrast on a light background */
  lightColor?: string;
  url: string;
}

function mk(byLevel: Partial<Record<SkillLevel, string[]>>): Skill[] {
  return (["green", "blue", "gray"] as SkillLevel[]).flatMap((level) =>
    (byLevel[level] ?? []).map((name) => ({ name, level })),
  );
}

export const typewriterPhrases = [
  "Machine Learning Engineer",
  "LLM Researcher",
  "Full-stack Builder",
  "Open to opportunities",
];

export const heroIntro =
  "I build and evaluate large language models, from multi dimensional generalization research to production AI products used by real people.";

export const aboutLead =
  "I'm a Master's student at NYU Courant researching how large language models generalize across domains, adversarial perturbations, and structural complexity — and I build production AI products on the side.";

export const aboutSecondary =
  "Recent work spans a 42-configuration generalization study across LLaMA, Qwen and Mistral, fine-tuning RoBERTa/T5/GPT-2 baselines for sequence labeling, and shipping two full-stack AI products end to end.";

export const email = "av4445@nyu.edu";

export const projects: Project[] = [
  {
    index: "01",
    title: "Polish",
    period: "2025",
    description:
      "Full-stack AI resume SaaS with Claude & Gemini-powered feedback, full version control with diff comparison, and Dockerized CI/CD on Railway.",
    tags: ["Next.js", "Express", "PostgreSQL", "Redis"],
    demo: "https://polish-client-production.up.railway.app/",
    code: "https://github.com/PolishAI-app/polish",
  },
  {
    index: "02",
    title: "Marigold",
    period: "2025",
    description:
      "AI study app that turns uploaded PDFs into Gemini-generated flashcards and timed quizzes, secured with JWT rotation and httpOnly cookies.",
    tags: ["React", "FastAPI", "MongoDB", "PyMuPDF"],
    demo: "https://marigold-production.up.railway.app/",
    code: "https://github.com/namesarnav/marigold",
  },
  {
    index: "03",
    title: "LLM Generalization Study",
    period: "2025–Present",
    description:
      "Multi-dimensional generalization study across 42 model configurations (LLaMA, Qwen, Mistral), evaluating domain shift, adversarial robustness and compositionality on temporal extraction.",
    tags: ["PyTorch", "HuggingFace", "RoBERTa", "T5"],
    demo: null,
    code: "https://github.com/namesarnav",
  },
];

export const projectPlaceholders: Project[] = Array.from({ length: 10 }, (_, i) => ({
  index: String(i + 4).padStart(2, "0"),
  title: `Project ${String(i + 4).padStart(2, "0")}`,
  period: "2026",
  description: "Case study write-up in progress — details coming soon.",
  tags: ["Coming soon"],
  demo: null,
  code: null,
  pending: true,
}));

export const allProjects: Project[] = [...projects, ...projectPlaceholders];

export const posts: Post[] = [
  { status: "Soon", title: "What breaks when LLMs meet clinical text", topic: "Generalization" },
  { status: "Soon", title: "Fine-tuned PLMs vs. prompted LLMs: a fairer comparison", topic: "NLP" },
  { status: "Soon", title: "Shipping Polish: lessons from a resume SaaS", topic: "Engineering" },
];

const postTopics = ["Research", "Engineering", "Notes", "ML", "Systems"];

export const postPlaceholders: Post[] = Array.from({ length: 10 }, (_, i) => ({
  status: "Soon",
  title: `Post ${String(i + 4).padStart(2, "0")} — coming soon`,
  topic: postTopics[i % postTopics.length],
}));

export const allPosts: Post[] = [...posts, ...postPlaceholders];

export const education: Education[] = [
  {
    name: "New York University, Courant Institute of Mathematical Sciences",
    degree: "M.S. Computer Science",
    period: "Expected 05/28",
    meta: "Courant Institute of Mathematical Sciences · New York, NY",
    affiliations: ["Tech@NYU", "HackNYU"],
    awards: null,
    coursework: [
      { name: "Fundamental Algorithms", grade: "In progress" },
      { name: "Machine Learning", grade: "In progress" },
      { name: "Deep Learning", grade: "In progress" },
    ],
  },
  {
    name: "University of North Texas",
    degree: "B.S. Computer Science · Mathematics Minor",
    period: "01/23 – 05/26",
    meta: "Denton, TX · GPA 3.70",
    affiliations: ["IEEE Computer Society", "UNT Computer Science Club", "UNT AI Research Program"],
    awards: [
      "President's List",
      "Dean's List",
      "Undergraduate Research Fellowship",
      "International Education Scholarship",
      "1st Place — HackSMU '24 & '25, HackUNT '23 & '24",
      "2nd Place — HackUTD '24 · Runner-up — HackTX (UT Austin)",
    ],
    coursework: [
      { name: "Algorithms", grade: "A+" },
      { name: "Artificial Intelligence", grade: "A+" },
      { name: "Natural Language Processing", grade: "A+" },
      { name: "Linear Algebra", grade: "A+" },
      { name: "Data Structures", grade: "A" },
      { name: "Operating Systems", grade: "A" },
      { name: "Database Systems", grade: "A" },
      { name: "Computer Networks", grade: "A" },
      { name: "Discrete Mathematics", grade: "A" },
      { name: "Probability & Statistics", grade: "A" },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    index: "01",
    label: "Languages",
    items: mk({ green: ["Python", "C/C++"], blue: ["JavaScript", "TypeScript"], gray: ["Rust", "Flutter"] }),
  },
  {
    index: "02",
    label: "AI / ML",
    items: mk({
      green: [
        "PyTorch",
        "TensorFlow",
        "Keras",
        "Scikit-learn",
        "NumPy",
        "Pandas",
        "HuggingFace",
        "LangChain",
        "LlamaIndex",
        "Ollama",
        "Pinecone",
        "Chroma",
        "Deep Learning",
        "LLM Evaluation",
      ],
      blue: ["JAX", "vLLM", "TensorRT", "n8n", "Gradio", "Streamlit"],
      gray: ["OpenCV", "YOLO", "spaCy", "ONNX"],
    }),
  },
  {
    index: "03",
    label: "Libraries & Frameworks",
    items: mk({ blue: ["Flask", "FastAPI", "Express", "Next.js", "React", "React Native"] }),
  },
  {
    index: "04",
    label: "Tools",
    items: mk({
      green: ["Docker", "Terraform", "PostgreSQL", "MongoDB"],
      blue: ["Kubernetes", "Jenkins", "Ansible"],
      gray: ["Google AI Studio"],
    }),
  },
  {
    index: "05",
    label: "Concepts",
    items: mk({
      green: ["AI Agent Development", "Software Development"],
      blue: ["DevOps", "API Development"],
    }),
  },
];

export const socials: Social[] = [
  { label: "GitHub", color: "#FFFFFF", lightColor: "#100f0c", url: "https://github.com/namesarnav" },
  { label: "LinkedIn", color: "#C0DCFF", lightColor: "#0A66C2", url: "https://linkedin.com/in/namesarnav" },
  { label: "Hugging Face", color: "#FFA744", url: "https://huggingface.co/namesarnav" },
  { label: "Hashnode", color: "#2CE2B2", url: "https://hashnode.com/@namesarnav" },
  { label: "Leetcode", color: "#E85B03", url: "https://leetcode.com/namesarnav" },
  { label: "𝕏", color: "#FFFFFF", lightColor: "#100f0c", url: "https://x.com/namesarnav" },
];
