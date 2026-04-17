"use client";

import { useParams, notFound } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import Navbar from "@/components/Navbar";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Vision Color Palette ─── */
const V = {
  blue:        "#2563EB",
  blueLight:   "#EFF6FF",
  blueMid:     "#DBEAFE",
  purple:      "#7C3AED",
  purpleMid:   "#EDE9FE",
  red:         "#DC2626",
  dark:        "#0F172A",
  darkMid:     "#1E293B",
  white:       "#FFFFFF",
  gray50:      "#F8FAFC",
  gray100:     "#F1F5F9",
  gray200:     "#E2E8F0",
  gray400:     "#94A3B8",
  gray600:     "#475569",
};

/* ─── Scroll reveal ─── */
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Per-service images (3 contextual Unsplash shots) ─── */
const SERVICE_IMAGES: Record<string, string[]> = {
  "generative-ai":      ["https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=900","https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=900","https://images.unsplash.com/photo-1676299082025-df5a0b853e68?q=80&w=900"],
  "mobile-development": ["https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=900","https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=900","https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=900"],
  "devops":             ["https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=900","https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=900","https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900"],
  "ui-ux-design":       ["https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900","https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=900","https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=900"],
  "web-development":    ["https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=900","https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900","https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=900"],
  "cybersecurity":      ["https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=900","https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=900","https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=900"],
  "data-analytics":     ["https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=900","https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=900","https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900"],
  "cloud-application":  ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=900","https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900","https://images.unsplash.com/photo-1667372393119-3ac6eda9cc53?q=80&w=900"],
  "blockchain":         ["https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=900","https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=900","https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?q=80&w=900"],
  "game-dev":           ["https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900","https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=900","https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900"],
  "saas-development":   ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900","https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900","https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=900"],
  "custom-software":    ["https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=900","https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900","https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900"],
  "ecommerce":          ["https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=900","https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=900","https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=900"],
  "qa-testing":         ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900","https://images.unsplash.com/photo-1587620962725-abab19836100?q=80&w=900","https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=900"],
  "cloud-ops":          ["https://images.unsplash.com/photo-1483736762128-d650fdb0fd22?q=80&w=900","https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=900","https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=900"],
  "design-dev":         ["https://images.unsplash.com/photo-1509395062558-412640432671?q=80&w=900","https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900","https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=900"],
  "maintenance":        ["https://images.unsplash.com/photo-1581092921461-eab62e97a78e?q=80&w=900","https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=900","https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900"],
  "automation":         ["https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900","https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=900","https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=900"],
  "salesforce":         ["https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=900","https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900","https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900"],
  "web3-gaming":        ["https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=900","https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=900","https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900"],
  "ar-vr-gaming":       ["https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=900","https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=900","https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=900"],
  "gaming-art":         ["https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=900","https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=900","https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=900"],
};
function getImgs(id: string, fallback: string): string[] {
  return SERVICE_IMAGES[id] ?? [fallback, fallback, fallback];
}


/* ─── Tech icon map (Devicons CDN) ─── */
const TECH_ICONS: Record<string, string> = {
  Python:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  PyTorch:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  TensorFlow:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  HuggingFace:       "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
  FastAPI:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  Redis:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  PostgreSQL:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  MongoDB:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Docker:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Kubernetes:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  Swift:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  Kotlin:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  Flutter:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "React Native":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Firebase:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Supabase:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  Terraform:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  Ansible:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
  Jenkins:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  Prometheus:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
  Grafana:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
  AWS:               "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  Azure:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  GCP:               "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  Nginx:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  Figma:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Next.js":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  React:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Vue.js":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  TypeScript:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  JavaScript:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Node.js":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  NestJS:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  GraphQL:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  Prisma:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  Vercel:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  Solidity:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
  Rust:              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  Ethereum:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
  Unity:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  "Unreal Engine":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg",
  "C#":              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "C++":             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  Blender:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
  Maya:              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maya/maya-original.svg",
  Go:                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Java:              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  ".NET":            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  Selenium:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  Jest:              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  GitHub:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  Pandas:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  Airflow:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg",
  Shopify:           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Stripe:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Auth0:             "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  Sentry:            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
};

/* ─── Tech → official website ─── */
const TECH_URLS: Record<string, string> = {
  Python:"https://www.python.org", PyTorch:"https://pytorch.org", TensorFlow:"https://www.tensorflow.org",
  HuggingFace:"https://huggingface.co", LangChain:"https://www.langchain.com", LlamaIndex:"https://www.llamaindex.ai",
  "OpenAI API":"https://platform.openai.com", "Anthropic API":"https://www.anthropic.com",
  Ollama:"https://ollama.ai", FAISS:"https://github.com/facebookresearch/faiss",
  Pinecone:"https://www.pinecone.io", Weaviate:"https://weaviate.io", ChromaDB:"https://www.trychroma.com",
  FastAPI:"https://fastapi.tiangolo.com", Celery:"https://docs.celeryq.dev", Redis:"https://redis.io",
  PostgreSQL:"https://www.postgresql.org", MongoDB:"https://www.mongodb.com",
  Docker:"https://www.docker.com", Kubernetes:"https://kubernetes.io",
  "AWS SageMaker":"https://aws.amazon.com/sagemaker/", "Azure OpenAI":"https://azure.microsoft.com/en-us/products/ai-services/openai-service",
  "GCP Vertex AI":"https://cloud.google.com/vertex-ai", MLflow:"https://mlflow.org",
  "Weights & Biases":"https://wandb.ai", Gradio:"https://www.gradio.app", Streamlit:"https://streamlit.io",
  Swift:"https://swift.org", Kotlin:"https://kotlinlang.org", Flutter:"https://flutter.dev",
  "React Native":"https://reactnative.dev", "Jetpack Compose":"https://developer.android.com/jetpack/compose",
  SwiftUI:"https://developer.apple.com/xcode/swiftui/", Expo:"https://expo.dev",
  Firebase:"https://firebase.google.com", Supabase:"https://supabase.com",
  GraphQL:"https://graphql.org", WebSockets:"https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  SQLite:"https://www.sqlite.org", Realm:"https://realm.io", Lottie:"https://airbnb.io/lottie",
  Fastlane:"https://fastlane.tools", Terraform:"https://www.terraform.io", Helm:"https://helm.sh",
  Ansible:"https://www.ansible.com", Jenkins:"https://www.jenkins.io",
  "GitHub Actions":"https://github.com/features/actions", "GitLab CI":"https://docs.gitlab.com/ee/ci/",
  ArgoCD:"https://argoproj.github.io/cd/", Prometheus:"https://prometheus.io", Grafana:"https://grafana.com",
  Datadog:"https://www.datadoghq.com", "New Relic":"https://newrelic.com",
  AWS:"https://aws.amazon.com", Azure:"https://azure.microsoft.com", GCP:"https://cloud.google.com",
  Nginx:"https://nginx.org", Figma:"https://www.figma.com", "Adobe XD":"https://helpx.adobe.com/support/xd.html",
  Sketch:"https://www.sketch.com", Framer:"https://www.framer.com", Principle:"https://principleformac.com",
  "Next.js":"https://nextjs.org", React:"https://react.dev", "Vue.js":"https://vuejs.org",
  TypeScript:"https://www.typescriptlang.org", "Node.js":"https://nodejs.org",
  Express:"https://expressjs.com", NestJS:"https://nestjs.com", tRPC:"https://trpc.io",
  Prisma:"https://www.prisma.io", Stripe:"https://stripe.com", Algolia:"https://www.algolia.com",
  Vercel:"https://vercel.com", "Kali Linux":"https://www.kali.org", Metasploit:"https://www.metasploit.com",
  "Burp Suite":"https://portswigger.net/burp", Wireshark:"https://www.wireshark.org",
  Nmap:"https://nmap.org", Splunk:"https://www.splunk.com", Pandas:"https://pandas.pydata.org",
  Tableau:"https://www.tableau.com", "Power BI":"https://powerbi.microsoft.com",
  BigQuery:"https://cloud.google.com/bigquery", Snowflake:"https://www.snowflake.com",
  Airflow:"https://airflow.apache.org", dbt:"https://www.getdbt.com",
  Solidity:"https://soliditylang.org", Rust:"https://www.rust-lang.org",
  Hardhat:"https://hardhat.org", OpenZeppelin:"https://www.openzeppelin.com",
  Ethereum:"https://ethereum.org", Polygon:"https://polygon.technology", Chainlink:"https://chain.link",
  Unity:"https://unity.com", "Unreal Engine":"https://www.unrealengine.com",
  "C#":"https://learn.microsoft.com/en-us/dotnet/csharp/", "C++":"https://isocpp.org",
  Blender:"https://www.blender.org", Maya:"https://www.autodesk.com/products/maya",
  Go:"https://go.dev", Java:"https://www.java.com", ".NET":"https://dotnet.microsoft.com",
  Shopify:"https://www.shopify.com", Selenium:"https://www.selenium.dev",
  Cypress:"https://www.cypress.io", Jest:"https://jestjs.io", JMeter:"https://jmeter.apache.org",
  GitHub:"https://github.com", Sentry:"https://sentry.io", Auth0:"https://auth0.com",
  Clerk:"https://clerk.com", Moralis:"https://moralis.io",
  "Substance Painter":"https://www.adobe.com/products/substance3d-painter.html",
  ZBrush:"https://pixologic.com", Blender3D:"https://www.blender.org",
  Playwright:"https://playwright.dev", k6:"https://k6.io", Gatling:"https://gatling.io",
  Zapier:"https://zapier.com", Appian:"https://appian.com", UiPath:"https://www.uipath.com",
  "Power Automate":"https://powerautomate.microsoft.com", n8n:"https://n8n.io",
  Apex:"https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/",
  LWC:"https://developer.salesforce.com/docs/component-library",
  MuleSoft:"https://www.mulesoft.com", "Salesforce Cloud":"https://www.salesforce.com",
  Pulumi:"https://www.pulumi.com",
};


const TECH_LOGOS = [
  { name: "React",       url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Next.js",     url: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
  { name: "AWS",         url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Node.js",     url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
  { name: "Python",      url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
  { name: "Docker",      url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { name: "Kubernetes",  url: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" },
  { name: "TypeScript",  url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
  { name: "Figma",       url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Flutter",     url: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png" },
  { name: "MongoDB",     url: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
  { name: "PostgreSQL",  url: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
  { name: "Firebase",    url: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" },
  { name: "GraphQL",     url: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
];

export default function ServiceDetailPage() {
  const params  = useParams();
  const service = servicesData.find((s) => s.id === params.id);
  if (!service) return notFound();

  const imgs      = getImgs(service.id, service.img);
  /* fullTechStack from data file, fall back to techStack */
  const fullStack = (service as any).fullTechStack ?? service.techStack;
  /* industries from data file, fall back to useCases converted */
  const industries = (service as any).industries as { name: string; desc: string }[] | undefined
    ?? service.useCases.map(u => ({ name: u.industry, desc: u.application }));

  /* ── Pill component reused in both marquee tracks ── */
  const Pill = ({ tech, keyPrefix }: { tech: string; keyPrefix: string }) => {
    const url  = TECH_URLS[tech] ?? "#";
    const icon = TECH_ICONS[tech] ?? null;
    return (
      <a
        key={keyPrefix}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "9px 16px", borderRadius: 12,
          background: V.white, border: `1px solid ${V.gray200}`,
          flexShrink: 0, textDecoration: "none", minWidth: 124,
          transition: "border-color 0.2s, background 0.2s, transform 0.2s",
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = V.blue; el.style.background = V.blueLight; el.style.transform = "translateY(-3px)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = V.gray200; el.style.background = V.white; el.style.transform = "translateY(0)"; }}
      >
        {icon
          ? <img src={icon} alt={tech} width={20} height={20} style={{ objectFit: "contain", flexShrink: 0 }} />
          : <div style={{ width: 20, height: 20, borderRadius: 5, background: `linear-gradient(135deg,${V.blue},${V.purple})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 7, fontWeight: 900, flexShrink: 0 }}>{tech.slice(0,2).toUpperCase()}</div>
        }
        <span style={{ fontSize: 11, fontWeight: 700, color: V.gray600, whiteSpace: "nowrap" }}>{tech}</span>
      </a>
    );
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes techTrack { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes logoScroll { from{transform:translateX(0)} to{transform:translateX(-100%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .hin  { animation: fadeUp 0.85s ease forwards; }
        .hd1  { animation-delay:0.1s;  opacity:0; }
        .hd2  { animation-delay:0.25s; opacity:0; }
        .hd3  { animation-delay:0.4s;  opacity:0; }
        .hd4  { animation-delay:0.55s; opacity:0; }
      `}</style>

      <Navbar />

      {/* ══ 1. HERO ══ */}
      {/*
        Full viewport height. Background image fills 100% — no dark overlay on top portion
        so the image is fully visible. A single horizontal frosted-glass bar is pinned to
        the very bottom (flex-end). It spans the full width and is intentionally SHORT so
        80-90% of the image stays visible above it.
      */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
      >
        {/* BG image — fills full viewport, no overlay blocking it */}
        <img
          src={service.img}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.58) saturate(1.05)" }}
        />

        {/* Subtle gradient only at very bottom so text stays legible */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ height: 280, background: "linear-gradient(to top, rgba(4,7,20,0.6) 0%, transparent 100%)" }}
        />

        {/*
          THE HORIZONTAL BAR — full width, blurred, pinned bottom.
          ~180-220px tall depending on content. The vast majority of the image
          remains visible above it.
        */}
        <div
          className="relative z-10 w-full"
          style={{
            background: "rgba(4, 7, 20, 0.52)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            borderTop: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div className="container mx-auto px-6 md:px-16 py-6 md:py-8">

            {/* ── Row 1: eyebrow (left) + tech pills (right) ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#4db8d4" }} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: "#4db8d4" }}>
                  {service.title}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {service.techStack.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.55)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Row 2: heading (6 cols) | desc (3 cols) | CTAs (3 cols) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-end">

              <h1
                className="font-extrabold text-white leading-[1.04] tracking-tight lg:col-span-6"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
              >
                {service.heroDesc}
              </h1>

              <p
                className="text-sm font-light leading-relaxed lg:col-span-3"
                style={{ color: "rgba(255,255,255,0.63)" }}
              >
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-2 lg:col-span-3 lg:justify-end items-center">
                <Link
                  href={`/contact?service=${service.id}`}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-white text-xs whitespace-nowrap transition-all duration-300 hover:brightness-110 hover:gap-3"
                  style={{ background: "linear-gradient(135deg,#2563EB,#7C3AED)" }}
                >
                  Start a Project <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#overview"
                  className="inline-flex items-center px-6 py-2.5 rounded-full font-bold text-xs whitespace-nowrap border transition-all duration-300 hover:bg-white hover:text-gray-900"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.75)" }}
                >
                  See Overview
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* ══ 2. OVERVIEW ══ */}
      <section id="overview" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.35em] mb-4 block" style={{ color: V.blue }}>Overview</span>
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed mb-10">{service.longDesc}</p>
              <p className="text-xs font-extrabold text-gray-900 mb-5 uppercase tracking-wider">What we are great at</p>
              <ul className="space-y-5">
                {service.detailedCapabilities?.map((cap, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 size={17} className="mt-0.5 flex-shrink-0" style={{ color: V.blue }} />
                    <p className="text-gray-600 leading-relaxed text-sm">
                      <strong className="text-gray-900 font-bold">{cap.subtitle}: </strong>{cap.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
                  <img src={imgs[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl -z-10" style={{ background: `linear-gradient(135deg, ${V.blue}, ${V.purple})` }} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 3. CAPABILITY CARDS ══ */}
      {(() => {
        /*
          Per-service image sets — 5 unique contextual images per service.
          Falls back to service.img if service not in map.
        */
        const CAP_IMAGES: Record<string, string[]> = {"generative-ai": ["https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600", "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600", "https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=600", "https://images.unsplash.com/photo-1676299082025-df5a0b853e68?q=80&w=600", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600"], "mobile-development": ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600", "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=600", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600", "https://images.unsplash.com/photo-1563986768494-4641fdbdf5f7?q=80&w=600", "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=600"], "devops": ["https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600", "https://images.unsplash.com/photo-1667372393119-c81c0cda0c18?q=80&w=600", "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=600", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600"], "ui-ux-design": ["https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600", "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=600", "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600", "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=600", "https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=600"], "web-development": ["https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=600", "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600"], "custom-software": ["https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=600", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600", "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600"], "cybersecurity": ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600", "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600", "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=600", "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=600", "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600"], "data-analytics": ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600", "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=600", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600", "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=600"], "cloud-application": ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600", "https://images.unsplash.com/photo-1667372393119-3ac6eda9cc53?q=80&w=600", "https://images.unsplash.com/photo-1560732488-6b0df240254a?q=80&w=600"], "blockchain": ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600", "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600", "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600", "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600", "https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?q=80&w=600"], "game-dev": ["https://images.unsplash.com/photo-1556438064-2d7646166914?q=80&w=600", "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600", "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600", "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600", "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600"], "web3-gaming": ["https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600", "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600", "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600", "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600", "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600"], "ar-vr-gaming": ["https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=600", "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=600", "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=600", "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=600", "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=600"], "gaming-art": ["https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600", "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=600", "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600", "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600", "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=600"], "qa-testing": ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600", "https://images.unsplash.com/photo-1587620962725-abab19836100?q=80&w=600", "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=600", "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600", "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600"], "saas-development": ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600"], "cloud-ops": ["https://images.unsplash.com/photo-1483736762128-d650fdb0fd22?q=80&w=600", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600", "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600", "https://images.unsplash.com/photo-1560732488-6b0df240254a?q=80&w=600"], "ecommerce": ["https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=600", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600", "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600", "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600", "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600"], "design-dev": ["https://images.unsplash.com/photo-1509395062558-412640432671?q=80&w=600", "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600", "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600", "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=600", "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600"], "maintenance": ["https://images.unsplash.com/photo-1581092921461-eab62e97a78e?q=80&w=600", "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600"], "automation": ["https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600", "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600"], "salesforce": ["https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=600", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600", "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600"]};

        const capImgs: string[] = CAP_IMAGES[service.id]
          ?? Array(5).fill(service.img);

        return (
          <section className="py-20 md:py-28" style={{ background: V.gray50 }}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal>
                <div className="mb-14">
                  <span className="text-xs font-bold uppercase tracking-[0.35em] mb-3 block" style={{ color: V.blue }}>Core Solutions</span>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Key <span style={{ color: V.blue }}>Capabilities</span>
                  </h2>
                </div>
              </Reveal>

              {/* ── Row 1: first 3 cards ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.detailedCapabilities?.slice(0, 3).map((cap, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-400 hover:-translate-y-1" style={{ borderColor: V.gray200 }}>

                      {/* Image — grayscale → colour on hover, fixed height for alignment */}
                      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 200 }}>
                        <img
                          src={capImgs[i] ?? service.img}
                          alt={cap.subtitle}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          style={{ filter: "grayscale(30%)", transition: "filter 0.6s ease, transform 0.7s ease" }}
                          onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"}
                          onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(30%)"}
                        />
                        {/* Blue gradient overlay at bottom of image */}
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(37,99,235,0.45) 0%, transparent 55%)" }} />
                        {/* Numbered badge */}
                        <div
                          className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black"
                          style={{ background: V.blue, boxShadow: `0 2px 12px ${V.blue}60` }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex flex-col flex-1 p-6">
                        {/* Title — Vision Blue, bold, matches screenshot */}
                        <h3
                          className="font-extrabold mb-3 leading-snug"
                          style={{ fontSize: "1rem", color: V.blue }}
                        >
                          {cap.subtitle}
                        </h3>

                        {/* Description — flex-1 so all cards have same button position */}
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                          {cap.desc}
                        </p>

                        {/* CTA pill button — full rounded, blue→purple gradient */}
                        <Link
                          href={`/contact?service=${service.id}`}
                          className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm self-start transition-all duration-300 hover:brightness-110 hover:gap-3"
                          style={{ background: `linear-gradient(135deg, ${V.blue} 0%, ${V.purple} 100%)` }}
                        >
                          Get in Touch <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* ── Row 2: cards 4 & 5, centred under row 1 ── */}
              {(service.detailedCapabilities?.length ?? 0) > 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:mx-[16.666%]">
                  {service.detailedCapabilities?.slice(3, 5).map((cap, i) => (
                    <Reveal key={i + 3} delay={(i + 3) * 70}>
                      <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-400 hover:-translate-y-1" style={{ borderColor: V.gray200 }}>

                        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 200 }}>
                          <img
                            src={capImgs[i + 3] ?? service.img}
                            alt={cap.subtitle}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            style={{ filter: "grayscale(30%)", transition: "filter 0.6s ease, transform 0.7s ease" }}
                            onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"}
                            onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(30%)"}
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(37,99,235,0.45) 0%, transparent 55%)" }} />
                          <div
                            className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black"
                            style={{ background: V.blue, boxShadow: `0 2px 12px ${V.blue}60` }}
                          >
                            {String(i + 4).padStart(2, "0")}
                          </div>
                        </div>

                        <div className="flex flex-col flex-1 p-6">
                          <h3
                            className="font-extrabold mb-3 leading-snug"
                            style={{ fontSize: "1rem", color: V.blue }}
                          >
                            {cap.subtitle}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-6">
                            {cap.desc}
                          </p>
                          <Link
                            href={`/contact?service=${service.id}`}
                            className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm self-start transition-all duration-300 hover:brightness-110 hover:gap-3"
                            style={{ background: `linear-gradient(135deg, ${V.blue} 0%, ${V.purple} 100%)` }}
                          >
                            Get in Touch <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}

            </div>
          </section>
        );
      })()}

      {/* ══ 4. WORKFLOW — 22 unique layouts, one per service ══ */}
      {(() => {
        const wf = (service as any).workflow as { step: string; title: string; desc: string }[] | undefined;
        if (!wf || wf.length === 0) return null;
        const sid = service.id;

        /* Shared dark bg */
        const DB = "linear-gradient(160deg,#07101e 0%,#0a1628 100%)";
        const LB = V.gray50;
        const tc = "#4db8d4";

        /* Mobile fallback — used by all layouts */
        const Mob = () => (
          <div className="md:hidden space-y-3 mt-10">
            {wf.map((s:any,i:number)=>(
              <div key={i} className="flex gap-4 p-4 rounded-xl" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(77,184,212,0.18)"}}>
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:tc}}>{s.step}</div>
                <div><p className="font-bold text-white text-sm mb-1">{s.title}</p><p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p></div>
              </div>
            ))}
          </div>
        );

        /* ─────────────────────────────────────
           GENERATIVE-AI
           Radial hub — centre circle, steps orbit around it
        ───────────────────────────────────── */
        if (sid === "generative-ai") return (
          <section className="py-20 md:py-32 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">AI Pipeline</h2></Reveal>
              <div className="hidden md:block relative mx-auto" style={{width:560,height:560}}>
                {/* Centre hub */}
                <div className="absolute rounded-full flex items-center justify-center" style={{width:120,height:120,top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:`radial-gradient(circle at 35% 35%,rgba(77,184,212,0.6),rgba(7,16,30,0.95))`,border:`2px solid ${tc}`,boxShadow:`0 0 40px rgba(77,184,212,0.3)`}}>
                  <span className="text-white text-xs font-black text-center leading-tight px-2">AI Core</span>
                </div>
                {wf.slice(0,6).map((s:any,i:number)=>{
                  const angle = (i/6)*2*Math.PI - Math.PI/2;
                  const r = 210;
                  const x = 280 + r*Math.cos(angle) - 70;
                  const y = 280 + r*Math.sin(angle) - 40;
                  const cx = 280 + r*Math.cos(angle);
                  const cy = 280 + r*Math.sin(angle);
                  return (
                    <div key={i}>
                      {/* Connector line to centre */}
                      <svg className="absolute inset-0 pointer-events-none" style={{width:560,height:560}}>
                        <line x1={280} y1={280} x2={cx} y2={cy} stroke={tc} strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.35"/>
                      </svg>
                      <div className="absolute p-3 rounded-xl text-center" style={{left:x,top:y,width:140,background:"rgba(255,255,255,0.05)",border:`1px solid rgba(77,184,212,0.2)`}}>
                        <div className="w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-[8px] font-black" style={{background:tc}}>{s.step}</div>
                        <p className="font-bold text-white text-[11px] mb-1 leading-snug">{s.title}</p>
                        <p className="text-[9px] leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           MOBILE-DEVELOPMENT
           Phone frame visual with steps as screen cards stacked inside
        ───────────────────────────────────── */
        if (sid === "mobile-development") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">Mobile Build Process</h2></Reveal>
              <div className="hidden md:flex items-start gap-12 justify-center">
                {/* Phone outline */}
                <div className="flex-shrink-0 relative" style={{width:200}}>
                  <div className="rounded-3xl border-4 overflow-hidden" style={{borderColor:tc,background:"#0a1628",padding:"40px 12px 20px",boxShadow:`0 0 40px rgba(77,184,212,0.2)`}}>
                    <div className="w-16 h-1 rounded-full mx-auto mb-6" style={{background:`rgba(77,184,212,0.5)`}}/>
                    <div className="space-y-2">
                      {wf.slice(0,4).map((s:any,i:number)=>(
                        <div key={i} className="rounded-xl p-3" style={{background:"rgba(77,184,212,0.08)",border:`1px solid rgba(77,184,212,0.2)`}}>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black" style={{fontSize:"0.5rem",background:tc}}>{s.step}</div>
                            <p className="font-bold text-white" style={{fontSize:"0.65rem"}}>{s.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full border mx-auto mt-6" style={{borderColor:`rgba(77,184,212,0.4)`}}/>
                  </div>
                </div>
                {/* Step details */}
                <div className="space-y-5 max-w-md">
                  {wf.map((s:any,i:number)=>(
                    <Reveal key={i} delay={i*50}>
                      <div className="flex gap-4 items-start p-5 rounded-xl transition-all duration-300" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,212,0.14)"}}>
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:tc}}>{s.step}</div>
                        <div><p className="font-bold text-white text-sm mb-1">{s.title}</p><p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p></div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           DEVOPS
           Infinite loop / CI CD pipeline ring
        ───────────────────────────────────── */
        if (sid === "devops") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">CI/CD Pipeline</h2></Reveal>
              <div className="hidden md:flex items-center gap-0 justify-center flex-wrap">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex items-center">
                    <Reveal delay={i*60}>
                      <div className="flex flex-col items-center group">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xs mb-3 transition-all duration-300 group-hover:scale-110" style={{background:`radial-gradient(circle at 35% 35%,rgba(77,184,212,0.7),rgba(7,16,30,0.95))`,border:`2px solid ${tc}`,boxShadow:`0 4px 20px rgba(77,184,212,0.25)`}}>{s.step}</div>
                        <p className="font-bold text-white text-xs text-center mb-1 max-w-[90px] leading-snug">{s.title}</p>
                        <p className="text-center max-w-[90px] leading-relaxed" style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.42)"}}>{s.desc.slice(0,50)}…</p>
                      </div>
                    </Reveal>
                    {i < wf.length-1 && (
                      <div className="flex-shrink-0 mx-1 mb-10">
                        <svg width="32" height="16" viewBox="0 0 32 16" fill="none"><path d="M0 8h24" stroke={tc} strokeWidth="1.5" strokeDasharray="3 2"/><path d="M20 3l8 5-8 5" stroke={tc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           UI-UX-DESIGN
           Double diamond with 6 steps in 2 diamond shapes
        ───────────────────────────────────── */
        if (sid === "ui-ux-design") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:LB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">Double Diamond Design Process</h2></Reveal>
              <div className="hidden md:grid grid-cols-2 gap-8">
                {[wf.slice(0,3),wf.slice(3,6)].map((half:any,di:number)=>(
                  <div key={di} className="relative">
                    <div className="text-center mb-4">
                      <span className="text-xs font-black uppercase tracking-widest" style={{color:V.blue}}>{di===0?"Discover & Define":"Develop & Deliver"}</span>
                    </div>
                    {/* Diamond shape */}
                    <div className="relative flex flex-col items-center gap-0">
                      {half.map((s:any,i:number)=>{
                        const w = i===1?"100%":i===0?"60%":"60%";
                        const mt = i===0?0:i===1?-8:-8;
                        return (
                          <Reveal key={i} delay={i*70}>
                            <div className="flex items-center gap-3 p-4 rounded-xl w-full" style={{background:V.white,border:`1px solid ${V.gray200}`,marginTop:mt,maxWidth:i===1?"100%":"75%",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                              <div><p className="font-bold text-gray-900 text-xs mb-0.5">{s.title}</p><p className="text-gray-400" style={{fontSize:"0.72rem"}}>{s.desc.slice(0,60)}…</p></div>
                            </div>
                          </Reveal>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:hidden space-y-3">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border" style={{borderColor:V.gray200}}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                    <div><p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           WEB-DEVELOPMENT
           Horizontal staircase / ascending blocks
        ───────────────────────────────────── */
        if (sid === "web-development") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:LB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 tracking-tight">Web Development Staircase</h2></Reveal>
              <div className="hidden md:flex items-end gap-4 justify-center" style={{minHeight:380}}>
                {wf.map((s:any,i:number)=>{
                  const h=100+(i*46);
                  return (
                    <Reveal key={i} delay={i*65}>
                      <div className="group flex flex-col justify-end" style={{width:140,height:h+80}}>
                        <div className="p-4 rounded-t-xl flex-shrink-0" style={{height:h,background:`linear-gradient(180deg,${V.blue}cc,${V.purple}99)`,border:`1px solid ${V.blue}44`,boxShadow:`0 8px 24px ${V.blue}22`}}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-black mb-2" style={{background:"rgba(255,255,255,0.2)"}}>{s.step}</div>
                          <p className="font-bold text-white text-xs leading-snug">{s.title}</p>
                        </div>
                        <div className="p-3 rounded-b-xl" style={{background:V.white,border:`1px solid ${V.gray200}`,borderTop:"none"}}>
                          <p className="text-gray-400 leading-relaxed" style={{fontSize:"0.68rem"}}>{s.desc.slice(0,50)}…</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <div className="md:hidden space-y-3">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border" style={{borderColor:V.gray200}}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                    <div><p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           CUSTOM-SOFTWARE
           Zigzag / alternating left-right timeline with icons
        ───────────────────────────────────── */
        if (sid === "custom-software") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:LB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">Custom Software Delivery</h2></Reveal>
              <div className="hidden md:block relative max-w-3xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{background:`linear-gradient(to bottom,${V.blue},${V.purple})`}}/>
                {wf.map((s:any,i:number)=>{
                  const isL=i%2===0;
                  return (
                    <Reveal key={i} delay={i*55}>
                      <div className={`flex items-center mb-10 gap-0 ${isL?"flex-row":"flex-row-reverse"}`}>
                        <div className="flex-1 px-8">
                          <div className={`p-5 rounded-2xl bg-white border hover:shadow-lg transition-all ${isL?"text-right":""}`} style={{borderColor:V.gray200}}>
                            <span className="text-[10px] font-black tracking-widest block mb-2" style={{color:V.blue}}>{s.step}</span>
                            <p className="font-bold text-gray-900 text-sm mb-2">{s.title}</p>
                            <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 z-10 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>
                          <span className="text-white text-[9px] font-black">{s.step}</span>
                        </div>
                        <div className="flex-1"/>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <div className="md:hidden space-y-3">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border" style={{borderColor:V.gray200}}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                    <div><p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           CYBERSECURITY
           Red/dark alert-style numbered cards with left accent bar
        ───────────────────────────────────── */
        if (sid === "cybersecurity") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:"linear-gradient(160deg,#120a0a 0%,#1a0d0d 100%)"}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16 tracking-tight">Security Engagement Protocol</h2></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*55}>
                    <div className="group flex gap-0 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(220,38,38,0.18)"}}>
                      <div className="flex-shrink-0 w-1.5" style={{background:`linear-gradient(to bottom,${V.red},#7f1d1d)`}}/>
                      <div className="p-6 flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:"rgba(220,38,38,0.7)",border:"1px solid rgba(220,38,38,0.4)"}}>{s.step}</div>
                        <div><p className="font-bold text-white text-sm mb-1">{s.title}</p><p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p></div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           DATA-ANALYTICS
           Funnel / narrowing shape — data flows down to insights
        ───────────────────────────────────── */
        if (sid === "data-analytics") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">Data to Insights Funnel</h2></Reveal>
              <div className="hidden md:flex flex-col items-center gap-0">
                {wf.map((s:any,i:number)=>{
                  const w=100-(i*10);
                  return (
                    <Reveal key={i} delay={i*55}>
                      <div className="flex items-center gap-4 mb-2" style={{width:`${w}%`,minWidth:380}}>
                        <div className="flex-1 p-4 rounded-xl flex items-center gap-4" style={{background:`rgba(77,184,212,${0.06+i*0.02})`,border:`1px solid rgba(77,184,212,${0.15+i*0.04})`}}>
                          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:tc}}>{s.step}</div>
                          <div><p className="font-bold text-white text-sm mb-0.5">{s.title}</p><p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p></div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           CLOUD-APPLICATION
           Layered cloud stack — bottom infra to top app
        ───────────────────────────────────── */
        if (sid === "cloud-application") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">Cloud Architecture Layers</h2></Reveal>
              <div className="hidden md:flex flex-col-reverse gap-3 max-w-2xl mx-auto">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*55}>
                    <div className="group p-5 rounded-2xl flex items-center gap-5 transition-all duration-300" style={{background:`rgba(77,184,212,${0.04+i*0.025})`,border:`1px solid rgba(77,184,212,${0.12+i*0.04})`,boxShadow:i===wf.length-1?`0 0 24px rgba(77,184,212,0.15)`:"none"}}>
                      <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-black" style={{background:`rgba(77,184,212,${0.3+i*0.1})`}}>{s.step}</div>
                      <div><p className="font-bold text-white text-sm mb-1">{s.title}</p><p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p></div>
                      <div className="ml-auto text-xs font-black tracking-widest opacity-20 text-white">LAYER {s.step}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           BLOCKCHAIN
           Chain-link visual — hexagons connected
        ───────────────────────────────────── */
        if (sid === "blockchain") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">Blockchain Build Chain</h2></Reveal>
              <div className="hidden md:flex items-start gap-0 justify-center flex-wrap">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex items-start">
                    <Reveal delay={i*60}>
                      <div className="flex flex-col items-center" style={{width:148}}>
                        {/* Hexagon */}
                        <div className="relative flex items-center justify-center mb-3" style={{width:80,height:72}}>
                          <svg viewBox="0 0 80 72" className="absolute inset-0 w-full h-full">
                            <polygon points="40,2 75,20 75,52 40,70 5,52 5,20" fill="rgba(77,184,212,0.12)" stroke={tc} strokeWidth="1.5"/>
                          </svg>
                          <span className="relative z-10 text-white font-black text-sm">{s.step}</span>
                        </div>
                        <p className="font-bold text-white text-xs text-center mb-1 leading-snug px-1">{s.title}</p>
                        <p className="text-center px-2 leading-relaxed" style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.42)"}}>{s.desc.slice(0,55)}…</p>
                      </div>
                    </Reveal>
                    {i<wf.length-1&&<div className="flex-shrink-0 mt-8 mx-0"><svg width="20" height="4" viewBox="0 0 20 4"><path d="M0 2h20" stroke={tc} strokeWidth="1.5" strokeDasharray="3 2"/></svg></div>}
                  </div>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           GAME-DEV
           Dark vertical scrolling level progression
        ───────────────────────────────────── */
        if (sid === "game-dev") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:"linear-gradient(160deg,#070b14 0%,#0d1525 100%)"}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16 tracking-tight">Game Production Pipeline</h2></Reveal>
              <div className="hidden md:grid grid-cols-3 gap-4">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*55}>
                    <div className="group relative p-7 rounded-2xl overflow-hidden cursor-default transition-all duration-300" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(99,130,255,0.2)"}}>
                      <div className="absolute -top-2 -right-2 font-black leading-none select-none pointer-events-none" style={{fontSize:"5rem",color:"rgba(99,130,255,0.05)"}}>{s.step}</div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black mb-4" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}}>{s.step}</div>
                      <p className="font-bold text-white text-sm mb-2 leading-snug">{s.title}</p>
                      <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           WEB3-GAMING
           Token/coin flow — horizontal with glowing token icons
        ───────────────────────────────────── */
        if (sid === "web3-gaming") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:"linear-gradient(160deg,#07080e 0%,#0c0f1c 100%)"}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">Web3 Game Build Flow</h2></Reveal>
              <div className="hidden md:flex flex-col gap-3">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*50}>
                    <div className="flex items-center gap-6 group p-5 rounded-2xl transition-all duration-300" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(139,92,246,0.2)"}}>
                      <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black" style={{background:"linear-gradient(135deg,#7c3aed,#4f46e5)",boxShadow:"0 0 20px rgba(124,58,237,0.35)"}}>{s.step}</div>
                      <div className="flex-1"><p className="font-bold text-white text-sm mb-1">{s.title}</p><p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p></div>
                      <div className="text-right hidden md:block"><div className="w-16 h-1 rounded-full" style={{background:`linear-gradient(to right,rgba(124,58,237,0.6),rgba(124,58,237,0))`}}/></div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           AR-VR-GAMING
           Concentric rings expanding outward
        ───────────────────────────────────── */
        if (sid === "ar-vr-gaming") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:"linear-gradient(160deg,#060c18 0%,#0a1020 100%)"}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-16 tracking-tight">XR Development Process</h2></Reveal>
              <div className="hidden md:flex items-center gap-6 justify-center flex-wrap">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*55}>
                    <div className="group flex flex-col items-center" style={{width:160}}>
                      <div className="relative flex items-center justify-center mb-4" style={{width:80,height:80}}>
                        {[36,54,72].map((r,ri)=>(
                          <div key={ri} className="absolute rounded-full" style={{width:r*2,height:r*2,border:`1px solid rgba(77,184,212,${0.5-ri*0.12})`,transform:"translate(-50%,-50%)",top:"50%",left:"50%"}}/>
                        ))}
                        <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black" style={{background:tc}}>{s.step}</div>
                      </div>
                      <p className="font-bold text-white text-xs text-center mb-1 leading-snug">{s.title}</p>
                      <p className="text-center leading-relaxed" style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.42)"}}>{s.desc.slice(0,55)}…</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           GAMING-ART
           Colour palette swatches — each step is an art stage
        ───────────────────────────────────── */
        if (sid === "gaming-art") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:"linear-gradient(160deg,#0c0810 0%,#140d1c 100%)"}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16 tracking-tight">Art Production Pipeline</h2></Reveal>
              <div className="hidden md:grid grid-cols-2 gap-x-12 gap-y-5">
                {wf.map((s:any,i:number)=>{
                  const COLORS=["#e11d48","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899"];
                  const c=COLORS[i%COLORS.length];
                  return (
                    <Reveal key={i} delay={i*55}>
                      <div className="flex gap-4 items-start group p-4 rounded-xl transition-all duration-300" style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${c}25`}}>
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-xl mb-1" style={{background:c,opacity:0.85}}/>
                          <div className="text-center text-[8px] font-black tracking-widest" style={{color:c}}>{s.step}</div>
                        </div>
                        <div><p className="font-bold text-white text-sm mb-1">{s.title}</p><p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p></div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           QA-TESTING
           Checklist / pass-fail cards with green ticks
        ───────────────────────────────────── */
        if (sid === "qa-testing") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:LB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 tracking-tight">QA Test Strategy</h2></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*55}>
                    <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border hover:shadow-lg transition-all" style={{borderColor:V.gray200}}>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{background:"#dcfce7",border:"2px solid #16a34a"}}>
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3 3 7-7" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-widest block mb-1" style={{color:V.blue}}>{s.step}</span>
                        <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
                        <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           SAAS-DEVELOPMENT
           Subscription tiers / pyramid
        ───────────────────────────────────── */
        if (sid === "saas-development") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:LB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">SaaS Build Architecture</h2></Reveal>
              <div className="hidden md:flex flex-col items-center gap-2">
                {wf.map((s:any,i:number)=>{
                  const w=100-(i*12);
                  return (
                    <Reveal key={i} delay={i*55}>
                      <div className="flex items-center gap-4 px-6 py-4 rounded-xl" style={{width:`${w}%`,minWidth:380,background:V.white,border:`1px solid ${V.gray200}`,boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
                        <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                        <div className="flex-1"><p className="font-bold text-gray-900 text-sm mb-0.5">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                        <div className="w-16 h-1.5 rounded-full" style={{background:`linear-gradient(to right,${V.blue},${V.purple})`}}/>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <div className="md:hidden space-y-3">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border" style={{borderColor:V.gray200}}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                    <div><p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           CLOUD-OPS
           Migration wave / horizontal bars with progress
        ───────────────────────────────────── */
        if (sid === "cloud-ops") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16 tracking-tight">Migration Wave Plan</h2></Reveal>
              <div className="hidden md:flex flex-col gap-3 max-w-2xl">
                {wf.map((s:any,i:number)=>{
                  const pct=[20,35,50,65,80,100][i]??60;
                  return (
                    <Reveal key={i} delay={i*55}>
                      <div className="p-5 rounded-xl" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,212,0.14)"}}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black text-[9px]" style={{background:tc}}>{s.step}</div>
                          <p className="font-bold text-white text-sm">{s.title}</p>
                          <span className="ml-auto text-xs font-black" style={{color:tc}}>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full mb-3" style={{background:"rgba(255,255,255,0.08)"}}>
                          <div className="h-full rounded-full" style={{width:`${pct}%`,background:`linear-gradient(to right,${tc},rgba(77,184,212,0.5))`}}/>
                        </div>
                        <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>{s.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           ECOMMERCE
           Shopping cart / conversion funnel
        ───────────────────────────────────── */
        if (sid === "ecommerce") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:LB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-16 tracking-tight">E-commerce Conversion Pipeline</h2></Reveal>
              <div className="hidden md:flex flex-col items-center gap-0">
                {wf.map((s:any,i:number)=>{
                  const w=[95,85,75,65,55,48][i]??60;
                  const opacity=1-i*0.1;
                  return (
                    <Reveal key={i} delay={i*55}>
                      <div className="flex items-center gap-4 px-6 py-5 rounded-none first:rounded-t-2xl last:rounded-b-2xl" style={{width:`${w}%`,minWidth:340,background:V.white,borderLeft:`1px solid ${V.gray200}`,borderRight:`1px solid ${V.gray200}`,borderTop:i===0?`1px solid ${V.gray200}`:"none",borderBottom:`1px solid ${V.gray200}`,opacity}}>
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                        <div><p className="font-bold text-gray-900 text-sm mb-0.5">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <div className="md:hidden space-y-3">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border" style={{borderColor:V.gray200}}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                    <div><p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           DESIGN-DEV
           Kanban-style column layout
        ───────────────────────────────────── */
        if (sid === "design-dev") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:LB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 tracking-tight">Product Design Kanban</h2></Reveal>
              <div className="hidden md:grid grid-cols-3 gap-4">
                {["Discovery","Build","Launch"].map((col,ci)=>(
                  <div key={ci}>
                    <div className="flex items-center gap-2 mb-4 px-3">
                      <div className="w-2 h-2 rounded-full" style={{background:[V.blue,V.purple,V.red][ci]}}/>
                      <span className="text-xs font-black uppercase tracking-widest" style={{color:[V.blue,V.purple,V.red][ci]}}>{col}</span>
                    </div>
                    <div className="space-y-3">
                      {wf.slice(ci*2,ci*2+2).map((s:any,i:number)=>(
                        <Reveal key={i} delay={(ci*2+i)*55}>
                          <div className="p-4 rounded-xl bg-white border hover:shadow-md transition-all" style={{borderColor:V.gray200,borderTop:`3px solid ${[V.blue,V.purple,V.red][ci]}`}}>
                            <span className="text-[9px] font-black tracking-widest block mb-2" style={{color:[V.blue,V.purple,V.red][ci]}}>{s.step}</span>
                            <p className="font-bold text-gray-900 text-xs mb-1">{s.title}</p>
                            <p className="text-gray-400 leading-relaxed" style={{fontSize:"0.7rem"}}>{s.desc}</p>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:hidden space-y-3">
                {wf.map((s:any,i:number)=>(
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border" style={{borderColor:V.gray200}}>
                    <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-[10px] font-black" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`}}>{s.step}</div>
                    <div><p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p><p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           MAINTENANCE
           Heartbeat / pulse monitor style
        ───────────────────────────────────── */
        if (sid === "maintenance") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">24/7 Support Framework</h2>
                {/* Heartbeat line SVG */}
                <div className="mb-12">
                  <svg viewBox="0 0 800 60" className="w-full" style={{maxHeight:60}}>
                    <path d="M0 30 L120 30 L150 10 L180 50 L210 10 L240 50 L270 30 L370 30 L400 5 L430 55 L460 30 L560 30 L590 15 L620 45 L650 30 L800 30" fill="none" stroke={tc} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*55}>
                    <div className="p-5 rounded-2xl" style={{background:"rgba(255,255,255,0.04)",border:`1px solid rgba(77,184,212,${0.12+i*0.03})`}}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{background:tc}}/>
                        <span className="text-[9px] font-black tracking-widest text-white opacity-40">{s.step}</span>
                      </div>
                      <p className="font-bold text-white text-sm mb-2">{s.title}</p>
                      <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           AUTOMATION
           Cog/gear system — interlocking steps
        ───────────────────────────────────── */
        if (sid === "automation") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16 tracking-tight">Automation Delivery Engine</h2></Reveal>
              <div className="hidden md:flex flex-col gap-0">
                {wf.map((s:any,i:number)=>{
                  const isEven=i%2===0;
                  return (
                    <Reveal key={i} delay={i*55}>
                      <div className={`flex items-stretch gap-0 ${isEven?"":"flex-row-reverse"}`}>
                        {/* Gear icon column */}
                        <div className="flex-shrink-0 flex flex-col items-center" style={{width:64}}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm" style={{background:`linear-gradient(135deg,${V.blue},${V.purple})`,boxShadow:`0 4px 16px ${V.blue}30`}}>{s.step}</div>
                          {i<wf.length-1&&<div className="flex-1 w-px mt-1" style={{background:`linear-gradient(to bottom,${V.blue}40,${V.purple}40)`,minHeight:24}}/>}
                        </div>
                        {/* Content */}
                        <div className={`flex-1 pb-8 ${isEven?"pl-6":"pr-6"}`}>
                          <div className="p-5 rounded-2xl" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,212,0.15)"}}>
                            <p className="font-bold text-white text-sm mb-1">{s.title}</p>
                            <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.48)"}}>{s.desc}</p>
                          </div>
                        </div>
                        <div className="flex-1 hidden md:block"/>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           SALESFORCE
           CRM pipeline — deal stages
        ───────────────────────────────────── */
        if (sid === "salesforce") return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-16 tracking-tight">Salesforce Delivery Pipeline</h2></Reveal>
              <div className="hidden md:flex gap-0 items-stretch">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*50}>
                    <div className="flex-1 relative group">
                      {/* Chevron shape */}
                      <div className="h-full p-5 flex flex-col justify-between transition-all duration-300 group-hover:brightness-125" style={{background:`rgba(77,184,212,${0.05+i*0.025})`,borderTop:`2px solid rgba(77,184,212,${0.15+i*0.06})`,borderBottom:`2px solid rgba(77,184,212,${0.15+i*0.06})`,borderLeft:i===0?`2px solid rgba(77,184,212,${0.15+i*0.06})`:"none",borderRight:i===wf.length-1?`2px solid rgba(77,184,212,${0.15+i*0.06})`:"none",minHeight:200}}>
                        <div>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-[9px] mb-3" style={{background:tc}}>{s.step}</div>
                          <p className="font-bold text-white text-xs mb-2 leading-snug">{s.title}</p>
                          <p className="leading-relaxed" style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.45)"}}>{s.desc.slice(0,60)}…</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Mob/>
            </div>
          </section>
        );

        /* ─────────────────────────────────────
           DEFAULT fallback (any unlisted service)
        ───────────────────────────────────── */
        return (
          <section className="py-20 md:py-28 overflow-hidden" style={{background:DB}}>
            <div className="container mx-auto px-6 md:px-16">
              <Reveal><h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12 tracking-tight">{service.title} Workflow</h2></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wf.map((s:any,i:number)=>(
                  <Reveal key={i} delay={i*55}>
                    <div className="group p-7 rounded-2xl cursor-default transition-all duration-300" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,212,0.14)"}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(77,184,212,0.42)";el.style.background="rgba(77,184,212,0.07)";}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(77,184,212,0.14)";el.style.background="rgba(255,255,255,0.04)";}}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black mb-4" style={{background:tc}}>{s.step}</div>
                      <p className="font-bold text-white text-sm mb-2">{s.title}</p>
                      <p className="text-xs leading-relaxed" style={{color:"rgba(255,255,255,0.45)"}}>{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ══ 4. INDUSTRIES WE SERVE — staggered image+text cards ══ */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ background: V.gray50 }}>
        <div className="container mx-auto px-6 md:px-16">

          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.35em] mb-3 block" style={{ color: V.blue }}>{(service as any).industryEyebrow}</span>
              <h2 className="font-extrabold tracking-tight text-gray-900 leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                {(service as any).industryHeading}
              </h2>
            </div>
          </Reveal>

          {/*
            Staggered card stack:
            Each card is a large rounded rectangle with a colorful image panel on one side
            and title + description on the other — cards offset vertically so they overlap
            slightly like the reference, alternating image-left / image-right.
          */}
          <div className="relative space-y-[-24px] md:space-y-[-32px]">
            {industries.map((ind, i) => {

              /* Cycle through 3 accent palettes matching the reference screenshot */
              const PALETTES = [
                { bg: "#EFF6FF", textBg: "#FFFFFF", titleColor: V.blue,   imageBg: "#DBEAFE" },  /* light blue */
                { bg: V.dark,   textBg: V.darkMid,  titleColor: "#4db8d4", imageBg: "#1E293B" },  /* dark navy */
                { bg: "#FFF7ED", textBg: "#FFFFFF",  titleColor: "#EA580C", imageBg: "#FED7AA" },  /* warm orange tint */
              ];
              const pal     = PALETTES[i % 3];
              const isDark  = i % 3 === 1;
              const imgLeft = i % 2 === 0; /* alternate image side */

              /* Image comes directly from the data — unique per industry */
              const img = (ind as any).img ?? service.img;

              const zIndex = industries.length - i;

              return (
                <Reveal key={i} delay={i * 70}>
                  <div
                    className="relative flex flex-col md:flex-row rounded-2xl overflow-hidden"
                    style={{
                      background: pal.bg,
                      borderRadius: 20,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                      zIndex,
                      minHeight: 260,
                    }}
                  >
                    {/* Image panel */}
                    <div
                      className={`relative flex-shrink-0 ${imgLeft ? "md:order-first" : "md:order-last"}`}
                      style={{ width: "100%", maxWidth: 340, minHeight: 220 }}
                    >
                      <img
                        src={img}
                        alt={ind.name}
                        className="w-full h-full object-cover"
                        style={{ minHeight: 220 }}
                      />
                      {/* Gradient blend toward text side */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: imgLeft
                            ? `linear-gradient(to right, transparent 55%, ${pal.bg} 100%)`
                            : `linear-gradient(to left, transparent 55%, ${pal.bg} 100%)`,
                        }}
                      />
                    </div>

                    {/* Text panel */}
                    <div
                      className="flex flex-col justify-center px-8 md:px-10 py-8 flex-1"
                    >
                      {/* Industry name */}
                      <h3
                        className="font-extrabold mb-3 leading-tight"
                        style={{
                          fontSize: "clamp(1.15rem, 2.2vw, 1.55rem)",
                          color: pal.titleColor,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {ind.name}
                      </h3>

                      {/* Description */}
                      <p
                        className="leading-relaxed"
                        style={{
                          fontSize: "0.875rem",
                          color: isDark ? "rgba(255,255,255,0.6)" : V.gray600,
                          maxWidth: 540,
                        }}
                      >
                        {ind.desc}
                      </p>

                      {/* Bottom label pill */}
                      <div className="mt-6">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                          style={{
                            background: isDark ? "rgba(255,255,255,0.08)" : `${pal.titleColor}14`,
                            color: pal.titleColor,
                            border: `1px solid ${pal.titleColor}28`,
                          }}
                        >
                          {service.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══ 6. TECH LOGO TICKER ══ */}
      <section className="py-10 border-t border-b" style={{ background: V.gray50, overflow: "hidden", borderColor: V.gray200 }}>
        <div className="container mx-auto px-6 md:px-16 mb-6">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.35em] mb-2 block" style={{ color: V.blue }}>Tech Stack</span>
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
                  Powered by <span style={{ color: V.blue }}>Industry-Leading Tools</span>
                </h2>
              </div>
              <p className="text-gray-400 text-xs hidden md:block">Hover to pause · Click pill in detail to visit official site</p>
            </div>
          </Reveal>
        </div>

        {/* Infinite logo scroll — two tracks side by side, animates -100% for seamless loop */}
        {/* Pause helper — finds all .sd-track elements and toggles play state */}
        <div
          className="relative flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement)
              .querySelectorAll<HTMLElement>(".sd-track")
              .forEach(el => { el.style.animationPlayState = "paused"; });
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement)
              .querySelectorAll<HTMLElement>(".sd-track")
              .forEach(el => { el.style.animationPlayState = "running"; });
          }}
        >
          {[0, 1].map(trackIdx => (
            <div
              key={trackIdx}
              className="sd-track flex items-center gap-14 py-4 whitespace-nowrap flex-shrink-0"
              style={{ animation: "logoScroll 26s linear infinite", marginLeft: trackIdx === 0 ? 0 : 56 }}
            >
              {TECH_LOGOS.map((logo, i) => (
                <a
                  key={`${trackIdx}-${i}`}
                  href={TECH_URLS[logo.name] ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  style={{ width: 100, height: 40 }}
                  title={logo.name}
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="object-contain h-full w-auto transition-all duration-300"
                    style={{ maxHeight: 34, filter: "grayscale(100%) opacity(0.42)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) opacity(1)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) opacity(0.42)";
                    }}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══ 7. IMAGE MOSAIC ══ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 rounded-2xl overflow-hidden group" style={{ aspectRatio: "16/9" }}>
                <img src={imgs[1]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ filter: "grayscale(25%)", transition: "filter 0.7s ease, transform 0.7s ease" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(25%)"} />
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl overflow-hidden group flex-1" style={{ minHeight: 140 }}>
                  <img src={imgs[2]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ filter: "grayscale(25%)", minHeight: 140, transition: "filter 0.7s ease, transform 0.7s ease" }} onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"} onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(25%)"} />
                </div>
                <div className="rounded-2xl p-8 flex flex-col justify-center" style={{ background: `linear-gradient(135deg, ${V.blue}, ${V.purple})`, minHeight: 140 }}>
                  <p className="text-4xl font-black text-white mb-1">98%</p>
                  <p className="text-blue-100 text-sm font-semibold">Client Satisfaction</p>
                  <p className="text-blue-200 text-xs mt-1">{service.title} projects</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 8. CTA ══ */}
      <section className="py-24 md:py-36 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <Reveal>
            <div className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${V.blue} 0%, ${V.purple} 100%)` }}>
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-2 border-white/10 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute top-8 left-8 w-3 h-3 rounded-full" style={{ background: V.red }} />
              <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white/70 border border-white/20 mb-7">Ready to Start?</span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
                Let's engineer your<br />next breakthrough.
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                Whether startup or enterprise, we craft {service.title.toLowerCase()} solutions built to scale.
              </p>
              <Link href={`/contact?service=${service.id}`} className="group inline-flex items-center gap-3 px-12 py-5 bg-white rounded-full font-bold text-base shadow-xl hover:shadow-2xl hover:gap-4 transition-all" style={{ color: V.blue }}>
                Start a Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}