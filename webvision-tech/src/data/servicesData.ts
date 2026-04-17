export type Industry = {
  name: string;
  desc: string;
  img: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  heroDesc: string;
  desc: string;
  iconName: string;
  img: string;
  longDesc: string;
  detailedCapabilities: { subtitle: string; desc: string }[];
  useCases: { industry: string; application: string }[];
  techStack: string[];         // short list shown in hero pills
  fullTechStack: string[];     // complete list for the scrolling marquee
  industries: Industry[];      // 5 industries we serve
  industryEyebrow: string;      // section eyebrow label
  industryHeading: string;       // section main heading
  workflow: { step: string; title: string; desc: string }[]; // service workflow steps
};

export const servicesData: ServiceItem[] = [
  {
    id: "generative-ai",
    title: "Generative AI",
    heroDesc: "Empowering Businesses, Inspiring Innovation through custom LLMs and Generative models.",
    desc: "Architecting custom LLMs and generative models tailored to proprietary enterprise data.",
    industryEyebrow: "Where AI Creates Real Impact",
    industryHeading: "Transforming Industries with Generative AI",
    iconName: "Cpu",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
    longDesc: "Generative AI represents a paradigm shift in machine intelligence, moving beyond analysis to creation. We develop bespoke generative systems that leverage your unique data to produce high-value content, automate complex reasoning, and create synthetic data for simulation environments.",
    detailedCapabilities: [
      { subtitle: "Custom LLM Fine-tuning", desc: "Adapting base models like Llama, GPT, or Mistral to your industry-specific terminology and internal knowledge bases." },
      { subtitle: "Agentic Workflows", desc: "Building autonomous AI agents that use tools, browse the web, and execute complex multi-step business processes without human input." },
      { subtitle: "RAG Systems", desc: "Architecting retrieval-augmented generation pipelines that ground LLM outputs in your verified enterprise data sources." },
      { subtitle: "Image & Video Synthesis", desc: "Implementing Stable Diffusion and GAN architectures for automated creative, marketing, and synthetic data production." },
      { subtitle: "LLM Evaluation & Safety", desc: "Running automated red-teaming, hallucination benchmarks, and bias audits before any model reaches production." }
    ],
    useCases: [
      { industry: "Healthcare", application: "Synthesizing patient records for medical research while maintaining 100% privacy compliance." },
      { industry: "Legal", application: "Automating contract reviews and identifying legal risks using highly trained semantic LLMs." },
    ],
    techStack: ["Python", "PyTorch", "HuggingFace", "LangChain"],
    fullTechStack: [
      "Python", "PyTorch", "TensorFlow", "HuggingFace", "LangChain", "LlamaIndex",
      "OpenAI API", "Anthropic API", "Mistral API", "Ollama", "FAISS", "Pinecone",
      "Weaviate", "ChromaDB", "Qdrant", "FastAPI", "Celery", "Redis", "PostgreSQL",
      "MongoDB", "Docker", "Kubernetes", "AWS SageMaker", "Azure OpenAI", "GCP Vertex AI",
      "MLflow", "Weights & Biases", "Gradio", "Streamlit", "Langfuse",
    ],
    industries: [
      { name: "Healthcare & Life Sciences", desc: "Clinical note summarisation, drug-discovery acceleration, and patient-data synthesis at scale."  , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "Legal & Compliance",         desc: "Contract analysis, risk flagging, and regulatory-change monitoring automated end-to-end." , img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=700" },
      { name: "Financial Services",         desc: "Fraud-pattern generation, sentiment-driven trading signals, and automated regulatory reporting." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
      { name: "Media & Publishing",         desc: "Personalised content engines, AI copywriting pipelines, and automated video narration." , img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=700" },
      { name: "E-commerce & Retail",        desc: "Product description generation, visual search, and hyper-personalised recommendation engines." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Data Audit", desc: "Assess and clean your proprietary datasets, identify gaps, and establish quality benchmarks." },
      { step: "02", title: "Model Selection", desc: "Choose the right base model — Llama, GPT, Mistral — based on your latency, cost, and accuracy needs." },
      { step: "03", title: "Fine-Tuning", desc: "Train the model on your domain data using RLHF, LoRA, or full fine-tuning pipelines." },
      { step: "04", title: "RAG Integration", desc: "Connect vector databases (Pinecone, Weaviate) for retrieval-augmented generation at scale." },
      { step: "05", title: "Evaluation", desc: "Run automated evals, red-teaming, and hallucination benchmarks before any production deployment." },
      { step: "06", title: "Production Deploy", desc: "Ship via API gateway with monitoring, rate limiting, cost controls, and feedback loops." }
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    heroDesc: "Engineering fluid mobile experiences that connect brands with global users.",
    desc: "Native iOS & Android apps built for performance and user retention.",
    industryEyebrow: "Apps Built for the Real World",
    industryHeading: "Mobile Solutions Across Every Sector",
    iconName: "Smartphone",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
    longDesc: "Mobile interfaces are the primary touchpoint for modern users. Our engineering approach prioritizes 'Fluid UX' — ensuring that every interaction is lag-free while maintaining a unified codebase across iOS and Android platforms.",
    detailedCapabilities: [
      { subtitle: "Native iOS Development", desc: "High-performance Swift applications for hardware-intensive requirements like AR, on-device ML, and biometrics." },
      { subtitle: "Native Android Development", desc: "Production-grade Kotlin apps built to Google Material 3 standards with Jetpack Compose and offline-first architecture." },
      { subtitle: "Cross-Platform Engineering", desc: "Unified Flutter or React Native codebases that reach iOS and Android without compromising native look and feel." },
      { subtitle: "Secure Mobile Payments", desc: "PCI-DSS compliant checkout flows, biometric authentication, and Stripe/Braintree SDK integrations." },
      { subtitle: "App Performance Profiling", desc: "Frame-level profiling, memory leak detection, and battery optimisation before every release candidate." }
    ],
    useCases: [
      { industry: "Fintech", application: "Developing high-security banking apps with real-time transaction monitoring and biometric login." },
      { industry: "Retail", application: "Creating AR-powered shopping apps that allow customers to visualize products in their space." },
    ],
    techStack: ["Swift", "Kotlin", "Flutter", "React Native"],
    fullTechStack: [
      "Swift", "Kotlin", "Flutter", "React Native", "Jetpack Compose", "SwiftUI", "Expo",
      "Firebase", "Supabase", "GraphQL", "REST", "WebSockets", "SQLite", "Realm", "Core Data",
      "Stripe SDK", "Braintree", "Plaid", "RevenueCat", "Mapbox", "Google Maps SDK",
      "Lottie", "Rive", "Fastlane", "App Center", "XCTest", "Espresso", "Detox",
      "TestFlight", "Google Play Console", "Mixpanel", "Segment", "Amplitude",
    ],
    industries: [
      { name: "Fintech & Banking",        desc: "Real-time payment apps, biometric login, and PCI-DSS compliant mobile wallets." , img: "https://images.unsplash.com/photo-1563986768494-4641fdbdf5f7?q=80&w=700" },
      { name: "Healthcare",               desc: "Telemedicine apps, HIPAA-compliant patient portals, and wearable-device integrations." , img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=700" },
      { name: "Retail & E-commerce",      desc: "AR try-on features, loyalty programmes, and live-inventory mobile storefronts." , img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=700" },
      { name: "Logistics & Supply Chain", desc: "Driver-tracking apps, warehouse scanning tools, and real-time fleet management dashboards."  , img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700" },
      { name: "Education & E-learning",   desc: "Gamified LMS apps, offline content delivery, and student progress-analytics dashboards." , img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Discovery", desc: "User research, competitive analysis, platform decision (native vs cross-platform), and feature scoping." },
      { step: "02", title: "UX Prototyping", desc: "Figma wireframes and interactive prototypes validated with real users before development starts." },
      { step: "03", title: "Sprint Engineering", desc: "Two-week sprints delivering working features with daily standups and async progress updates." },
      { step: "04", title: "Device Testing", desc: "Automated and manual QA across 20+ real devices, OS versions, and network conditions." },
      { step: "05", title: "Store Submission", desc: "App Store and Google Play submission, metadata optimisation, and screenshot production." },
      { step: "06", title: "Live Monitoring", desc: "Crash reporting, session recording, and performance analytics via Sentry and Firebase." }
    ],
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    heroDesc: "Eliminating technical friction through automated infrastructure and CI/CD rigor.",
    desc: "CI/CD pipelines, containerization, and automated infrastructure management.",
    industryEyebrow: "Infrastructure That Never Sleeps",
    industryHeading: "DevOps Powering Mission-Critical Industries",
    iconName: "RefreshCw",
    img: "https://images.unsplash.com/photo-1667372393119-c81c0cda0c18?q=80&w=1200",
    longDesc: "We eliminate the 'it works on my machine' problem. By treating infrastructure as code, we create reproducible, self-healing environments that scale automatically based on user demand.",
    detailedCapabilities: [
      { subtitle: "CI/CD Pipeline Engineering", desc: "GitHub Actions or Jenkins pipelines with build, test, security scan, and deploy stages that run on every commit." },
      { subtitle: "Kubernetes Orchestration", desc: "Managing enterprise-scale clusters with Helm charts, autoscaling, and 99.99% uptime SLA guarantees." },
      { subtitle: "Infrastructure as Code", desc: "Every cloud resource defined in Terraform or Pulumi — version-controlled, peer-reviewed, and reproducible." },
      { subtitle: "Shift-Left Security", desc: "Trivy, SonarQube, and Snyk integrated into the build pipeline to catch vulnerabilities before they reach staging." },
      { subtitle: "Observability Stack", desc: "Prometheus, Grafana, and PagerDuty wired so every failure is visible and alerted within seconds of occurrence." }
    ],
    useCases: [
      { industry: "SaaS", application: "Reducing deployment time from days to minutes through fully automated Jenkins/Terraform pipelines." },
      { industry: "Logistics", application: "Managing global API traffic through intelligent load balancing and auto-scaling cloud clusters." },
    ],
    techStack: ["Docker", "Kubernetes", "Terraform", "Jenkins"],
    fullTechStack: [
      "Docker", "Kubernetes", "Terraform", "Helm", "Ansible", "Jenkins", "GitHub Actions",
      "GitLab CI", "CircleCI", "ArgoCD", "Flux", "Prometheus", "Grafana", "ELK Stack",
      "Datadog", "New Relic", "PagerDuty", "AWS", "Azure", "GCP", "Nginx", "Istio",
      "Linkerd", "Vault", "Trivy", "SonarQube", "Nexus", "Harbor", "Pulumi", "Crossplane",
    ],
    industries: [
      { name: "SaaS Platforms",         desc: "Multi-tenant CI/CD, feature-flag deployments, and auto-scaling Kubernetes clusters." , img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700" },
      { name: "Financial Services",     desc: "SOC 2-compliant pipelines, immutable infrastructure, and disaster-recovery automation." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
      { name: "Media & Streaming",      desc: "CDN orchestration, transcoding pipelines, and surge-capacity auto-scaling for live events." , img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=700" },
      { name: "Healthcare",             desc: "HIPAA-compliant cloud environments, full audit logging, and zero-trust networking." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "Logistics & Transport",  desc: "Global API traffic management, multi-region failover, and real-time operational monitoring." , img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Infrastructure Audit", desc: "Map existing systems, identify bottlenecks, and define target architecture." },
      { step: "02", title: "IaC Setup", desc: "Codify all infrastructure with Terraform or Pulumi — no manual provisioning." },
      { step: "03", title: "CI/CD Pipelines", desc: "GitHub Actions or Jenkins pipelines with build, test, security scan, and deploy stages." },
      { step: "04", title: "Containerisation", desc: "Dockerise all services and migrate workloads to Kubernetes with Helm charts." },
      { step: "05", title: "Observability Stack", desc: "Deploy Prometheus, Grafana, and alerting so every failure is visible within seconds." },
      { step: "06", title: "Runbook & Handoff", desc: "Document every pipeline, runbook, and incident process so your team owns it." }
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    heroDesc: "Designing digital ecosystems where aesthetics meet functional logic.",
    desc: "User-centric interfaces that drive engagement and conversion.",
    industryEyebrow: "Design That Drives Decisions",
    industryHeading: "Designing Experiences for Every Domain",
    iconName: "Palette",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=1200",
    longDesc: "Design is not just how it looks; it's how it works. We use cognitive psychology and data-driven heatmaps to build interfaces that reduce user friction and maximize conversion rates.",
    detailedCapabilities: [
      { subtitle: "User Research & Interviews", desc: "Moderated usability sessions, contextual inquiry, and JTBD frameworks to ground every design decision in evidence." },
      { subtitle: "Atomic Design Systems", desc: "Scalable component libraries in Figma and Storybook that maintain brand consistency across all platforms." },
      { subtitle: "Interactive Prototyping", desc: "High-fidelity motion prototypes in ProtoPie or Framer to test user flows before a single line of code is written." },
      { subtitle: "Usability Audits", desc: "Heatmap analysis, session recording review, and cognitive walkthrough to identify drop-off points in live products." },
      { subtitle: "Accessibility & WCAG", desc: "AA-level accessibility audits and remediation ensuring your product is usable by all audiences on all devices." }
    ],
    useCases: [
      { industry: "E-learning", application: "Gamifying educational platforms to increase student course-completion rates by 40%." },
      { industry: "Healthcare", application: "Redesigning doctor-facing dashboards to reduce task-completion time in emergency settings." },
    ],
    techStack: ["Figma", "Adobe CC", "Principle", "Lottie"],
    fullTechStack: [
      "Figma", "Adobe XD", "Sketch", "InVision", "Framer", "Principle", "ProtoPie",
      "Adobe Illustrator", "Adobe Photoshop", "After Effects", "Lottie", "Rive", "Zeroheight",
      "Storybook", "Hotjar", "Mixpanel", "Maze", "UserTesting", "Optimal Workshop",
      "Miro", "FigJam", "Tailwind CSS", "Styled Components", "Material UI", "Radix UI",
    ],
    industries: [
      { name: "Fintech",                  desc: "Trust-first design for banking dashboards, onboarding flows, and spend analytics apps." , img: "https://images.unsplash.com/photo-1563986768494-4641fdbdf5f7?q=80&w=700" },
      { name: "Healthcare",               desc: "Patient-facing portals and clinical dashboards built for accessibility and speed." , img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=700" },
      { name: "E-learning",               desc: "Gamified interfaces engineered to increase course completion and student satisfaction." , img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700" },
      { name: "Enterprise SaaS",          desc: "Complex data-dense admin panels redesigned for operational clarity and efficiency." , img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700" },
      { name: "Retail & Consumer Apps",   desc: "Conversion-optimised shopping experiences across mobile, tablet, and web." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Research", desc: "User interviews, heatmap analysis, and competitor teardowns to ground every design decision." },
      { step: "02", title: "Information Architecture", desc: "Card sorting, sitemap definition, and user-flow diagrams before any pixels are placed." },
      { step: "03", title: "Wireframing", desc: "Low-fidelity wireframes reviewed and approved by stakeholders, iterated fast." },
      { step: "04", title: "Visual Design", desc: "High-fidelity Figma screens applying your brand system — colour, type, spacing, motion." },
      { step: "05", title: "Prototype & Test", desc: "Clickable prototype tested with real users — usability sessions, eye-tracking, A/B variants." },
      { step: "06", title: "Dev Handoff", desc: "Zeroheight design system documentation, annotated specs, and Storybook component library." }
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    heroDesc: "Scalable, enterprise-grade web architectures built for the modern edge.",
    desc: "Responsive, scalable web applications using React, Next.js, and Node.",
    industryEyebrow: "Web Platforms Built to Scale",
    industryHeading: "Enterprise Web Development Across Sectors",
    iconName: "Globe",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200",
    longDesc: "We build modern web architectures that are fast by default. Using Server-Side Rendering (SSR) and Edge computing, we ensure your application loads instantly for users anywhere in the world.",
    detailedCapabilities: [
      { subtitle: "Enterprise SaaS Platforms", desc: "Multi-tenant architectures with row-level security, RBAC, and feature-flag deployment built from day one." },
      { subtitle: "Headless Architecture", desc: "Decoupling frontend from backend with Next.js, Contentful or Sanity CMS, and edge CDN for peak SEO performance." },
      { subtitle: "Real-Time Dashboards", desc: "WebSocket and GraphQL subscriptions powering live data feeds, collaborative editing, and analytics panels." },
      { subtitle: "API Design & Integration", desc: "REST and GraphQL APIs with OpenAPI documentation, rate limiting, versioning, and third-party service orchestration." },
      { subtitle: "Core Web Vitals Optimisation", desc: "Server-side rendering, image optimisation, code splitting, and edge caching tuned to achieve green Lighthouse scores." }
    ],
    useCases: [
      { industry: "Real Estate", application: "High-performance property portals with interactive maps and real-time availability sync." },
      { industry: "Energy", application: "Building IoT monitoring panels that track power consumption across thousands of sensors." },
    ],
    techStack: ["Next.js", "React", "Node.js", "MongoDB"],
    fullTechStack: [
      "Next.js", "React", "Vue.js", "Nuxt.js", "Remix", "Astro", "TypeScript",
      "Node.js", "Express", "NestJS", "FastAPI", "Django", "GraphQL", "tRPC", "REST",
      "Prisma", "Drizzle", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch",
      "Stripe", "Algolia", "Cloudinary", "AWS", "Vercel", "Cloudflare Workers",
      "Tailwind CSS", "Framer Motion", "Storybook", "Vitest", "Playwright",
    ],
    industries: [
      { name: "Real Estate",           desc: "Property portals with interactive maps, 3D tours, and live listing data synchronisation." , img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=700" },
      { name: "Healthcare",            desc: "Patient scheduling systems, HIPAA-compliant portals, and integrated telehealth platforms." , img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=700" },
      { name: "Energy & Utilities",    desc: "IoT dashboards tracking thousands of sensors in real time with intelligent alerting." , img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=700" },
      { name: "Media & Publishing",    desc: "High-traffic editorial platforms with edge caching and headless CMS architectures." , img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=700" },
      { name: "Financial Services",    desc: "Regulatory-compliant client portals, trading dashboards, and secure document management." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Technical Scoping", desc: "Architecture decision records (ADR), database schema, and API contract definitions." },
      { step: "02", title: "Design System", desc: "Component library built in Storybook before any page is assembled." },
      { step: "03", title: "Frontend Build", desc: "Next.js pages, SSR/ISR strategy, and Core Web Vitals baseline established from day one." },
      { step: "04", title: "Backend & APIs", desc: "REST or GraphQL endpoints, authentication, rate limiting, and database migrations." },
      { step: "05", title: "Integration", desc: "Third-party services wired: payments, CMS, analytics, search, and CDN configuration." },
      { step: "06", title: "Launch & Scale", desc: "Zero-downtime deploy, Lighthouse audit, and monitoring dashboards handed over." }
    ],
  },
  {
    id: "custom-software",
    title: "Custom Software Dev",
    heroDesc: "Tailoring complex logic engines to solve unique enterprise challenges.",
    desc: "Tailor-made software solutions to solve unique business challenges.",
    industryEyebrow: "Software Shaped Around You",
    industryHeading: "Custom-Built for the World's Hardest Problems",
    iconName: "Code",
    img: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1200",
    longDesc: "Off-the-shelf software often creates more problems than it solves. We build custom logic engines that fit your specific business rules like a glove — from legacy modernisation to greenfield enterprise platforms.",
    detailedCapabilities: [
      { subtitle: "Legacy Modernisation", desc: "Migrating COBOL, VB6, or monolithic Java systems to cloud-native microservices without data loss or downtime." },
      { subtitle: "Custom CRM & ERP", desc: "Building internal management platforms that match your exact operational workflow rather than forcing a workaround." },
      { subtitle: "Algorithm Development", desc: "Proprietary mathematical models, optimisation engines, and domain-specific logic for niche industry calculations." },
      { subtitle: "System Integration", desc: "Connecting disparate enterprise systems via REST, SOAP, gRPC, or message queues into a unified data layer." },
      { subtitle: "Domain-Driven Architecture", desc: "Bounded contexts, event sourcing, and CQRS patterns applied to complex multi-team codebases for long-term clarity." }
    ],
    useCases: [
      { industry: "Manufacturing", application: "Automating floor-plan logistics and inventory tracking via a custom-built ERP." },
      { industry: "HR Tech", application: "Designing an internal payroll and performance engine that integrates with 10+ different banks." },
    ],
    techStack: ["Java", "Python", ".NET", "Go"],
    fullTechStack: [
      "Java", "Spring Boot", "Python", "Django", "Flask", ".NET", "C#", "Go", "Node.js",
      "React", "Angular", "Vue.js", "PostgreSQL", "MySQL", "Oracle DB", "MSSQL", "MongoDB",
      "RabbitMQ", "Apache Kafka", "Redis", "Docker", "Kubernetes", "AWS", "Azure", "Terraform",
      "Elasticsearch", "gRPC", "REST", "GraphQL", "Keycloak", "OAuth 2.0", "LDAP", "SAP",
    ],
    industries: [
      { name: "Manufacturing",           desc: "Custom ERP and floor-logistics automation replacing legacy paper-based processes." , img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=700" },
      { name: "HR Tech",                 desc: "Bespoke payroll engines integrating with multiple banks and national tax systems." , img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=700" },
      { name: "Government",              desc: "Citizen-services portals, case-management systems, and document-processing workflows." , img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=700" },
      { name: "Agriculture",             desc: "Precision-farming platforms with IoT sensor integration and crop-yield prediction." , img: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=700" },
      { name: "Professional Services",   desc: "Billing, time-tracking, and project-management tools built around firm-specific workflows." , img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Requirements Workshop", desc: "Structured discovery sessions to extract functional and non-functional requirements." },
      { step: "02", title: "System Architecture", desc: "Database design, microservice vs monolith decision, and integration map." },
      { step: "03", title: "Iterative Build", desc: "Core logic first — business rules, algorithms, data models — then UI layer on top." },
      { step: "04", title: "Legacy Migration", desc: "Data migration scripts, parallel-run testing, and cutover plan for zero data loss." },
      { step: "05", title: "UAT", desc: "User acceptance testing with your operations team against every business scenario." },
      { step: "06", title: "Documentation", desc: "Technical documentation, API references, and admin manuals delivered at handoff." }
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    heroDesc: "Hardening digital perimeters through proactive ethical hacking and audits.",
    desc: "Penetration testing, audits, and security protocol implementation.",
    industryEyebrow: "Security Without Compromise",
    industryHeading: "Protecting Every Industry from Cyber Threats",
    iconName: "Shield",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    longDesc: "Trust is the hardest thing to build and the easiest to lose. Our security team acts as Ethical Hackers to find and fix holes before they are exploited by real adversaries.",
    detailedCapabilities: [
      { subtitle: "Penetration Testing", desc: "Simulating real-world attacks across web apps, APIs, mobile, and network to stress-test every defensive layer." },
      { subtitle: "Vulnerability Assessments", desc: "Automated and manual scanning of code dependencies, server configurations, and cloud resource policies." },
      { subtitle: "Red Team Operations", desc: "Full-scope adversary simulation including social engineering, phishing, and physical entry scenarios." },
      { subtitle: "Disaster Recovery Planning", desc: "High-redundancy backup architectures and tested runbooks ensuring your business survives any breach event." },
      { subtitle: "Security Architecture Review", desc: "Zero-trust network design, IAM policy hardening, and cloud security posture management across AWS, Azure, and GCP." }
    ],
    useCases: [
      { industry: "Government", application: "Securing public-facing portals against SQL injection and DDoS attacks." },
      { industry: "Insurance", application: "Implementing end-to-end encryption for sensitive customer claims data." },
    ],
    techStack: ["Kali Linux", "Metasploit", "Burp Suite", "Wireshark"],
    fullTechStack: [
      "Kali Linux", "Metasploit", "Burp Suite", "Wireshark", "Nmap", "Nessus", "OpenVAS",
      "Snort", "Suricata", "OSSEC", "Splunk", "IBM QRadar", "CrowdStrike", "SentinelOne",
      "HashiCorp Vault", "CyberArk", "Okta", "Duo Security", "Palo Alto Networks", "Fortinet",
      "AWS GuardDuty", "Azure Defender", "OWASP ZAP", "Nuclei", "Gobuster", "Nessus Pro",
    ],
    industries: [
      { name: "Government & Public Sector",   desc: "Penetration testing, DDoS mitigation, and hardening of citizen-facing digital portals." , img: "https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=700" },
      { name: "Banking & Insurance",          desc: "End-to-end encryption, fraud-detection audits, and SWIFT-compliant security reviews." , img: "https://images.unsplash.com/photo-1563986768494-4641fdbdf5f7?q=80&w=700" },
      { name: "Healthcare",                   desc: "HIPAA security assessments, medical-device network isolation, and breach response planning." , img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=700" },
      { name: "Retail & E-commerce",          desc: "PCI-DSS audits, web-application firewall tuning, and payment fraud prevention systems." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
      { name: "Critical Infrastructure",      desc: "OT/IT security convergence, SCADA network hardening, and industrial monitoring." , img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Threat Modelling", desc: "STRIDE analysis to identify attack surfaces before testing begins." },
      { step: "02", title: "Reconnaissance", desc: "Passive OSINT and active scanning to map your external exposure." },
      { step: "03", title: "Penetration Testing", desc: "Simulated attacks on web apps, APIs, networks, and social-engineering vectors." },
      { step: "04", title: "Vulnerability Report", desc: "Prioritised findings with CVSS scores, proof-of-concept evidence, and remediation steps." },
      { step: "05", title: "Remediation Support", desc: "Work alongside your developers to patch every critical and high finding." },
      { step: "06", title: "Re-test & Sign-off", desc: "Re-test all patched vulnerabilities and issue a clean attestation report." }
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Insights",
    heroDesc: "Refining raw enterprise data into actionable revenue strategies.",
    desc: "Turning raw data into actionable business intelligence.",
    industryEyebrow: "Turning Data into Decisions",
    industryHeading: "Analytics Powering Every Sector",
    iconName: "BarChart3",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    longDesc: "Data is the new oil, but only if you can refine it. We build data lakes and processing pipelines that turn noise into clear, actionable business intelligence your leadership can act on.",
    detailedCapabilities: [
      { subtitle: "Predictive Modelling", desc: "XGBoost, LightGBM, and neural network models forecasting churn, demand, fraud, and market movements." },
      { subtitle: "ETL Pipeline Engineering", desc: "dbt, Airflow, and Spark pipelines automating data flow from 10+ sources into a single clean warehouse." },
      { subtitle: "BI Dashboard Development", desc: "Tableau, Power BI, and Metabase dashboards with live warehouse connections and executive-ready KPI views." },
      { subtitle: "Data Quality Framework", desc: "Great Expectations checks, anomaly detection, and SLA alerting so your data is trustworthy before it reaches any model." },
      { subtitle: "ML Feature Engineering", desc: "Transforming raw events into model-ready features with versioning, lineage tracking, and reusability across projects." }
    ],
    useCases: [
      { industry: "Marketing", application: "Analyzing user ad-spend to optimize ROI across 5+ social media channels." },
      { industry: "Supply Chain", application: "Predicting inventory shortages weeks in advance using demand-sensing algorithms." },
    ],
    techStack: ["Python", "SQL", "Tableau", "Power BI"],
    fullTechStack: [
      "Python", "Pandas", "NumPy", "Polars", "Scikit-learn", "PySpark", "Apache Spark",
      "Apache Kafka", "dbt", "Apache Airflow", "Prefect", "SQL", "PostgreSQL", "MySQL",
      "BigQuery", "Snowflake", "Redshift", "Databricks", "Delta Lake", "Tableau", "Power BI",
      "Looker", "Metabase", "Apache Superset", "Grafana", "TensorFlow", "XGBoost",
      "LightGBM", "MLflow", "Weights & Biases", "Great Expectations", "dlt",
    ],
    industries: [
      { name: "Marketing & AdTech",     desc: "Attribution modelling, audience segmentation, and cross-channel ROI optimisation dashboards." , img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=700" },
      { name: "Supply Chain",           desc: "Demand forecasting, inventory optimisation, and supplier-risk scoring at scale." , img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700" },
      { name: "Financial Services",     desc: "Risk scoring models, portfolio analytics, and real-time market-signal processing." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
      { name: "Healthcare",             desc: "Clinical trial analytics, population-health dashboards, and hospital readmission prediction." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "Retail & CPG",           desc: "Price-elasticity modelling, shelf-performance tracking, and customer-lifetime-value analysis." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Data Discovery", desc: "Inventory all data sources — databases, SaaS tools, files — and assess quality." },
      { step: "02", title: "Pipeline Architecture", desc: "Design ETL/ELT pipelines using dbt, Airflow, or Spark based on data volume." },
      { step: "03", title: "Data Warehouse Build", desc: "Provision and model Snowflake, BigQuery, or Redshift with star/snowflake schemas." },
      { step: "04", title: "Feature Engineering", desc: "Transform raw data into ML-ready features for predictive models." },
      { step: "05", title: "Dashboard Build", desc: "Tableau, Power BI, or Metabase dashboards wired to live warehouse views." },
      { step: "06", title: "Alerting & Governance", desc: "Data quality checks, anomaly alerts, and access-control policies enforced." }
    ],
  },
  {
    id: "cloud-application",
    title: "Cloud Application",
    heroDesc: "Architecting resilient, elastic cloud environments for a 24/7 global audience.",
    desc: "Scalable cloud-native architectures on AWS, Azure, and Google Cloud.",
    industryEyebrow: "Cloud That Scales With You",
    industryHeading: "Cloud Infrastructure Across Industries",
    iconName: "Cloud",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
    longDesc: "Cloud is not a destination; it's a strategy. We help you move beyond just hosting and toward cloud-native thinking where your infrastructure is as elastic as your business needs.",
    detailedCapabilities: [
      { subtitle: "Cloud Architecture Design", desc: "Well-Architected Framework assessments defining the right mix of compute, storage, and networking for your workload." },
      { subtitle: "Serverless Engineering", desc: "Lambda, Cloud Run, and Azure Functions reducing operational overhead while handling unpredictable traffic spikes." },
      { subtitle: "Hybrid Cloud Integration", desc: "Connecting on-premise infrastructure with public cloud via Direct Connect, ExpressRoute, or VPN with latency guarantees." },
      { subtitle: "Cost Governance", desc: "Rightsizing, Savings Plans, Reserved Instances, and automated Zombie resource cleanup reducing bills by 30–50%." },
      { subtitle: "Disaster Recovery & HA", desc: "Multi-region failover, RTO/RPO planning, and chaos engineering tests ensuring true business continuity." }
    ],
    useCases: [
      { industry: "Media", application: "Scaling video streaming capacity instantly to support millions of concurrent viewers." },
      { industry: "Gaming", application: "Deploying low-latency game servers across 20+ global regions simultaneously." },
    ],
    techStack: ["AWS", "Azure", "GCP", "Serverless"],
    fullTechStack: [
      "AWS", "Azure", "GCP", "Terraform", "Pulumi", "CloudFormation", "Ansible", "Helm",
      "Kubernetes", "Docker", "AWS Lambda", "Azure Functions", "Google Cloud Run", "Fargate",
      "CloudFront", "Route 53", "RDS", "DynamoDB", "CosmosDB", "Firestore", "S3", "GCS",
      "API Gateway", "Kong", "Istio", "Linkerd", "Datadog", "New Relic", "PagerDuty",
      "Prometheus", "Grafana", "VPC", "WAF", "IAM", "CloudTrail", "AWS Config",
    ],
    industries: [
      { name: "Media & Entertainment",    desc: "Elastic video streaming infrastructure supporting millions of concurrent global viewers." , img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=700" },
      { name: "Gaming",                   desc: "Low-latency game servers deployed across 20+ global regions with instant auto-scaling." , img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=700" },
      { name: "SaaS Startups",            desc: "Serverless architectures that cut infrastructure costs while eliminating cold-start issues." , img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700" },
      { name: "Healthcare",               desc: "HIPAA-eligible cloud environments on AWS and Azure with complete audit trails." , img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=700" },
      { name: "Financial Services",       desc: "Private cloud clusters for high-frequency computation with sub-millisecond latency guarantees." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Cloud Readiness", desc: "Assess workloads for cloud fit: lift-and-shift vs re-architect vs rebuild." },
      { step: "02", title: "Account Baseline", desc: "Landing zone setup — VPCs, IAM policies, logging, and billing alerts." },
      { step: "03", title: "Service Selection", desc: "Map each workload to the right service: EC2, Lambda, ECS, RDS, DynamoDB, etc." },
      { step: "04", title: "Infrastructure Code", desc: "Every resource defined in Terraform — version-controlled and peer-reviewed." },
      { step: "05", title: "Security Hardening", desc: "CIS benchmarks applied, WAF configured, GuardDuty and Security Hub enabled." },
      { step: "06", title: "Cost Optimisation", desc: "Right-sizing, reserved instance planning, and Savings Plan commitments in place." }
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    heroDesc: "Building immutable, transparent trust protocols for the decentralized economy.",
    desc: "Smart contracts, dApps, and secure decentralized ledgers.",
    industryEyebrow: "Trustless Systems, Real Results",
    industryHeading: "Blockchain Solutions for Every Vertical",
    iconName: "Lock",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200",
    longDesc: "Decentralization is redefining ownership. We build transparent, immutable systems that eliminate middlemen and build trust directly into the code — from DeFi protocols to enterprise ledgers.",
    detailedCapabilities: [
      { subtitle: "Smart Contract Development", desc: "Solidity and Rust contracts with access controls, upgradeability patterns, and gas-optimised logic." },
      { subtitle: "Formal Verification & Audit", desc: "Mathematical proof of contract correctness with third-party security audit covering re-entrancy, overflow, and access bugs." },
      { subtitle: "DeFi Protocol Engineering", desc: "AMM, lending, staking, and yield-farming protocols built on Ethereum, Arbitrum, and Solana." },
      { subtitle: "NFT & Tokenisation Platforms", desc: "ERC-721/1155 collections with metadata pipelines, royalty logic, and secondary marketplace integration." },
      { subtitle: "DAO Governance Systems", desc: "On-chain voting, treasury management, and proposal execution contracts for community-governed protocols." }
    ],
    useCases: [
      { industry: "Real Estate", application: "Tokenizing physical properties to allow for fractional ownership and instant on-chain trading." },
      { industry: "Luxury Goods", application: "Using NFTs as Digital Passports to verify the authenticity of high-end products." },
    ],
    techStack: ["Solidity", "Rust", "Ethereum", "Polygon"],
    fullTechStack: [
      "Solidity", "Rust", "Vyper", "Hardhat", "Foundry", "Truffle", "OpenZeppelin",
      "Ethereum", "Polygon", "Arbitrum", "Optimism", "Avalanche", "Solana", "Base",
      "IPFS", "Filecoin", "The Graph", "Chainlink", "Moralis", "Alchemy", "Infura",
      "MetaMask SDK", "WalletConnect", "Rainbow Kit", "ERC-20", "ERC-721", "ERC-1155",
      "Fireblocks", "Gnosis Safe", "Tenderly", "Dune Analytics",
    ],
    industries: [
      { name: "Real Estate",            desc: "Fractional property tokenisation enabling instant on-chain ownership transfers." , img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=700" },
      { name: "Luxury & Authentication", desc: "NFT-backed digital passports verifying provenance of high-end goods and collectibles."  , img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=700" },
      { name: "DeFi & Fintech",         desc: "Lending, borrowing, and yield-farming protocols on Ethereum and Layer-2 networks." , img: "https://images.unsplash.com/photo-1563986768494-4641fdbdf5f7?q=80&w=700" },
      { name: "Supply Chain",           desc: "Immutable product-traceability ledgers tracked from manufacturer to end consumer." , img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700" },
      { name: "Gaming & Metaverse",     desc: "Play-to-earn economies, in-game asset ownership, and decentralised tournament payouts." , img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Protocol Design", desc: "Token economics, governance model, and consensus mechanism design." },
      { step: "02", title: "Smart Contract Dev", desc: "Solidity or Rust contracts written with access controls and upgradeability patterns." },
      { step: "03", title: "Formal Verification", desc: "Mathematical proof of contract correctness and gas optimisation." },
      { step: "04", title: "Security Audit", desc: "Third-party audit + internal review covering re-entrancy, overflow, and access bugs." },
      { step: "05", title: "Testnet Deploy", desc: "Full deployment to testnet with integration testing against front-end and oracles." },
      { step: "06", title: "Mainnet Launch", desc: "Staged mainnet deployment with multisig admin and emergency pause capability." }
    ],
  },
  {
    id: "game-dev",
    title: "Game Development",
    heroDesc: "Crafting hyper-immersive digital worlds with industry-leading physics and narrative.",
    desc: "Immersive 2D and 3D gaming experiences for mobile and PC.",
    industryEyebrow: "Play Built for Every Audience",
    industryHeading: "Game Development Across Every Industry",
    iconName: "Gamepad2",
    img: "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=1200",
    longDesc: "We build worlds. Our game development team combines cutting-edge physics engines with compelling narrative design to create titles that keep players engaged and coming back.",
    detailedCapabilities: [
      { subtitle: "AAA Physics Engines", desc: "C++ code optimised for realistic cloth, fluid, rigid-body, and particle simulations at 60fps on target hardware." },
      { subtitle: "Multiplayer Networking", desc: "Authoritative server architecture with lag compensation, client-side prediction, and anti-cheat integration." },
      { subtitle: "Narrative & Level Design", desc: "Game design documentation, branching story systems, and level blueprints that balance pacing with player agency." },
      { subtitle: "Cross-Platform Publishing", desc: "Single codebase deployed to PC, console, and mobile with platform-specific input, resolution, and store compliance." },
      { subtitle: "LiveOps Backend", desc: "Daily challenges, seasonal events, A/B testing, and leaderboard services built to support 10M+ concurrent players." }
    ],
    useCases: [
      { industry: "Education", application: "Developing high-end Serious Games for surgical training and flight simulation." },
      { industry: "Advertising", application: "Building Advergames for major consumer brands to drive measurable product engagement." },
    ],
    techStack: ["Unity", "Unreal Engine", "C#", "C++"],
    fullTechStack: [
      "Unity", "Unreal Engine", "C#", "C++", "Godot", "Blender", "Maya", "ZBrush",
      "Substance Painter", "Houdini", "FMOD", "Wwise", "Photon Network", "Mirror",
      "PlayFab", "Steamworks SDK", "Epic Online Services", "Firebase", "AWS GameLift",
      "NVIDIA PhysX", "Oculus SDK", "SteamVR", "ARKit", "ARCore",
      "Cinemachine", "ProBuilder", "Shader Graph", "VFX Graph", "DOTS",
    ],
    industries: [
      { name: "Entertainment & AAA Studios", desc: "Console and PC titles with physics-accurate engines and cinematic narrative cutscenes."  , img: "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=700" },
      { name: "Education & Training",        desc: "Serious games for surgical simulation, pilot training, and industrial safety programmes." , img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700" },
      { name: "Advertising & Brand Games",   desc: "Advergames driving measurable product engagement for major consumer brands." , img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=700" },
      { name: "Military & Defence",          desc: "Simulation environments for tactical decision-making and mission planning training." , img: "https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=700" },
      { name: "Healthcare",                  desc: "Rehabilitation games using motion capture to gamify physical-therapy recovery exercises." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Concept & GDD", desc: "Game Design Document defining mechanics, art style, platform targets, and monetisation." },
      { step: "02", title: "Prototype", desc: "Playable grey-box prototype to validate core loop fun before full production." },
      { step: "03", title: "Asset Production", desc: "Characters, environments, and UI assets built to performance budgets." },
      { step: "04", title: "Systems Engineering", desc: "Physics, AI, networking, and progression systems implemented and stress-tested." },
      { step: "05", title: "QA & Certification", desc: "Functional testing, platform TRC/TCR compliance, and performance profiling." },
      { step: "06", title: "LiveOps Setup", desc: "Analytics, A/B testing, remote config, and update pipeline ready before launch." }
    ],
  },
  {
    id: "web3-gaming",
    title: "Web3 Gaming",
    heroDesc: "Redefining player value through NFT assets and Play-to-Earn mechanics.",
    desc: "Play-to-earn models and NFT integration for next-gen gaming.",
    industryEyebrow: "Ownership in Every Game",
    industryHeading: "Web3 Gaming Changing Every Sector",
    iconName: "Box",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200",
    longDesc: "In Web3 gaming, players truly own their assets. We bridge the gap between traditional gameplay and on-chain economies to create games where fun and financial reward coexist.",
    detailedCapabilities: [
      { subtitle: "On-Chain Asset Ownership", desc: "ERC-721/1155 in-game items with provable scarcity, transferability, and secondary marketplace liquidity." },
      { subtitle: "Play-to-Earn Tokenomics", desc: "Economic simulations and balanced reward loops that prevent inflation while sustaining long-term player engagement." },
      { subtitle: "Wallet-Free Onboarding", desc: "Social login abstraction layers allowing non-crypto players to enter blockchain games with zero friction." },
      { subtitle: "Cross-Chain Compatibility", desc: "Asset bridging and multi-chain support across Ethereum, Polygon, Immutable X, and Solana for maximum liquidity." },
      { subtitle: "Smart Contract Security", desc: "Full audit coverage for NFT, staking, and governance contracts before any mainnet deployment." }
    ],
    useCases: [
      { industry: "Metaverse", application: "Building persistent virtual worlds where digital land is a tradeable investment asset." },
      { industry: "ESports", application: "Decentralizing tournament rewards through automated smart-contract payout systems." },
    ],
    techStack: ["Solidity", "Unity", "Moralis", "OpenZeppelin"],
    fullTechStack: [
      "Solidity", "Unity", "Unreal Engine", "Moralis", "OpenZeppelin", "Hardhat", "Foundry",
      "Ethereum", "Polygon", "Immutable X", "Avalanche", "Ronin", "IPFS", "Alchemy",
      "WalletConnect", "MetaMask SDK", "ERC-721", "ERC-1155", "The Graph", "Chainlink",
      "PlayFab", "Firebase", "AWS GameLift", "Photon", "Node.js", "GraphQL", "React",
    ],
    industries: [
      { name: "Metaverse & Virtual Worlds", desc: "Persistent virtual environments with blockchain-backed land ownership and asset trading."  , img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=700" },
      { name: "ESports & Tournaments",      desc: "Decentralised prize pools and automated smart-contract payout systems for competitors." , img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=700" },
      { name: "Collectibles & NFTs",        desc: "Curated NFT collections tied to in-game utility and long-term ecosystem rewards." , img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=700" },
      { name: "Play-to-Earn Platforms",     desc: "Balanced tokenomics models that keep players engaged while preserving asset value." , img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=700" },
      { name: "GameFi & DeFi Hybrid",       desc: "Yield-generating in-game mechanics blending DeFi liquidity with traditional gameplay." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Tokenomics Design", desc: "Economic model simulation to balance play-to-earn rewards without inflation." },
      { step: "02", title: "Smart Contracts", desc: "NFT minting, marketplace, staking, and reward contracts written and audited." },
      { step: "03", title: "Game Integration", desc: "Unity/Unreal SDK wired to wallet authentication and on-chain asset ownership." },
      { step: "04", title: "Backend Services", desc: "Off-chain indexing, leaderboards, and metadata storage via IPFS." },
      { step: "05", title: "Security Audit", desc: "Contract audit covering all attack vectors including price manipulation." },
      { step: "06", title: "Community Launch", desc: "Testnet beta with community, ambassador programme, and mainnet TGE." }
    ],
  },
  {
    id: "ar-vr-gaming",
    title: "AR/VR/XR Gaming",
    heroDesc: "Developing spatial experiences that redefine the boundaries of human interaction.",
    desc: "Extended reality experiences that blur the line between physical and digital.",
    industryEyebrow: "Reality Reimagined Everywhere",
    industryHeading: "Immersive XR Experiences Across Sectors",
    iconName: "Eye",
    img: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=1200",
    longDesc: "XR is the ultimate frontier of human-computer interaction. We create spatial experiences that go beyond the screen — from high-stakes industrial training tools to consumer entertainment.",
    detailedCapabilities: [
      { subtitle: "Spatial Mapping & Anchoring", desc: "Computer vision pipelines allowing digital objects to persist and interact with real-world surfaces and environments." },
      { subtitle: "Hand & Eye Tracking UX", desc: "Gesture-based interaction design and gaze-based UI for Meta Quest, HoloLens, and Vision Pro." },
      { subtitle: "Performance Optimisation", desc: "GPU profiling, draw call reduction, and foveated rendering to hit 90fps targets on standalone headsets." },
      { subtitle: "Industrial XR Simulation", desc: "High-stakes training simulators for surgery, aviation, mining, and electrical engineering with realistic physics." },
      { subtitle: "Multi-User Shared Spaces", desc: "Real-time collaborative XR environments with sub-50ms synchronisation across multiple headsets." }
    ],
    useCases: [
      { industry: "Real Estate", application: "Virtual walkthroughs allowing buyers to visit unbuilt homes in full 1:1 scale." },
      { industry: "Fitness", application: "Developing VR games that track physical movement for an immersive workout experience." },
    ],
    techStack: ["Oculus SDK", "OpenVR", "ARCore", "Unity"],
    fullTechStack: [
      "Unity", "Unreal Engine", "Oculus SDK", "OpenXR", "OpenVR", "SteamVR",
      "ARKit", "ARCore", "Vuforia", "Meta Quest SDK", "HoloLens SDK", "WebXR",
      "C#", "C++", "Blender", "Maya", "Substance Painter", "Shader Graph",
      "Photon", "Mirror", "AWS GameLift", "Firebase", "MRTK", "Niantic Lightship",
      "8th Wall", "A-Frame", "Three.js",
    ],
    industries: [
      { name: "Real Estate & Architecture", desc: "1:1 scale virtual walkthroughs of unbuilt properties for buyers and investors."  , img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=700" },
      { name: "Industrial Training",        desc: "High-risk job simulators for electrical engineering, mining, and heavy equipment operation." , img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=700" },
      { name: "Healthcare & Surgery",       desc: "Surgical planning visualisation and procedural training in immersive 3D environments." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "Retail & Fashion",           desc: "Virtual try-on experiences for apparel, eyewear, and home-décor purchasing decisions." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
      { name: "Education & Museums",        desc: "Interactive historical reconstructions and science visualisations for immersive learning." , img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Spatial Design", desc: "World-scale mapping, interaction design, and comfort guidelines for each headset." },
      { step: "02", title: "Scene Architecture", desc: "Occlusion, LOD strategy, and draw call budget defined before asset production." },
      { step: "03", title: "Asset Pipeline", desc: "PBR assets built to headset poly budgets with automated optimisation." },
      { step: "04", title: "Interaction Build", desc: "Hand tracking, gaze, voice, or controller input implemented and ergonomics tested." },
      { step: "05", title: "Performance Profiling", desc: "GPU/CPU frame time profiled to hit target frame rate on every target device." },
      { step: "06", title: "Platform Submission", desc: "Meta Quest, SteamVR, or App Store submission with compliance documentation." }
    ],
  },
  {
    id: "gaming-art",
    title: "Gaming Art & Design",
    heroDesc: "Synthesizing high-fidelity characters and environments for the modern gamer.",
    desc: "Character design, environment modeling, and asset creation.",
    industryEyebrow: "Art That Brings Worlds to Life",
    industryHeading: "Visual Craftsmanship for Every Platform",
    iconName: "PenTool",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200",
    longDesc: "Visual fidelity is the heartbeat of a game. Our artists create assets that are both stunning and technically optimised for mobile or PC rendering pipelines.",
    detailedCapabilities: [
      { subtitle: "Character Concept & Sculpting", desc: "2D concept art to ZBrush high-poly sculpts with full lore-consistent design documentation." },
      { subtitle: "PBR Material & Texturing", desc: "Physically Based Rendering texture sets in Substance Painter with LOD variants for mobile, PC, and console." },
      { subtitle: "Rigging & Animation", desc: "Complex skeletal rigs and motion-captured animation sets covering locomotion, combat, and facial expression." },
      { subtitle: "Environment Art", desc: "Modular tileset systems and atmospheric level art from post-apocalyptic cities to underwater environments." },
      { subtitle: "VFX & Particle Systems", desc: "Real-time visual effects including magic spells, explosions, weather systems, and destruction simulations." }
    ],
    useCases: [
      { industry: "Entertainment", application: "Creating cinematic cutscenes for narrative-driven RPGs and action titles." },
      { industry: "Marketing", application: "Designing high-quality 3D mascots and brand characters for corporate campaigns." },
    ],
    techStack: ["Blender", "ZBrush", "Maya", "Substance Painter"],
    fullTechStack: [
      "Blender", "ZBrush", "Maya", "3ds Max", "Houdini", "Cinema 4D",
      "Substance Painter", "Substance Designer", "Marmoset Toolbag", "Rizom UV",
      "Adobe Photoshop", "Adobe Illustrator", "After Effects", "Spine 2D",
      "Unreal Engine", "Unity", "Perforce", "Git LFS", "Shotgun", "ShotGrid",
      "PBR Workflows", "LOD Pipelines", "Mocap Integration", "Retopology Tools",
    ],
    industries: [
      { name: "AAA Gaming Studios",      desc: "High-poly character models, cinematic cutscenes, and sprawling world environments." , img: "https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=700" },
      { name: "Mobile Gaming",           desc: "Optimised low-poly assets and 2D sprite sheets built for performance on device." , img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=700" },
      { name: "Film & Animation",        desc: "Pre-visualisation assets and VFX-ready 3D models for film and television productions." , img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=700" },
      { name: "Marketing & Advertising", desc: "3D brand mascots, product visualisations, and animated social-media campaign assets."  , img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=700" },
      { name: "VR & Metaverse",          desc: "Spatially optimised environments and avatar systems for real-time XR applications." , img: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Art Direction", desc: "Style guide, colour palette, and reference board approved before production." },
      { step: "02", title: "Concept Art", desc: "2D concept sheets for every character, environment, and key prop." },
      { step: "03", title: "3D Modelling", desc: "High-poly sculpts in ZBrush then retopologised to engine-ready poly counts." },
      { step: "04", title: "Texturing & Materials", desc: "PBR texture sets in Substance Painter with LOD variants for mobile/PC." },
      { step: "05", title: "Rigging & Animation", desc: "Skeleton rigs and animation sets — idle, locomotion, combat, and facial." },
      { step: "06", title: "Engine Integration", desc: "Assets imported, LODs assigned, and performance validated inside Unity/Unreal." }
    ],
  },
  {
    id: "qa-testing",
    title: "Quality Assurance",
    heroDesc: "Guaranteeing high-scale stability through rigorous automated and manual protocols.",
    desc: "Automated and manual testing to ensure bug-free deployment.",
    industryEyebrow: "Quality That Ships with Confidence",
    industryHeading: "Rigorous Testing Across Every Industry",
    iconName: "CheckCircle",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    longDesc: "A bug in production is 100x more expensive than a bug in development. We ensure your software is battle-tested against all edge cases before it reaches the end user.",
    detailedCapabilities: [
      { subtitle: "Test Strategy & Planning", desc: "Risk-based test plans covering scope, environments, entry/exit criteria, and defect severity definitions." },
      { subtitle: "Automated Regression Suites", desc: "Playwright or Cypress frameworks wired to CI so every commit triggers thousands of regression checks." },
      { subtitle: "Load & Stress Testing", desc: "k6 or JMeter scripts simulating peak traffic, soak conditions, and spike scenarios before every release." },
      { subtitle: "Mobile Device Testing", desc: "Appium and Detox automation across 30+ real iOS and Android device and OS version combinations." },
      { subtitle: "Security & Accessibility QA", desc: "OWASP ZAP scans, Snyk dependency checks, and WCAG AA audits integrated into every pipeline run." }
    ],
    useCases: [
      { industry: "E-commerce", application: "Ensuring checkout flows work perfectly during high-traffic Black Friday events." },
      { industry: "Banking", application: "Verifying mathematical accuracy for multi-currency interest calculations across regions." },
    ],
    techStack: ["Selenium", "Cypress", "Jest", "JMeter"],
    fullTechStack: [
      "Selenium", "Cypress", "Playwright", "Jest", "Vitest", "Mocha", "Jasmine",
      "JMeter", "Gatling", "k6", "Locust", "Postman", "RestAssured", "SoapUI",
      "Appium", "Detox", "TestFlight", "Firebase Test Lab", "BrowserStack",
      "Sauce Labs", "SonarQube", "OWASP ZAP", "Snyk", "GitHub Actions", "Jenkins",
      "Allure Report", "TestRail", "Zephyr", "JIRA",
    ],
    industries: [
      { name: "E-commerce & Retail",    desc: "End-to-end checkout testing and load simulation for high-traffic shopping events." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
      { name: "Banking & Finance",       desc: "Mathematical accuracy validation for multi-currency calculations and regulatory scenarios." , img: "https://images.unsplash.com/photo-1563986768494-4641fdbdf5f7?q=80&w=700" },
      { name: "Healthcare",              desc: "HIPAA-compliance testing, data-integrity validation, and device-integration QA." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "SaaS Platforms",          desc: "Regression suites that run on every commit, protecting multi-tenant platform stability." , img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700" },
      { name: "Government",              desc: "Accessibility compliance testing (WCAG) and security scanning for citizen-facing portals." , img: "https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Test Strategy", desc: "Risk-based test plan covering scope, environments, entry/exit criteria." },
      { step: "02", title: "Test Case Authoring", desc: "Manual and automated test cases mapped to every acceptance criterion." },
      { step: "03", title: "Automation Framework", desc: "Playwright or Cypress framework set up with CI integration from day one." },
      { step: "04", title: "Load Testing", desc: "k6 or JMeter scripts simulate peak traffic — baseline, stress, and soak tests." },
      { step: "05", title: "Security Scanning", desc: "OWASP ZAP and Snyk integrated into the pipeline for every build." },
      { step: "06", title: "Sign-off Report", desc: "Defect density, coverage metrics, and release recommendation delivered." }
    ],
  },
  {
    id: "saas-development",
    title: "SaaS Development",
    heroDesc: "Architecting multi-tenant digital ecosystems for recurring revenue at global scale.",
    desc: "Multi-tenant architecture for scalable software-as-a-service products.",
    industryEyebrow: "Scale Once, Serve Millions",
    industryHeading: "SaaS Platforms Serving Every Market",
    iconName: "Server",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    longDesc: "The SaaS economy requires a specialised architecture. We focus on build-once, serve-many models that allow you to scale your user base without exponentially increasing infrastructure costs.",
    detailedCapabilities: [
      { subtitle: "Multi-Tenant Architecture", desc: "Schema-per-tenant vs row-level-security decisions made for your isolation requirements, cost, and compliance needs." },
      { subtitle: "Subscription Billing Engine", desc: "Stripe or Paddle integration with prorated trials, usage-based metering, coupons, and dunning workflows." },
      { subtitle: "Feature Flags & Rollouts", desc: "LaunchDarkly or custom flag system enabling per-tenant beta rollouts without code deploys." },
      { subtitle: "Admin Hub & Analytics", desc: "Internal admin panel with user management, impersonation, usage dashboards, and audit log views." },
      { subtitle: "Scalability Architecture", desc: "Horizontal scaling, read replicas, caching layers, and queue-based background processing for growth-day traffic." }
    ],
    useCases: [
      { industry: "HR Management", application: "Building a global payroll platform that scales to 50,000+ client companies." },
      { industry: "Project Management", application: "Developing a collaborative board system with real-time editing for distributed teams." },
    ],
    techStack: ["Node.js", "AWS", "Stripe API", "PostgreSQL"],
    fullTechStack: [
      "Next.js", "React", "TypeScript", "Node.js", "NestJS", "Go", "Python", "FastAPI",
      "GraphQL", "tRPC", "REST", "PostgreSQL", "Redis", "MongoDB", "ClickHouse",
      "Stripe", "Paddle", "Lemon Squeezy", "Auth0", "Clerk", "NextAuth",
      "AWS", "Vercel", "Railway", "Terraform", "Kubernetes", "Docker",
      "Datadog", "Sentry", "LaunchDarkly", "Resend", "Twilio", "Segment", "PostHog",
    ],
    industries: [
      { name: "HR & Workforce Management", desc: "Global payroll platforms handling multi-currency, multi-entity compliance at scale."  , img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=700" },
      { name: "Project & Work Management", desc: "Real-time collaborative workspaces with offline sync and intelligent workload balancing."  , img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=700" },
      { name: "Legal Tech",                desc: "Document automation SaaS with e-signature flows and matter-management modules." , img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=700" },
      { name: "Healthcare",                desc: "Multi-tenant EHR platforms with FHIR-compliant APIs and granular role-based access." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "EdTech",                    desc: "LMS platforms supporting tens of thousands of concurrent learners with adaptive content." , img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Tenant Architecture", desc: "Schema-per-tenant vs row-level-security decision based on isolation and cost." },
      { step: "02", title: "Auth & Billing", desc: "Auth0 or Clerk + Stripe with subscription tiers, usage metering, and dunning." },
      { step: "03", title: "Core Product", desc: "Feature flags from day one so you can ship to select tenants before full release." },
      { step: "04", title: "Admin & Analytics", desc: "Internal admin panel with usage dashboards, impersonation, and audit logs." },
      { step: "05", title: "Observability", desc: "Datadog or PostHog wired so you see exactly how every tenant uses every feature." },
      { step: "06", title: "Scale Testing", desc: "Load-test at 10× projected peak before launch — no surprises on growth days." }
    ],
  },
  {
    id: "cloud-ops",
    title: "Cloud Migration & Ops",
    heroDesc: "Transitioning legacy systems to modern cloud infrastructure with zero downtime.",
    desc: "Seamless transition of legacy systems to modern cloud infrastructure.",
    industryEyebrow: "Migration Done Right",
    industryHeading: "Cloud Migration Across Every Vertical",
    iconName: "Layout",
    img: "https://images.unsplash.com/photo-1483736762128-d650fdb0fd22?q=80&w=1200",
    longDesc: "Don't just move to the cloud; thrive in it. We optimise your legacy databases and server logic for modern cloud services to slash operational costs and eliminate single points of failure.",
    detailedCapabilities: [
      { subtitle: "Migration Discovery Audit", desc: "Full inventory of servers, databases, dependencies, and data flows — nothing moves without a complete map." },
      { subtitle: "Migration Wave Planning", desc: "Workloads prioritised by complexity and risk into ordered waves with rollback procedures for each." },
      { subtitle: "Zero-Downtime Data Migration", desc: "AWS DMS or Azure Database Migration Service for live cutover with parallel-run validation before DNS switch." },
      { subtitle: "Cloud-Native Re-Platforming", desc: "Bottleneck services rewritten as serverless functions or containers to dramatically improve performance and cost." },
      { subtitle: "Post-Migration Optimisation", desc: "Rightsizing, Reserved Instance purchases, and decommission of legacy infrastructure after 30-day validation." }
    ],
    useCases: [
      { industry: "Media Archives", application: "Moving 50 years of video content from local tapes to high-speed cloud storage." },
      { industry: "Finance", application: "Migrating legacy mainframe computations to secure, private cloud clusters." },
    ],
    techStack: ["AWS Migration Hub", "Azure Migrate", "Ansible", "Nginx"],
    fullTechStack: [
      "AWS Migration Hub", "Azure Migrate", "Google Migrate", "Ansible", "Terraform",
      "Pulumi", "CloudFormation", "Nginx", "Apache", "HAProxy", "Docker", "Kubernetes",
      "AWS DMS", "Azure Database Migration Service", "Flyway", "Liquibase",
      "AWS CloudWatch", "Datadog", "New Relic", "Prometheus", "Grafana",
      "Velero", "Restic", "AWS Backup", "Azure Backup", "Fastly", "CloudFront",
    ],
    industries: [
      { name: "Media & Broadcasting",    desc: "Migrating decades of archived video content to cost-efficient cloud storage tiers." , img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=700" },
      { name: "Financial Services",      desc: "Moving legacy mainframe workloads to secure, compliant private cloud environments." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
      { name: "Healthcare",              desc: "Zero-downtime migration of on-premise EHR systems to HIPAA-eligible cloud platforms." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "Manufacturing",           desc: "Modernising on-premise ERP systems to cloud-native microservices without business disruption." , img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=700" },
      { name: "Retail & E-commerce",     desc: "Migrating monolithic storefronts to headless, edge-optimised cloud architectures." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Discovery Audit", desc: "Inventory all servers, databases, and dependencies — nothing migrates without a map." },
      { step: "02", title: "Migration Wave Plan", desc: "Prioritise services by complexity and business impact into ordered migration waves." },
      { step: "03", title: "Proof of Concept", desc: "Migrate one non-critical service first to validate tooling and runbooks." },
      { step: "04", title: "Live Migration", desc: "AWS DMS or Azure Database Migration Service for zero-downtime data cutover." },
      { step: "05", title: "Validation", desc: "Parallel-run both environments and compare outputs before final DNS cutover." },
      { step: "06", title: "Decommission", desc: "Shut down legacy servers only after 30-day clean monitoring period." }
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    heroDesc: "Developing conversion-optimized storefronts that turn browsers into loyal customers.",
    desc: "Custom storefronts, payment integration, and inventory management.",
    industryEyebrow: "Commerce Built to Convert",
    industryHeading: "E-commerce Solutions for Every Market",
    iconName: "ShoppingCart",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1200",
    longDesc: "E-commerce is about more than a Buy button. It's about high-speed search, personalised recommendations, and a frictionless checkout ecosystem that converts at every touchpoint.",
    detailedCapabilities: [
      { subtitle: "Storefront Engineering", desc: "Next.js or Shopify Plus storefronts with sub-1s LCP, instant faceted filtering, and A/B testing built in." },
      { subtitle: "Payment Orchestration", desc: "Stripe, Adyen, Klarna, and 15+ local payment methods unified into a single PCI-DSS compliant checkout flow." },
      { subtitle: "Inventory & OMS Integration", desc: "Real-time stock sync between ERP, WMS, and all sales channels eliminating overselling and stockout issues." },
      { subtitle: "Personalisation Engine", desc: "Collaborative filtering and session-based recommendations driving measurable increases in average order value." },
      { subtitle: "Performance & SEO", desc: "Core Web Vitals green, structured data, edge caching, and image CDN tuned for organic search dominance." }
    ],
    useCases: [
      { industry: "Fashion", application: "Creating a high-speed storefront handling 10,000+ SKUs with instant faceted filtering." },
      { industry: "Automotive", application: "Building a B2B parts marketplace with individual pricing tiers for different vendor classes." },
    ],
    techStack: ["Next.js", "Shopify", "Headless CMS", "Stripe"],
    fullTechStack: [
      "Next.js", "React", "Shopify", "Shopify Plus", "Magento", "WooCommerce", "Medusa.js",
      "Stripe", "Braintree", "Adyen", "PayPal", "Klarna", "Afterpay",
      "Node.js", "NestJS", "FastAPI", "PostgreSQL", "MongoDB", "Redis",
      "Elasticsearch", "Algolia", "Contentful", "Sanity", "Strapi", "Cloudinary",
      "AWS", "Vercel", "Fastly", "Klaviyo", "Segment", "Google Analytics 4", "Hotjar",
    ],
    industries: [
      { name: "Fashion & Apparel",    desc: "High-speed storefronts handling thousands of SKUs with real-time inventory and instant filters." , img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=700" },
      { name: "Automotive Parts",     desc: "B2B parts marketplaces with fitment-guide APIs and vendor-specific pricing tiers." , img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=700" },
      { name: "Food & Grocery",       desc: "On-demand delivery platforms with dark-store inventory and dynamic slot management." , img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=700" },
      { name: "Electronics & Tech",   desc: "Comparison engines, product bundles, and warranty-management flows for complex catalogues." , img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=700" },
      { name: "Luxury & Jewellery",   desc: "White-glove shopping experiences with 3D visualisation and personalised concierge flows." , img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Platform Decision", desc: "Shopify Plus vs headless Medusa vs custom — based on volume, complexity, and budget." },
      { step: "02", title: "Design & UX", desc: "Conversion-focused design: product discovery, PDP, cart, and checkout flows." },
      { step: "03", title: "Payment Integration", desc: "Stripe, Adyen, or Braintree with local payment methods and 3DS2 compliance." },
      { step: "04", title: "Inventory Sync", desc: "ERP and WMS integration so stock levels are always accurate across all channels." },
      { step: "05", title: "Performance", desc: "Core Web Vitals green, image CDN, edge caching, and search powered by Algolia." },
      { step: "06", title: "Launch & Growth", desc: "A/B testing framework, analytics events, and email automation wired from day one." }
    ],
  },
  {
    id: "design-dev",
    title: "Product Design",
    heroDesc: "Mastering the end-to-end product lifecycle from strategy to engineering handoff.",
    desc: "Full-cycle product design from prototyping to final code.",
    industryEyebrow: "From Sketch to Shipped",
    industryHeading: "Product Design Across Every Industry",
    iconName: "FileEdit",
    img: "https://images.unsplash.com/photo-1509395062558-412640432671?q=80&w=1200",
    longDesc: "We take your napkin sketch and turn it into a scalable technical roadmap. Our product leads bridge the gap between business goals and engineering reality at every stage.",
    detailedCapabilities: [
      { subtitle: "Product Discovery", desc: "JTBD interviews, opportunity scoring, and competitive positioning to define your MVP feature set precisely." },
      { subtitle: "User Journey Mapping", desc: "End-to-end journey maps for every persona with pain points, moments of delight, and drop-off risks annotated." },
      { subtitle: "High-Fidelity Prototyping", desc: "Figma prototypes tested with real users in moderated sessions before any engineering sprint begins." },
      { subtitle: "Technical Spec Writing", desc: "Engineering tickets, API contracts, and acceptance criteria written by product leads in developer-ready format." },
      { subtitle: "Design-Dev Handoff", desc: "Zeroheight design system documentation, annotated redlines, and Storybook components ready for immediate build." }
    ],
    useCases: [
      { industry: "Startups", application: "Helping founders raise seed funding by building high-fidelity click-through prototypes." },
      { industry: "Enterprise", application: "Modernizing internal workflows by mapping out and digitizing paper-based processes." },
    ],
    techStack: ["Adobe CC", "Figma", "HTML5/CSS3", "JavaScript"],
    fullTechStack: [
      "Figma", "Adobe XD", "Sketch", "InVision", "Framer", "Adobe Illustrator",
      "Adobe Photoshop", "After Effects", "Lottie", "Rive", "Miro", "FigJam",
      "Notion", "Linear", "Jira", "Confluence", "ClickUp",
      "React", "Next.js", "TypeScript", "Tailwind CSS", "Storybook",
      "HTML5", "CSS3", "JavaScript", "Framer Motion", "GSAP",
    ],
    industries: [
      { name: "Startups & Scale-ups",  desc: "MVP scoping, investor-ready prototypes, and rapid product-market-fit iteration." , img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=700" },
      { name: "Enterprise",            desc: "Digitising paper-based internal workflows into streamlined, measurable digital products." , img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=700" },
      { name: "Fintech",               desc: "Regulatory-compliant product journeys with trust-first design and accessibility baked in." , img: "https://images.unsplash.com/photo-1563986768494-4641fdbdf5f7?q=80&w=700" },
      { name: "Healthcare",            desc: "Patient-centred product design balancing clinical complexity with everyday usability." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "E-commerce",            desc: "Conversion-focused product experiences built on data, not assumption." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Product Discovery", desc: "Jobs-to-be-done interviews, market sizing, and competitive positioning workshop." },
      { step: "02", title: "MVP Scope", desc: "Feature prioritisation matrix to define the smallest shippable product." },
      { step: "03", title: "User Journey Maps", desc: "End-to-end journey maps for every persona with pain points annotated." },
      { step: "04", title: "Prototyping", desc: "High-fidelity Figma prototype tested with 5+ real users in moderated sessions." },
      { step: "05", title: "Technical Spec", desc: "Engineering tickets, API contracts, and acceptance criteria written by product leads." },
      { step: "06", title: "Handoff", desc: "Zeroheight design system + Linear backlog ready for the engineering team to sprint." }
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Support",
    heroDesc: "Securing system longevity through 24/7 technical monitoring and optimization.",
    desc: "24/7 monitoring, updates, and optimization for live systems.",
    industryEyebrow: "Always On, Always Ready",
    industryHeading: "24/7 Support Across Every Sector",
    iconName: "Wrench",
    img: "https://images.unsplash.com/photo-1581092921461-eab62e97a78e?q=80&w=1200",
    longDesc: "Software is not a one-time purchase; it's an investment that needs care. We proactively monitor your servers to detect and resolve issues before your users ever notice them.",
    detailedCapabilities: [
      { subtitle: "24/7 SLA Monitoring", desc: "Dedicated on-call teams with defined response times, uptime guarantees, and escalation paths documented upfront." },
      { subtitle: "Dependency & Security Patching", desc: "Monthly OS and library updates plus emergency CVE response within 4 hours of critical vulnerability disclosure." },
      { subtitle: "Performance Tuning", desc: "Monthly slow-query analysis, cache hit-rate reviews, and infrastructure rightsizing to prevent gradual degradation." },
      { subtitle: "Incident Response", desc: "Runbook-driven incident resolution with root-cause analysis and post-mortem reports delivered within 48 hours." },
      { subtitle: "Proactive Health Reviews", desc: "Quarterly architecture reviews identifying technical debt and scaling risks before they become production incidents." }
    ],
    useCases: [
      { industry: "SaaS", application: "Managing a global app's maintenance so the core product team can focus on new features." },
      { industry: "News/Media", application: "Providing 24/7 support for a high-traffic news site that cannot afford even one minute of downtime." },
    ],
    techStack: ["Sentry", "LogRocket", "New Relic", "GitHub"],
    fullTechStack: [
      "Sentry", "LogRocket", "New Relic", "Datadog", "Prometheus", "Grafana", "PagerDuty",
      "GitHub", "GitLab", "Jira", "Linear", "Confluence", "Notion",
      "AWS CloudWatch", "Azure Monitor", "GCP Monitoring", "Pingdom", "UptimeRobot",
      "ELK Stack", "Splunk", "Rollbar", "BugSnag", "FullStory",
      "Ansible", "Terraform", "Docker", "Kubernetes", "Jenkins", "GitHub Actions",
    ],
    industries: [
      { name: "SaaS Platforms",       desc: "Managed maintenance freeing core engineering teams to focus entirely on product growth." , img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700" },
      { name: "News & Media",          desc: "24/7 uptime guarantees for high-traffic editorial platforms where downtime costs readership." , img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=700" },
      { name: "E-commerce",           desc: "Peak-season monitoring and rapid hotfix deployment to protect revenue during critical events." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
      { name: "Healthcare",           desc: "Continuous compliance monitoring and emergency patching for patient-data systems." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "Financial Services",   desc: "Round-the-clock support ensuring trading platforms and payment systems stay fully operational." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Onboarding Audit", desc: "Full codebase, infrastructure, and dependency review before SLA begins." },
      { step: "02", title: "Monitoring Setup", desc: "Sentry, Datadog, and uptime monitors configured with alert routing." },
      { step: "03", title: "Runbook Creation", desc: "Step-by-step runbooks for every known failure mode documented and tested." },
      { step: "04", title: "Patch Cadence", desc: "Monthly dependency updates, quarterly OS patches, and emergency CVE response." },
      { step: "05", title: "Performance Reviews", desc: "Monthly slow-query analysis, cache hit-rate review, and infrastructure right-sizing." },
      { step: "06", title: "Quarterly Reports", desc: "Uptime SLA report, incident summary, and improvement recommendations delivered." }
    ],
  },
  {
    id: "automation",
    title: "Automation & Apps",
    heroDesc: "Eliminating human error through Intelligent RPA and streamlined business tools.",
    desc: "Workflow automation bots and internal business tools.",
    industryEyebrow: "Automate What Slows You Down",
    industryHeading: "Automation Solutions for Every Industry",
    iconName: "Zap",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
    longDesc: "Human error is expensive and slow. We build Robotic Process Automation tools that handle the repetitive work, freeing your team to focus on strategic, high-value thinking.",
    detailedCapabilities: [
      { subtitle: "Process Discovery & Mapping", desc: "Structured workshops to document every manual step, decision point, and system touchpoint in the target process." },
      { subtitle: "RPA Bot Development", desc: "UiPath or custom Python automation with error handling, retry logic, and full audit logging built in." },
      { subtitle: "Workflow Orchestration", desc: "n8n or Apache Airflow pipelines connecting Salesforce, SAP, Gmail, and Slack into single automated chains." },
      { subtitle: "OCR & Document Extraction", desc: "AWS Textract and custom ML models extracting structured data from PDFs, invoices, and scanned forms at scale." },
      { subtitle: "Shadow Mode & Validation", desc: "Bots run in parallel with humans for one week to catch real-world exceptions before full production cutover." }
    ],
    useCases: [
      { industry: "Real Estate", application: "Automating the lead-capture-to-SMS pipeline for property inquiries." },
      { industry: "Insurance", application: "Automating the intake of PDF claims and extracting structured data via OCR." },
    ],
    techStack: ["Python", "Zapier", "Appian", "Selenium"],
    fullTechStack: [
      "Python", "Selenium", "Playwright", "BeautifulSoup", "Scrapy", "Puppeteer",
      "Zapier", "Make (Integromat)", "n8n", "Appian", "UiPath", "Automation Anywhere",
      "Power Automate", "Airflow", "Prefect", "Celery", "RabbitMQ", "Apache Kafka",
      "Tesseract OCR", "AWS Textract", "Google Document AI", "Azure Form Recognizer",
      "Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "GitHub Actions",
    ],
    industries: [
      { name: "Real Estate",          desc: "Automated lead-capture pipelines from inquiry to CRM entry to personalised SMS follow-up." , img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=700" },
      { name: "Insurance",            desc: "PDF-claim intake automation with OCR extraction and structured database population." , img: "https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=700" },
      { name: "Finance & Accounting", desc: "Automated reconciliation, invoice processing, and regulatory-report generation."  , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
      { name: "HR & Recruitment",     desc: "CV screening bots, interview-scheduling automation, and onboarding workflow orchestration." , img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=700" },
      { name: "Logistics",            desc: "Shipment tracking automation, delivery-exception alerting, and carrier-invoice reconciliation." , img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Process Mapping", desc: "Document every manual step, decision point, and system touchpoint in the target process." },
      { step: "02", title: "Tool Selection", desc: "Choose between RPA (UiPath), workflow (n8n/Zapier), or custom code based on complexity." },
      { step: "03", title: "Bot Development", desc: "Build automation scripts with error handling, retry logic, and audit logging." },
      { step: "04", title: "Integration Testing", desc: "End-to-end tests confirming the bot handles every edge case and failure mode." },
      { step: "05", title: "Shadow Mode", desc: "Run bot in parallel with humans for one week to catch real-world exceptions." },
      { step: "06", title: "Handoff & Training", desc: "Operations team trained to monitor, pause, and restart bots without IT help." }
    ],
  },
  {
    id: "salesforce",
    title: "Salesforce Solutions",
    heroDesc: "Turning your CRM into a revenue-generating engine through custom LWC development.",
    desc: "CRM customization, integration, and data migration strategies.",
    industryEyebrow: "Your CRM, Fully Unleashed",
    industryHeading: "Salesforce Solutions Across Every Vertical",
    iconName: "TrendingUp",
    img: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200",
    longDesc: "Standard Salesforce is just a database. We turn it into a high-octane revenue engine by building custom Lightning Web Components and deep third-party integrations that eliminate manual work.",
    detailedCapabilities: [
      { subtitle: "LWC Component Development", desc: "Custom Lightning Web Components built in scratch orgs, unit-tested with Jest, and promoted through change sets." },
      { subtitle: "Flow & Process Automation", desc: "Salesforce Flow replacing legacy Process Builder and Workflow Rules for maintainable declarative automation." },
      { subtitle: "Third-Party Integration", desc: "MuleSoft or custom REST APIs connecting Salesforce to ERP, marketing automation, and data warehouse systems." },
      { subtitle: "Data Migration & Cleansing", desc: "ETL scripts deduplicating and enriching millions of legacy CRM records with full audit trail and rollback capability." },
      { subtitle: "Einstein Analytics & Reports", desc: "Tableau CRM dashboards and advanced SOQL reports giving sales leadership real-time pipeline visibility." }
    ],
    useCases: [
      { industry: "Pharma", application: "Building a custom Salesforce portal for medical reps to track hospital inventory in real time." },
      { industry: "Tech Services", application: "Integrating Salesforce with Jira to sync closed deals directly into engineering sprint tickets." },
    ],
    techStack: ["Apex", "LWC", "MuleSoft", "Salesforce Cloud"],
    fullTechStack: [
      "Apex", "LWC", "Aura Components", "Visualforce", "SOQL", "SOSL",
      "MuleSoft", "Salesforce Flow", "Process Builder", "Salesforce CPQ",
      "Salesforce Marketing Cloud", "Pardot", "Salesforce Service Cloud",
      "Salesforce Field Service", "Einstein Analytics", "Tableau CRM",
      "Heroku", "REST API", "SOAP API", "Bulk API", "Streaming API",
      "Informatica", "DataLoader", "Postman", "Git", "SFDX", "VS Code",
    ],
    industries: [
      { name: "Pharmaceuticals",      desc: "Custom medical-rep portals tracking hospital inventory, samples, and compliance documentation." , img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700" },
      { name: "Technology Services",  desc: "Closed-deal to engineering-ticket automation bridging sales and delivery teams." , img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=700" },
      { name: "Financial Services",   desc: "Client 360 views consolidating portfolio data, interactions, and compliance flags." , img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=700" },
      { name: "Manufacturing",        desc: "CPQ implementations automating complex product configurations and pricing approval workflows." , img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=700" },
      { name: "Retail & CPG",         desc: "Territory management, trade-promotion tracking, and field-sales mobility solutions." , img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=700" },
    ],
    workflow: [
      { step: "01", title: "Org Audit", desc: "Review existing customisations, tech debt, and data quality before any build." },
      { step: "02", title: "Data Model Design", desc: "Object relationships, field definitions, and validation rules mapped to business process." },
      { step: "03", title: "LWC Development", desc: "Custom Lightning Web Components built, tested in scratch orgs, then promoted." },
      { step: "04", title: "Integration Build", desc: "MuleSoft or custom REST APIs connecting Salesforce to ERP, marketing, and data warehouse." },
      { step: "05", title: "Data Migration", desc: "ETL scripts to migrate, deduplicate, and enrich legacy CRM data at scale." },
      { step: "06", title: "Training & Go-Live", desc: "End-user training, change management support, and hypercare period included." }
    ],
  },
];