"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    num: "01",
    title: "Agile Development",
    desc: "2-week sprint cycles with live demos. You stay in full control and see real progress — no waiting months for a first look.",
    gradient: "from-blue-50 to-indigo-100",
    border: "border-blue-100",
    accentColor: "#2563eb",
    numBg: "bg-blue-600",
  },
  {
    num: "02",
    title: "Enterprise-Grade Security",
    desc: "SOC-2 aligned, encryption at rest, zero-trust architecture. Every codebase is audited end-to-end before deployment.",
    gradient: "from-violet-50 to-purple-100",
    border: "border-violet-100",
    accentColor: "#7c3aed",
    numBg: "bg-violet-600",
  },
  {
    num: "03",
    title: "Top 1% Engineers",
    desc: "5-stage technical vetting — only 3% of applicants pass. You always work with world-class engineers, no compromise.",
    gradient: "from-emerald-50 to-teal-100",
    border: "border-emerald-100",
    accentColor: "#059669",
    numBg: "bg-emerald-600",
  },
  {
    num: "04",
    title: "Transparent Communication",
    desc: "Dedicated Slack channel, weekly reports, and a PM who replies within the hour. No ghosting, no surprises — ever.",
    gradient: "from-orange-50 to-amber-100",
    border: "border-orange-100",
    accentColor: "#ea580c",
    numBg: "bg-orange-600",
  },
  {
    num: "05",
    title: "Fixed-Scope Pricing",
    desc: "Scope, timeline, and cost agreed upfront. No surprise invoices mid-project. What we quote is what you pay.",
    gradient: "from-pink-50 to-rose-100",
    border: "border-pink-100",
    accentColor: "#db2777",
    numBg: "bg-pink-600",
  },
  {
    num: "06",
    title: "Post-Launch Growth",
    desc: "24/7 uptime monitoring, continuous iteration, and performance optimization after go-live. We stay with you long-term.",
    gradient: "from-cyan-50 to-sky-100",
    border: "border-cyan-100",
    accentColor: "#0891b2",
    numBg: "bg-cyan-600",
  },
];

const stats = [
  { value: "50", suffix: "+", label: "Projects Delivered" },
  { value: "98", suffix: "%", label: "Client Retention" },
  { value: "20", suffix: "+", label: "In-House Engineers" },
  { value: "5",  suffix: "+", label: "Years of Excellence" },
];

export default function WhyChooseUs() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="bg-[#f8f9ff] py-24 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-14">
          <div>
            <p className="flex items-center gap-2.5 text-[11px] font-bold tracking-[.18em] uppercase text-vision-blue mb-5">
              <span className="w-6 h-0.5 bg-vision-blue rounded-full" />
              Why WebVision
            </p>
            <h2 className="font-black text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.05] tracking-tight text-vision-dark">
              Not a vendor.{" "}
              <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-vision-blue to-vision-purple">
                A true partner.
              </em>
            </h2>
          </div>
          <div>
            <p className="text-[15px] text-gray-500 font-light leading-[1.8] mb-7">
              We take full ownership — from architecture to post-launch support.
              Unlike freelance marketplaces, we're in it for the long run with you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-vision-dark text-white text-[13px] font-bold px-6 py-3.5 rounded-full hover:bg-vision-blue transition-colors duration-200"
            >
              Book a Free Discovery Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {features.map((f) => {
            const isActive = active === f.num;
            return (
              <div
                key={f.num}
                onClick={() => setActive(isActive ? null : f.num)}
                className={`group relative rounded-2xl p-7 border ${f.border} bg-gradient-to-br ${f.gradient}
                            hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {/* ── TOP ACCENT LINE ──
                    Sits flush at top of card (inside overflow:hidden).
                    scaleX goes 0→1 on click, using the card's accentColor.
                    Uses transform origin left so it fills left-to-right.       */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-transform duration-500 ease-out origin-left"
                  style={{
                    background: f.accentColor,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                  }}
                />

                {/* Large faint watermark number */}
                <div className="absolute -bottom-3 -right-2 text-[96px] font-black leading-none select-none pointer-events-none opacity-[0.07] text-gray-900">
                  {f.num}
                </div>

                {/* Dark number badge */}
                <div
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${f.numBg} text-white text-[12px] font-black mb-5 relative z-10 transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
                >
                  {f.num}
                </div>

                <h4 className="font-bold text-[15.5px] text-vision-dark mb-2.5 relative z-10">
                  {f.title}
                </h4>
                <p className="text-[13px] text-gray-600 leading-[1.7] font-light relative z-10">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Full-width dark stat bar */}
        <div className="bg-vision-dark rounded-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-8 py-9 flex flex-col items-start relative
                ${i < stats.length - 1 ? "after:absolute after:right-0 after:top-6 after:bottom-6 after:w-px after:bg-white/10" : ""}`}
            >
              <div className="font-black text-[clamp(2.2rem,3.5vw,2.8rem)] text-white leading-none tracking-tight mb-1.5">
                {s.value}
                <span className="text-vision-blue">{s.suffix}</span>
              </div>
              <div className="text-[11.5px] font-medium text-white/50 uppercase tracking-[.08em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}