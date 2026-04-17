"use client";

import Link from "next/link";
import Image from "next/image";

export default function ServicesBento() {
  return (
    <section className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">

        {/* LEFT sticky copy */}
        <div className="lg:sticky lg:top-24">
          <p className="flex items-center gap-2.5 text-[11px] font-bold tracking-[.18em] uppercase text-vision-blue mb-5">
            <span className="w-6 h-0.5 bg-vision-blue rounded-full" />
            Our Expertise
          </p>
          <h2 className="font-black text-[clamp(2.4rem,4vw,3.2rem)] leading-[1.05] tracking-tight text-vision-dark mb-4">
            What we{" "}
            <em className="not-italic text-transparent bg-clip-text bg-gradient-to-br from-vision-blue to-vision-purple">
              build for you
            </em>
          </h2>
          <p className="text-[15px] text-gray-500 font-light leading-[1.75] mb-8 max-w-sm">
            End-to-end digital products engineered for performance. From concept
            to deployment — we own every layer.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-vision-dark text-white text-[13px] font-bold px-6 py-3.5 rounded-full hover:bg-vision-blue transition-colors duration-200"
          >
            View All Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* RIGHT bento grid */}
        <div className="grid grid-cols-2 gap-3">

          {/* Tall Web Dev card */}
          <Link href="/services/web-development" className="row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group block" style={{ minHeight: "520px" }}>
            <Image
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
              alt="Custom Web Development"
              fill sizes="30vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/85" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-[10px] font-bold tracking-[.14em] uppercase text-white/50 mb-2">01 — Web Development</p>
              <h3 className="text-[19px] font-bold text-white leading-snug mb-2">Custom Web Development</h3>
              <p className="text-[12.5px] text-white/65 font-light leading-relaxed">We architect scalable web apps using React, Next.js & Node.js — built for speed, SEO, and long-term growth.</p>
            </div>
          </Link>

          {/* Mobile card */}
          <Link href="/services/mobile-development" className="relative rounded-2xl overflow-hidden cursor-pointer group block" style={{ height: "252px" }}>
            <Image
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop"
              alt="Mobile App Engineering"
              fill sizes="22vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] font-bold tracking-[.14em] uppercase text-white/50 mb-1.5">02 — Mobile</p>
              <h3 className="text-[17px] font-bold text-white leading-snug mb-1.5">Mobile App Engineering</h3>
              <p className="text-[12px] text-white/60 font-light leading-relaxed">Native iOS & Android and cross-platform Flutter apps that feel fast and polished on every device.</p>
            </div>
          </Link>

          {/* Design gradient card — slug: ui-ux-design */}
          <Link
            href="/services/ui-ux-design"
            className="rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-transform duration-300 block"
            style={{ height: "252px", background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)" }}
          >
            <div>
              <p className="text-[10px] font-bold tracking-[.14em] uppercase text-white/50 mb-2.5">03 — Design</p>
              <h3 className="text-[17px] font-bold text-white leading-snug mb-2">UI/UX & Product Design</h3>
              <p className="text-[12.5px] text-white/65 font-light leading-relaxed">User-centric interfaces built in Figma, validated with real users before a single line of code is written.</p>
            </div>
            <div className="text-[48px] font-black text-white/10 leading-none text-right select-none">03</div>
          </Link>

          {/* Wide Cloud + AI card */}
          <div className="col-span-2 relative rounded-2xl overflow-hidden group" style={{ height: "200px" }}>
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop"
              alt="Cloud and Cybersecurity"
              fill sizes="55vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
            <div className="absolute inset-0 flex items-end p-6 gap-0">

              {/* Cloud half — slug: cloud-ops */}
              <Link href="/services/cloud-ops" className="flex-1 group/cloud cursor-pointer pr-8">
                <p className="text-[10px] font-bold tracking-[.14em] uppercase text-white/50 mb-1.5">04 — Cloud & DevOps</p>
                <h3 className="text-[17px] font-bold text-white leading-snug mb-1.5 group-hover/cloud:text-blue-300 transition-colors">Cloud Infrastructure</h3>
                <p className="text-[12px] text-white/60 font-light">Secure AWS/Azure infrastructure, CI/CD pipelines, and 24/7 monitoring so you never go down.</p>
              </Link>

              <div className="w-px self-stretch bg-white/20 mx-4 my-2" />

              {/* Cybersecurity half — slug: cybersecurity */}
              <Link href="/services/cybersecurity" className="flex-1 group/cyber cursor-pointer pl-8">
                <p className="text-[10px] font-bold tracking-[.14em] uppercase text-white/50 mb-1.5">05 — Cybersecurity</p>
                <h3 className="text-[17px] font-bold text-white leading-snug mb-1.5 group-hover/cyber:text-violet-300 transition-colors">Enterprise Cybersecurity</h3>
                <p className="text-[12px] text-white/60 font-light">End-to-end security audits, penetration testing, and compliance frameworks to protect your business at every layer.</p>
              </Link>

            </div>

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}