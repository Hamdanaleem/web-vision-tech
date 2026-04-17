"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Cpu, Globe, Shield, BarChart3, Cloud, Smartphone, RefreshCw, Palette } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { servicesData } from "@/data/servicesData";

/* ─── Vision Color Palette ─── */
const V = {
  blue:       "#2563EB",
  blueLight:  "#EFF6FF",
  blueMid:    "#DBEAFE",
  purple:     "#7C3AED",
  purpleLight:"#F5F3FF",
  purpleMid:  "#EDE9FE",
  red:        "#DC2626",
  dark:       "#0F172A",
  darkMid:    "#1E293B",
  white:      "#FFFFFF",
  gray50:     "#F8FAFC",
  gray100:    "#F1F5F9",
  gray200:    "#E2E8F0",
  gray400:    "#94A3B8",
  gray600:    "#475569",
  gray900:    "#0F172A",
};

/* ─── Category filters ─── */
const CATEGORIES = [
  { label: "All",            ids: servicesData.map(s => s.id) },
  { label: "Engineering",    ids: ["web-development","mobile-development","custom-software","saas-development","devops"] },
  { label: "AI & Data",      ids: ["generative-ai","data-analytics","automation"] },
  { label: "Design",         ids: ["ui-ux-design","design-dev","gaming-art"] },
  { label: "Gaming & XR",    ids: ["game-dev","web3-gaming","ar-vr-gaming"] },
  { label: "Cloud & Security", ids: ["cloud-application","cloud-ops","cybersecurity","devops"] },
];

/* ─── Stats ─── */
const STATS = [
  { value: "200+", label: "Global Clients",    color: V.blue },
  { value: "12+",  label: "Years Experience",  color: V.purple },
  { value: "98%",  label: "Client Retention",  color: V.blue },
  { value: "500+", label: "Projects Shipped",  color: V.purple },
];


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

/* ─── Featured highlight cards ─── */
const FEATURED = [
  { id: "generative-ai",   label: "Most Requested" },
  { id: "web-development", label: "Top Rated" },
  { id: "cybersecurity",   label: "Enterprise Pick" },
];

/* ─── Scroll reveal ─── */
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return {
    ref,
    style: { opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` } as React.CSSProperties,
  };
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredIds = CATEGORIES.find(c => c.label === activeCategory)?.ids ?? [];
  const filtered    = servicesData.filter(s => filteredIds.includes(s.id));
  const displayed   = filtered.slice(0, visibleCount);

  useEffect(() => { setVisibleCount(9); }, [activeCategory]);

  const heroFade  = useFadeUp(0);
  const statsFade = useFadeUp(100);

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        @keyframes marqueeLeft { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .hero-in { animation: fadeUp 0.8s ease forwards; }
        .d1 { animation-delay: 0.1s; opacity: 0; }
        .d2 { animation-delay: 0.25s; opacity: 0; }
        .d3 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      <Navbar />

      {/* ══════════════════════════════════
          1. HERO
      ══════════════════════════════════ */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b" style={{ borderColor: V.gray200 }}>
        {/* Gradient wash */}
        <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" style={{ background: `linear-gradient(180deg, ${V.blueLight} 0%, rgba(255,255,255,0) 100%)` }} />
        {/* Purple blob */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${V.purpleMid} 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />

        <div ref={heroFade.ref} style={heroFade.style} className="container mx-auto px-6 md:px-16 relative z-10">
          <div className="hero-in d1 inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8" style={{ borderColor: V.blueMid, background: V.blueLight }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: V.blue }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: V.blue }}>What We Build</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <h1 className="hero-in d2 font-black tracking-tight leading-[0.9] text-gray-900" style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
              Our<br />
              <span style={{ backgroundImage: `linear-gradient(135deg, ${V.blue} 0%, ${V.purple} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Services.
              </span>
            </h1>

            <div className="lg:max-w-sm hero-in d3">
              <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
                End-to-end digital engineering for ventures that refuse to be ordinary. We build technology that creates real competitive advantage.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm shadow-lg transition-all duration-300 hover:shadow-blue-200 hover:shadow-xl hover:gap-3"
                style={{ background: `linear-gradient(135deg, ${V.blue} 0%, ${V.purple} 100%)` }}
              >
                Get a Free Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          2. STATS BAR
      ══════════════════════════════════ */}
      <section className="border-b" style={{ borderColor: V.gray200 }}>
        <div ref={statsFade.ref} style={statsFade.style} className="container mx-auto px-6 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: V.gray200 }}>
            {STATS.map((s, i) => (
              <div key={i} className="py-10 px-6 md:px-10 group cursor-default">
                <p className="font-black tracking-tight leading-none mb-1 transition-colors duration-300" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: s.color }}>
                  {s.value}
                </p>
                <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: V.gray400 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          3. FEATURED HIGHLIGHTS
          3 hero cards — full-bleed image with overlay text
      ══════════════════════════════════ */}
      <section className="py-20 md:py-24" style={{ background: V.dark }}>
        <div className="container mx-auto px-6 md:px-16">
          <div ref={useFadeUp(0).ref} style={useFadeUp(0).style}>
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                Featured <span style={{ color: V.blue }}>Services</span>
              </h2>
              <span className="text-gray-500 text-sm hidden md:block">Our most sought-after solutions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED.map(({ id, label }, i) => {
              const svc = servicesData.find(s => s.id === id);
              if (!svc) return null;
              return (
                <Link key={id} href={`/services/${id}`} className="group relative block rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(40%) brightness(0.6)", transition: "filter 0.7s ease, transform 0.7s ease" }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) brightness(0.55)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(40%) brightness(0.6)"}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.3) 60%, transparent 100%)" }} />
                  {/* Label badge */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ background: `${V.blue}CC` }}>
                      {label}
                    </span>
                  </div>
                  <div className="absolute inset-0 p-7 flex flex-col justify-end">
                    <h3 className="text-xl font-extrabold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors duration-300">{svc.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{svc.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{ color: V.blue }}>
                      Explore <ArrowUpRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          4. FILTER + FULL CATALOG
      ══════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 md:px-16">

          {/* Section header */}
          <div ref={useFadeUp(0).ref} style={useFadeUp(0).style} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.35em] mb-2 block" style={{ color: V.blue }}>Full Catalog</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                All <span style={{ color: V.blue }}>Services</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Browse our complete suite of end-to-end engineering and design solutions.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
                style={
                  activeCategory === cat.label
                    ? { background: `linear-gradient(135deg, ${V.blue} 0%, ${V.purple} 100%)`, color: "white", border: "2px solid transparent" }
                    : { background: "white", color: V.gray600, border: `2px solid ${V.gray200}` }
                }
                onMouseEnter={e => { if (activeCategory !== cat.label) { (e.currentTarget as HTMLElement).style.borderColor = V.blue; (e.currentTarget as HTMLElement).style.color = V.blue; } }}
                onMouseLeave={e => { if (activeCategory !== cat.label) { (e.currentTarget as HTMLElement).style.borderColor = V.gray200; (e.currentTarget as HTMLElement).style.color = V.gray600; } }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Service grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {displayed.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: (index % 9) * 0.04 }}
                >
                  <Link
                    href={`/services/${service.id}`}
                    className="group block rounded-2xl overflow-hidden bg-white border hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                    style={{ borderColor: V.gray200 }}
                  >
                    {/* Image — grayscale → color */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        style={{ filter: "grayscale(100%)", transition: "filter 0.7s ease, transform 0.7s ease" }}
                        onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)"}
                        onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%)"}
                      />
                      {/* Blue gradient overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(to top, ${V.blue}40 0%, transparent 60%)` }}
                      />
                      {/* Arrow badge */}
                      <div
                        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                        style={{ background: V.blue }}
                      >
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-7">
                      <h3 className="text-base font-extrabold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{service.desc}</p>

                      {/* Tech tags — reveal on hover */}
                      <div className="flex gap-2 flex-wrap mt-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        {service.techStack.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-full" style={{ background: V.blueLight, color: V.blue }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom blue line — grows on hover */}
                    <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(to right, ${V.blue}, ${V.purple})` }} />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load more */}
          {visibleCount < filtered.length && (
            <div className="mt-14 text-center">
              <button
                onClick={() => setVisibleCount(v => v + 6)}
                className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm border-2 transition-all duration-300"
                style={{ borderColor: V.gray200, color: V.gray600 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = V.blue; (e.currentTarget as HTMLElement).style.color = V.blue; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = V.gray200; (e.currentTarget as HTMLElement).style.color = V.gray600; }}
              >
                Load More Services
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════
          5. TECH LOGO TICKER
      ══════════════════════════════════ */}
      <section className="py-10 border-t border-b overflow-hidden" style={{ borderColor: V.gray200, background: V.gray50 }}>
        <div className="container mx-auto px-6 md:px-16 mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: V.gray400 }}>
            Powered by Modern Technologies
          </p>
        </div>

        {/* Infinite scroll — pause handled via onMouseEnter/Leave, no nested style tag */}
        <div
          className="relative w-full flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(".ticker-track").forEach(el => {
              el.style.animationPlayState = "paused";
            });
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(".ticker-track").forEach(el => {
              el.style.animationPlayState = "running";
            });
          }}
        >
          {[0, 1].map(trackIdx => (
            <div
              key={trackIdx}
              className="ticker-track flex items-center gap-16 py-4 whitespace-nowrap flex-shrink-0"
              style={{ animation: "marqueeLeft 28s linear infinite", marginLeft: trackIdx === 0 ? 0 : 64 }}
            >
              {TECH_LOGOS.map((logo, i) => (
                <div
                  key={`${trackIdx}-${i}`}
                  className="relative flex-shrink-0 flex items-center justify-center cursor-default"
                  style={{ width: 96, height: 40 }}
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="object-contain h-full w-auto transition-all duration-300"
                    style={{ filter: "grayscale(100%) opacity(0.45)", maxHeight: 36 }}
                    onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%) opacity(1)"}
                    onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) opacity(0.45)"}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          6. BOTTOM CTA
          Blue → Purple gradient
      ══════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <div ref={useFadeUp(0).ref} style={useFadeUp(0).style}>
            <div
              className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${V.blue} 0%, ${V.purple} 100%)` }}
            >
              {/* Decorative rings */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-2 border-white/10 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
              {/* Red dot accent — brand signature */}
              <div className="absolute top-8 left-8 w-3 h-3 rounded-full" style={{ background: V.red }} />

              <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white/60 border border-white/20 mb-7">
                Let's Build Together
              </span>
              <h2 className="text-3xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
                Ready to engineer<br />something extraordinary?
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                From concept to launch, we partner with bold companies to deliver technology that scales globally.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group flex items-center gap-3 px-12 py-5 bg-white rounded-full font-bold text-base shadow-xl transition-all duration-300 hover:shadow-2xl hover:gap-4"
                  style={{ color: V.blue }}
                >
                  Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="flex items-center gap-3 px-12 py-5 rounded-full font-bold text-base border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-all duration-300"
                >
                  Browse All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}